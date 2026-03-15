import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    image: null,
    caption: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If image input
    if (name === "image") {
      setForm({
        ...form,
        image: files[0]
      });
    } 
    else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", form.image);
    formData.append("caption", form.caption);

    try {
      const res = await axios.post("http://localhost:3000/create-post",formData);

      console.log(res);
      alert("Post created successfully!");

      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Error creating post");
    }
  };

  return (
    <section className="create-post">
      <div className="post-container">
        <h2>Create New Post</h2>

        <form className="post-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Caption</label>
            <input
              type="text"
              name="caption"
              value={form.caption}
              onChange={handleChange}
              placeholder="Enter a caption..."
              required
            />
          </div>

          <button type="submit">Submit Post</button>

        </form>
      </div>
    </section>
  );
};

export default CreatePost;