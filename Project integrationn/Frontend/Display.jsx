import React, { useState, useEffect } from "react";
import axios from "axios";

const Display = () => {
  const [post, setPost] = useState([]);

  const deletePost = async (id) => {
    try {

      await axios.delete(`http://localhost:3000/posts/${id}`);

      setPost(post.filter((item) => item._id !== id));

    } catch (error) {
      console.log(error);
    }
  };

  // Update Posts
  const updatePost = async (id) => {

    const newCaption = prompt("Enter new caption");

    try {

      const res = await axios.patch(
        `http://localhost:3000/posts/${id}`,
        { caption: newCaption }
      );

      setPost(
        post.map((item) =>
          item._id === id ? res.data.post : item
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  // Get Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts");
        setPost(res.data.post);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <section className="post-section">
      <h2 className="post-title">All Posts</h2>
      <div className="post-grid">
        {post.map((item, i) => (
          <div className="post-card" key={item._id || i}>
            <img src={item.image} alt="post" />
            <p className="post-caption">{item.caption} {item._id}</p>
            <button className="delete-btn" onClick={() => deletePost(item._id)}>Delete</button>
            <button className="update-btn" onClick={() => updatePost(item._id)}>Update</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Display;