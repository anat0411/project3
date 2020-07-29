const express = require("express");
const cors = require("cors");
// const path = require("path");
const { pool } = require("./dbConnection");
const session = require("express-session");
// const passport = require("passport");
const port = process.env.PORT || 3001;
const app = express();
const bcrypt = require("bcrypt");

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
  pool.query(`SELECT * FROM vacations`, (err, results, fields) => {
    if (err) throw err;
    console.log(req.session.user);
    res.json(results);
  });
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
app.route("/add/vacation").post((req, res) => {
  const {
    destination,
    description,
    fromDate,
    toDate,
    price,
    followersNum,
    image,
  } = req.body;
  if (
    !destination ||
    !description ||
    !fromDate ||
    !toDate ||
    !price ||
    !followersNum ||
    !image
  ) {
    return res.json({ success: false, msg: "Missing fields" });
  }

  pool.query(
    `
    INSERT vacations (destination, description, fromDate, toDate, price, followersNumber,image)
    Values(?,?,?,?,?,?,?)
        `,
    [destination, description, fromDate, toDate, price, followersNum, image],
    (err, results) => {
      if (err) throw err;
      console.log(req.body);
      if (results.length) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
});

app.listen(port, () => console.log(`Server running on port ${port}`));
