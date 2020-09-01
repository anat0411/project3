//server//

// app.route("/register/admin").post((req, res) => {
//     const { fname, lname, username, password } = req.body;
//     if (!username || !password || !fname || !lname) {
//       return res.json({ success: false, msg: "Missing fields" });
//     }

//     bcrypt.hash(password, 10, (err, hash) => {
//       if (err) throw err;
//       console.log(hash);
//       pool.query(
//         `
//                   INSERT INTO adminuser (fName, lName, username, password)
//                   VALUES (?,?,?,?);
//               `,
//         [fname, lname, username, hash],
//         (err, results) => {
//           if (err) {
//             if (err.code === "ER_DUP_ENTRY") {
//               return res.json({ success: false, msg: "username already exists" });
//             }

//             throw err;
//           }

//           res.json({ success: true, msg: results.insertId });
//         }
//       );
//     });
//   });

//client//

//React
// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

// function RegisterAdmin() {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     fname: "",
//     lname: "",
//   });
//   const history = useHistory();

//   const handleForm = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("http://localhost:3001/register/admin", {
//       method: "POST",
//       mode: "cors",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (data.success) {
//       history.push("/login/admin");
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form action="/register" method="POST" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="fname">First Name </label>
//           <input
//             type="text"
//             id="fname"
//             name="fname"
//             required
//             value={form.fname}
//             onChange={handleForm}
//           />
//         </div>
//         <div>
//           <label htmlFor="lname">Last Name </label>
//           <input
//             type="text"
//             id="lname"
//             name="lname"
//             required
//             value={form.lname}
//             onChange={handleForm}
//           />
//         </div>
//         <div>
//           <label htmlFor="username">User Name </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             required
//             value={form.username}
//             onChange={handleForm}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             required
//             value={form.password}
//             onChange={handleForm}
//           />
//         </div>
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default RegisterAdmin;
