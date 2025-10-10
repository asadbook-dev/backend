const expres = require("express");
const postController = require("../controllers/post.controller");

const router = expres.Router();

router.get("/get-all", postController.getAll); // GET
router.post("/create", postController.create); // POST
router.delete("/delete/:id", postController.delete); // DELETE
router.put("/edit/:id", postController.edit) // PUT
router.get("/get-one/:id", postController.getOne) //GET one
module.exports = router;
