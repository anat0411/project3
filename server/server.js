const express = require("express");
const cors = require("cors");
const { pool } = require("./dbConnection");
const session = require("express-session");
const port = process.env.PORT || 3001;
const app = express();
const bcrypt = require("bcrypt");
const multer = require("multer");
const { v4: uuid4 } = require("uuid");
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    console.log(file);
    const ext = path.extname(file.originalname);

    if (![".svg", ".png", ".jpeg", ".jpg"].includes(ext)) {
      return cb(new Error("Ext disalowed"));
    }

    cb(null, uuid4() + ext);
  },
});
const upload = multer({ storage: storage });
app.use("/", express.static("../client/bulid"));
app.use("/uploads", express.static("uploads"));

const appSession = session({
  secret: process.env.SECRET || "asdf#$%#rgdfg3f",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
  },
});

io.use((socket, next) => {
  appSession(socket.request, {}, next);
});

io.use((socket, next) => {
  console.log(socket.request.session);
  if (socket.request.session.user || socket.request.session.admin)
    return next();
  // next(new Error('403'));
  socket.disconnect();
});
app.use(appSession);

io.on("connection", (socket) => {
  console.log(`New client id ${socket.id} -------------`);
  console.log(
    "======================================",
    socket.handshake.query.id
  );
  if (socket.handshake.query.id === "admin") {
    socket.join("admin-room");
  }
  const queryFollow = `INSERT INTO follow (userID, vacationID) VALUES (?,?)`;
  const queryUnfollow = `DELETE FROM follow WHERE vacationID=?`;
  socket.on("follow", function (data) {
    const { vacationId, follow } = data;
    console.log(data, "_----------------------");
    if (follow) {
      pool.query(
        queryFollow,
        [socket.request.session.user.id, vacationId],
        (err, results, fields) => {
          if (err) throw err;
        }
      );
      socket.to("admin-room").emit("updateFollow");
    } else {
      pool.query(queryUnfollow, [vacationId], (err, results, fields) => {
        if (err) throw err;
      });
      socket.to("admin-room").emit("updateFollow");
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client id ${socket.id} disconnect ++++++++++++++++++`);
  });
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    name: "sessionID",
    secret: process.env.SECRET || "asdf@#$%fdgsdfg234dfsG345__sdf!",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const isAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.sendStatus(403);
};

const isAdminAuth = (req, res, next) => {
  if (req.session.admin) {
    return next();
  }
  res.sendStatus(403);
};

app.route("/auth/verify").get(isAuth, (req, res) => {
  res.sendStatus(200);
});

app.route("/auth/admin/verify").get(isAdminAuth, (req, res) => {
  res.sendStatus(200);
});

app.route("/vacations").get(isAuth, (req, res) => {
  let vacations = null;
  let follows = null;
  pool.query(
    `SELECT id, destination, description, DATE_FORMAT(fromDate,'%Y-%m-%d') AS fromDate, DATE_FORMAT(toDate,'%Y-%m-%d') AS toDate, price, followersNumber, image FROM vacations`,
    [],
    (err, results, fields) => {
      if (err) throw err;
      vacations = results;
      console.log("this.vacations    ", vacations);
      const userID = req.session.user.id;
      pool.query(
        `SELECT * FROM follow WHERE userID=?`,
        [userID],
        (err, results, fields) => {
          if (err) throw err;
          follows = results;
          console.log("this.follows    ", follows);
          vacations.map((vacation) => {
            follows.map((follow) => {
              if (vacation.id === follow.vacationID) {
                vacation.follow = true;
                console.log(vacation.id, "--------", follow.vacationID);
              }
            });
          });
          console.log(vacations);
          res.json(vacations);
        }
      );
    }
  );
});

app.route("/get/vacation/edit/:id").get(isAdminAuth, (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT id, destination, description, DATE_FORMAT(fromDate,'%Y-%m-%d') fromDate, DATE_FORMAT(toDate,'%Y-%m-%d') AS toDate, price, followersNumber, image FROM vacations WHERE id=?`,
    [id],
    (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      res.json(results);
    }
  );
});

app.route("/vacations/admin").get(isAdminAuth, (req, res) => {
  pool.query(
    `SELECT id, destination, description, DATE_FORMAT(fromDate,'%Y-%m-%d') AS fromDate, DATE_FORMAT(toDate,'%Y-%m-%d') AS toDate, price, followersNumber, image FROM vacations
  `,
    (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      res.json(results);
    }
  );
});

app.route("/admin/chart").get(isAdminAuth, (req, res) => {
  pool.query(
    `SELECT f.id AS followID ,f.userID as userID, v.destination AS vacationDestination
  FROM follow AS f
  LEFT JOIN vacations as v ON
  f.vacationID = v.id`,
    (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      res.json(results);
    }
  );
});

// app.route("/admin/chart").post(isAdminAuth, (req, res) => {
//   console.log(req.body);
//   pool.query(
//     `UPDATE vacations SET followersNumber= ? WHERE destination=?`,
//     [req.body],
//     (err, results, fields) => {
//       if (err) throw err;
//       console.log(results);
//     }
//   );
// });

app.route("/login").post((req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, msg: "Missing fields" });
  }

  pool.query(
    `
      SELECT * FROM users
      WHERE username = ?
      `,
    [username],
    (err, results) => {
      if (err) throw err;

      if (results.length) {
        const { password: hash, name, id } = results[0];

        bcrypt.compare(password, hash, (err, same) => {
          if (err) throw err;

          // success login
          if (same) {
            req.session.user = { username: username, id: id };
            res.json({ success: true, username: username });
          } else {
            res.json({ success: false });
          }
        });
      } else {
        res.json({ success: false });
      }
    }
  );
});

