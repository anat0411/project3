const http = require("http").createServer(app);
const io = require("socket.io")(http);

http.listen(port, () => console.log(`Server running on port ${port}`));

io.use((socket, next) => {
  appSession(socket.request, {}, next);
}); // חיבור מידלוור של סוקט לזה של אקספרס, מקבלים את הפרטים על היוזר דרך הסשיין

io.use((socket, next) => {
  if (socket.request.session.user) return next();
  // next(new Error('403'));
  socket.disconnect();
}); //כדי לבדוק אם יש אוטנטיקציה

io.on("connection", (socket) => {
  console.log(`New client id ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client id ${socket.id} disconnect`);
  });

  //חיבור כללי
});

io.on("connection", (socket) => {
  console.log(`New connection id ${socket.id}`); // חיבור כללי

  socket.on("get_msg", (data) => {
    const { id, name } = socket.request.session.user;

    pool.query(
      `
            INSERT INTO messages (sender, message) 
            VALUES (?,?);
        `,
      [id, data],
      (err, results) => {
        if (err) throw err;

        io.emit("msg", {
          id: results.insertId,
          name: name,
          msg: data,
        });
      }
    );
  });

  socket.on("disconnect", () => {
    console.log(`Connection id ${socket.id} disconnected!`);
  });
});

app.use("/", express.static("./client"));

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
  if (socket.request.session.user) return next();
  // next(new Error('403'));
  socket.disconnect();
});
app.use(appSession);

////////////////////////////////////////////////////////////////////////

const myIo = useRef(); // useRef לא מתאפס
const imageRef = useRef();

useEffect(() => {
  myIo.current = SocketIo();

  return () => {
    myIo.current.disconnect();
  };
}, []);

useEffect(() => {
  myIo.current.on("msg", (msg) => {
    setMessages([...messages, msg]);
  });

  myIo.current.on("image", (msg) => {
    setMessages([...messages, { image: msg }]);
  });
}, [messages]);

<form onSubmit={handleImageSubmit}>
  <input type="file" ref={imageRef} name="image" />
  <input type="submit" />
</form>;
