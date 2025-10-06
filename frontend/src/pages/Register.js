// import { useState } from "react";
// import API from "../services/api";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await API.post("/auth/register", { username, email, password });
//     alert("Registered! Now login.");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>
//       <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Register</button>
//     </form>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import AuthForm from "../components/AuthForm";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { username, email, password });
      navigate("/"); // after register, redirect to login
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <AuthForm
      title="Register"
      fields={[
        { label: "Username", type: "text", placeholder: "Enter username", value: username, onChange: setUsername },
        { label: "Email", type: "email", placeholder: "Enter email", value: email, onChange: setEmail },
        { label: "Password", type: "password", placeholder: "Enter password", value: password, onChange: setPassword },
      ]}
      onSubmit={handleSubmit}
      error={error}
      footer={
        <small>
          Already have an account? <Link to="/">Login</Link>
        </small>
      }
    />
  );
}
