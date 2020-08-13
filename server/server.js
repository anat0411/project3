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

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    console.log(file);
    const ext = path.extname(file.originalname);
    //string
    //destination----- not uploads?

    if (![".svg", ".png", ".jpeg", ".jpg"].includes(ext)) {
      return cb(new Error("Ext disalowed"));
    }

    cb(null, uuid4() + ext);
  },
});
const upload = multer({ storage: storage });
app.use("/", express.static("../client/bulid"));
app.use("/uploads", express.static("uploads"));

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
  console.log(req.session);
  if (req.session.user) {
    return next();
  }
  res.sendStatus(403);
};

const isAdminAuth = (req, res, next) => {
  console.log(req.session);
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
  pool.query(`SELECT * FROM vacations`, [], (err, results, fields) => {
    if (err) throw err;
    res.json(results);
  });
});

app.route("/get/vacation/edit/:id").get(isAdminAuth, (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT * FROM vacations WHERE id=?`,
    [id],
    (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      res.json(results);
    }
  );
});

app.route("/vacations/admin").get(isAdminAuth, (req, res) => {
  pool.query(`SELECT * FROM vacations`, (err, results, fields) => {
    if (err) throw err;
    console.log(req.session.admin);
    res.json(results);
  });
});

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
  // console.log(" --------- req: ", req);
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
    INSERT vacations (destination, description, fromDate, toDate, price, followersNumber ,image)
    Values(?,?,?,?,?,?,?)
        `,
    [
      destination,
      description,
      fromDate,
      toDate,
      price,
      followersNumber,
      image.path,
    ],
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
});

app.route("/delete/vacation/:id").delete((req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM vacations WHERE id=?`, id, (err, results) => {
    if (err) throw err;
    console.log(req.params.id);
    console.log(results);
    if (results) {
      res.json({ success: true });
      res.redirect("/vacations/admin");
    } else {
      res.json({ success: false });
    }
  });
});

app.route("/edit/vacation/:id").put(upload.single("image"), (req, res) => {
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
      [destination, description, fromDate, toDate, price, followersNumber, id],
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
});

app.listen(port, () => console.log(`Server running on port ${port}`));
