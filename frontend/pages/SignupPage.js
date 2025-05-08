import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) return alert("You must agree to the terms.");
    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match");

    try {
      await API.post("/auth/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      alert("Signup successful. Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      <div>
        <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
        <label> I agree to the Terms and Conditions</label>
      </div>
      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupPage;
