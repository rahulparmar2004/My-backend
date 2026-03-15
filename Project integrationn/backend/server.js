const express = require("express");
const connectDB = require("./src/config/db")
const multer = require("multer")
const cors = require("cors")
require("dotenv").config();

const uploadFile = require("./src/services/storage.services")
const postModel = require("./src/models/postModel")
const Port = process.env.PORT || 4000

const app = express()

connectDB();
app.use(cors())
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/create-post", upload.single("image"), async (req, res) => {
    try {

        console.log(req.body);

        const result = await uploadFile(req.file.buffer);

        const post = await postModel.create({
            image: result.url,
            caption: req.body.caption
        });

        return res.json({
            message: "post create done",
            post: post
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("error creating post");
    }
});

app.get("/posts", async (req, res) => {
    const result = await postModel.find()
    res.status(200).json({
        message: "data get success",
        post:result
    })
})

app.delete("/posts/:id", async (req, res) => {
    try {

        const id = req.params.id;

        const data = await postModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Delete post success",
            post: data
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error deleting post"
        });
    }
});

// Update Posts
app.patch("/posts/:id", async (req, res) => {
  try {

    const id = req.params.id;

    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      {
        caption: req.body.caption
      },
      { new: true }
    );

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating post"
    });
  }
});



app.listen(Port , () => {
    console.log(`server running port ${Port}`)
});