const koaRouter = require("koa-router");
const router = new koaRouter({ prefix: "/student" })

const { addStudents, getStudents, deleteStudent, updateStudent } = require("../controller/student.controller");

router.post("/add", addStudents);
router.delete("/:studentId", deleteStudent);
router.put("/:studentId", updateStudent);
router.get("/", getStudents);


module.exports = router;