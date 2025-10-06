// import { useState } from "react";
// import API from "../services/api";

// export default function Login({ setUser }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data } = await API.post("/auth/login", { email, password });
//     localStorage.setItem("token", data.token);
//     setUser(data.user);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import AuthForm from "../components/AuthForm";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <AuthForm
      title="Login"
      fields={[
        { label: "Email", type: "email", placeholder: "Enter email", value: email, onChange: setEmail },
        { label: "Password", type: "password", placeholder: "Enter password", value: password, onChange: setPassword },
      ]}
      onSubmit={handleSubmit}
      error={error}
      footer={
        <small>
          Don’t have an account? <Link to="/register">Register</Link>
        </small>
      }
    />
  );
}