app.route("/login/:username").get(isAuth, (req, res) => {
  let username = req.params.username;

  pool.query(
    `SELECT fName, lName FROM users WHERE username=?`,
    [username],
    (err, results, fields) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.route("/register").post((req, res) => {
  const { fname, lname, username, password } = req.body;
  if (!username || !password || !fname || !lname) {
    return res.json({ success: false, msg: "Missing fields" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log(hash);
    pool.query(
      `
                INSERT INTO users (fName, lName, username, password)
                VALUES (?,?,?,?);
            `,
      [fname, lname, username, hash],
      (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.json({ success: false, msg: "username already exists" });
          }

          throw err;
        }

        res.json({ success: true, msg: results.insertId });
      }
    );
  });
});

app.get("/logout", isAuth, (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get("/logout/admin", isAdminAuth, (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

//only necessary if you want to register a new admin
app.route("/register/admin").post((req, res) => {
  const { fname, lname, username, password } = req.body;
  if (!username || !password || !fname || !lname) {
    return res.json({ success: false, msg: "Missing fields" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log(hash);
    pool.query(
      `
                INSERT INTO adminuser (fName, lName, username, password)
                VALUES (?,?,?,?);
            `,
      [fname, lname, username, hash],
      (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.json({ success: false, msg: "username already exists" });
          }

          throw err;
        }

        res.json({ success: true, msg: results.insertId });
      }
    );
  });
});

app.route("/login/admin").post((req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, msg: "Missing fields" });
  }

  pool.query(
    `
            SELECT * FROM adminuser
            WHERE userName = ?
        `,
    [username],
    (err, results) => {
      if (err) throw err;

      if (results.length) {
        const { password: hash, id } = results[0];

        bcrypt.compare(password, hash, (err, same) => {
          if (err) throw err;

          // success login
          if (same) {
            req.session.admin = { username: username, id: id };
            res.json({ success: true, username: username });
          } else {
            res.json({ success: false });
          }
        });
      } else {
        res.json({ success: false });
      }
    }
  );
});

//cheking if verified on client
app.route("/add/vacation").post(upload.single("image"), (req, res) => {
  console.log(" --------- req.body: ", req.body);
  console.log(" --------- req.file: ", req.file);
  const {
    destination,
    description,
    fromDate,
    toDate,
    price,
    followersNumber,
  } = req.body;
  const image = req.file;
  if (
    !destination ||
    !description ||
    !fromDate ||
    !toDate ||
    !price ||
    !followersNumber ||
    !image
  ) {
    console.log(req.body);
    return res.json({ success: false, msg: "Missing fields ADD VACATION" });
  }

  pool.query(
    `
    INSERT vacations (destination, description, fromDate , toDate , price, followersNumber ,image)
    Values(?,?,?,?,?,?,?)
        `,
    [destination, description, fromDate, toDate, price, 0, image.path],
    (err, results) => {
      if (err) throw err;
      if (results) {
        console.log(req.body);
        console.log(req.file);
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
  io.emit("updateVacation", true);
});

app.route("/delete/vacation/:id").delete(isAdminAuth, (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM vacations WHERE id=?`, id, (err, results) => {
    if (err) throw err;
    console.log(req.params.id);
    console.log(results);
    if (results) {
      res.json({ success: true });
      // res.redirect("/vacations/admin");
    } else {
      res.json({ success: false });
    }
  });
  io.emit("updateVacation", true);
});

app
  .route("/edit/vacation/:id")
  .put(upload.single("image"), isAdminAuth, (req, res) => {
    console.log("REQ------------- ", req.body);
    const {
      destination,
      description,
      fromDate,
      toDate,
      price,
      followersNumber,
    } = req.body;
    const id = req.params.id;
    const image = req.file;

    console.log(
      destination,
      description,
      fromDate,
      toDate,
      price,
      followersNumber
    );

    if (
      !destination ||
      !description ||
      !fromDate ||
      !toDate ||
      !price ||
      followersNumber === undefined
    ) {
      return res.json({ success: false, msg: "Missing fields EDIT VACATION" });
    }
    if (image) {
      pool.query(
        `
      UPDATE vacations SET destination=? ,description=? ,fromDate=? ,toDate=? ,price=? ,followersNumber=?, image=? WHERE id=?
      `,
        [
          destination,
          description,
          fromDate,
          toDate,
          price,
          followersNumber,
          image.path,
          id,
        ],
        (err, results) => {
          if (err) throw err;
          console.log("req ", req.body);
          console.log("UN---------", results);

          if (results) {
            res.json({ success: true });
          } else {
            res.json({ success: false });
          }
        }
      );
    } else {
      pool.query(
        `
      UPDATE vacations SET destination=? ,description=? ,fromDate=? ,toDate=? ,price=? ,followersNumber=? WHERE id=?
      `,
        [
          destination,
          description,
          fromDate,
          toDate,
          price,
          followersNumber,
          id,
        ],
        (err, results) => {
          if (err) throw err;
          console.log("req ", req.body);
          console.log("UN---------", results);

          if (results) {
            res.json({ success: true });
          } else {
            res.json({ success: false });
          }
        }
      );
    }
    io.emit("updateVacation", true);
  });

http.listen(port, () => console.log(`Server running on port ${port}`));
