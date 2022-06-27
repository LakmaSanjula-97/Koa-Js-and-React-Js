const KoaRouter = require("koa-router");
const router = new KoaRouter({prefix: "/user"});

const {
    registerUser,
    login,
}=require("../controller/user.controller");

router.post("/register", registerUser);
router.post("/login",login);

module.exports = router;