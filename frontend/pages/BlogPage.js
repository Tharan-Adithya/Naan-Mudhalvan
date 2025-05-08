import { useEffect, useState } from "react";
import API from "../services/api";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  const fetchBlogs = async () => {
    const res = await API.get("/blogs");
    setBlogs(res.data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/blogs", form);
      setForm({ title: "", content: "" });
      fetchBlogs();
    } catch {
      alert("Error creating blog (maybe not logged in)");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} value={form.title} />
        <textarea name="content" placeholder="Content" onChange={handleChange} value={form.content} />
        <button type="submit">Add Blog</button>
      </form>

      <h2>All Blogs</h2>
      {blogs.map((b) => (
        <div key={b._id} style={{ border: "1px solid gray", margin: "1rem 0", padding: "1rem" }}>
          <h3>{b.title}</h3>
          <p>{b.content}</p>
          <small>By: {b.author?.username || "Unknown"}</small>
        </div>
      ))}
    </div>
  );
}

export default BlogPage;
