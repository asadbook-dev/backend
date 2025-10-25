const expres = require("express");
const postController = require("../controllers/post.controller");
const logger = require("../middlewares/logger");
const authMiddleware = require("../middlewares/auth.middleware");
const authorMiddleware = require("../middlewares/author.middleware");

const router = expres.Router();

router.get("/get-all", postController.getAll); // GET
router.post("/create", authMiddleware, postController.create); // POST
router.delete(
  "/delete/:id",
  authMiddleware,
  authorMiddleware,
  postController.delete
); // DELETE
router.put("/edit/:id", authMiddleware, authorMiddleware, postController.edit); // PUT
router.get("/get-one/:id", postController.getOne); //GET one
module.exports = router;
