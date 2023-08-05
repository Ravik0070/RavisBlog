const router = require("express").Router();
const blogController = require("../controllers/blogController");

//Get All Blogs
router.get("/all", blogController.GetAllBlogs);
router.get("/:id", blogController.GetBlog);
router.post("/create", blogController.CreateBlog);
router.put("/:id", blogController.UpdateBlog);
router.delete("/:id", blogController.DeleteBlog);

module.exports = router;
