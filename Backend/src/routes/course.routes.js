const koaRouter = require("koa-router");
const router = new koaRouter({ prefix: "/course" });

const { addCourese, getCourse, updateCourse, deleteCourse } = require("../controller/course.controller");

router.post("/add", addCourese);
router.delete("/:courseId", deleteCourse);
router.put("/:courseId", updateCourse);
router.get("/", getCourse);


module.exports = router;