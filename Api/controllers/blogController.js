const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
//get all blogs
exports.GetAllBlogs = async (req, res, next) => {
  try {
    const category = req.query.cat;
    if (category) {
      Blog.find({ category: category })
        .exec()
        .then((blogs) => {
          res.status(200).json({ blogs });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    } else {
      Blog.find()
        .exec()
        .then((blogs) => {
          res.status(200).json({ blogs });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//get a blog
exports.GetBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    !blog
      ? res.status(404).json({ message: "blog not found" })
      : res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
};
//create blog
exports.CreateBlog = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");
    jwt.verify(token, "jwtKey", async (err, user) => {
      if (err) return res.status(403).json("Token is invalid");
      const newBlog = new Blog({
        userId: user.id,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
      });

      const savedBlog = await newBlog.save();
      !savedBlog && res.status(400).json("Post not found");
      res.status(200).json(newBlog);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
//update a blog
exports.UpdateBlog = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");
    jwt.verify(token, "jwtKey", async (err, user) => {
      if (err) return res.status(403).json("Token is invalid");
      const blog = await Blog.findById(req.params.id);
      if(!blog) return res.status(404).json("No blog found")
      if (blog.userId === user.id) {
         blog.title = req.body.title;
         blog.description = req.body.description;
         blog.image = req.body.image;
         blog.category = req.body.category;
         blog.save();
        res.status(200).json({ message: "post has been updated." });
      } else {
        res.status(403).json({ message: "Something went wrong." });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
//delete a blog
exports.DeleteBlog = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");
    jwt.verify(token, "jwtKey", async (err, user) => {
      if (err) return res.status(403).json("Token is invalid");
      const blog = await Blog.findById(req.params.id);
      if (blog.userId == user.id) {
        await blog.deleteOne();
        return res.status(200).json("Blog is deleted successfully");
      } else {
        return res.status(403).json("Can't delete this blog");
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
