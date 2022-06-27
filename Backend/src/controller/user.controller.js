const User = require("../models/user.model");

const registerUser = async (ctx)=>{
    try {
        const { useremail,userpassword} = ctx.request.body;

        if(!useremail || !userpassword){
             throw new Error("Please provide all values");
        }

        const alreadyExist = await User.findOne({useremail});

        if(alreadyExist){
             throw new Error("Already Exisits");
        }

        const user = await User.create({useremail,userpassword});
        return (ctx.body = user);
    } catch (error) {
         return (ctx.body = {message:error.message});
    }
};

const login = async (ctx)=>{
    try {
        const { useremail, userpassword } = ctx.request.body;

        if (!useremail || !userpassword) {
          throw new Error("Please provide all values");
        }
        const user = await User.findOne({useremail});
        const matchPassword = await User.findOne({ userpassword });

        if(!user ||!matchPassword){
             ctx.throw (401,"Invalid credentials");
        }
        
        return (ctx.body = user);
    } catch (error) {
         return (ctx.body = { message: error.message });
    }
};

module.exports={
    registerUser,
    login,
}