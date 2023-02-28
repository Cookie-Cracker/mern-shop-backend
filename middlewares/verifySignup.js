const Role = require("../models/role.model")
const User = require("../models/user.model")

checkDuplicateUsernameOrEmail = async (req, res, next) => {

    //Username
    try {
        let user = await User.findOne({username: req.body.username})
        if(user) return res.status(400).json({
            success: false,
            error: "Username is already in use!"
        })

        user = await User.findOne({email: req.body.email})
        if(user) return res.status(400).json({
            success: false,
            error: "Email is already in use!"
        })
    } catch (error) {
        res.status(500).send({ message: err });
    }
    next()
  
}

checkRoleExists = (req, res, next) => {
    const appRoles = ["admin", "moderator", "user"]
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!appRoles.includes(req.body.roles[i])) {
          res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
          return;
        }
      }
    }
  
    next();
  };

const verifySignup ={
    checkDuplicateUsernameOrEmail,
    checkRoleExists
}

module.exports = verifySignup