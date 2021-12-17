//Models here
const { User, UserBiodata, UserHistory } = require('../models')
const Sequelize = require('sequelize')

module.exports= {
    updateGet: async(req, res) => {
        res.render('users/user_update')
    },

    deleteGet: async(req, res) => {
        res.render('users/user_delete')
    },

     //Read method here
    user_list: async (req, res) => {
        try{
            var list = await UserBiodata.findAll()
                                // .then((data) => {console.log(data)})
            res.render('users/user_list', {
                userList: list
            })

        }catch(error) {
            console.log(error)
        }
    },

    user_info: async (req, res) =>{
        try {
            const{ username, email, password } = req.body;
            User.authenticate({username, password})
                .then(result =>{
                    getID = result.dataValues.id
                    var list = UserBiodata.findOne({where:{
                        user_id: getID
                    }})
                    res.render()
                })
        } catch (error) {
            console.log(error);
        }
    },

    //update method here
    updateInfo: async(req, res) =>{
        try{
            //Taking login method
            const {
                emailPrev,
                passwordPrev,
                emailNext,
                passwordNext,
                username,
                description
            } = req.body
            
            const userFind = await User.findOne({
                where: {
                    email: emailPrev,
                    password: passwordPrev
                }
            })
            
            if (userFind) {
                //Update username, email, password
                await User.update({
                    username: username,
                    email: emailNext,
                    password: passwordNext
                },{
                    where: {
                      id: userFind.id
                    }
                })
                //Update biodata
                await UserBiodata.update({
                    username: username,
                    description: description
                },{
                    where: {
                      user_id: userFind.id
                    }
                })
                res.redirect('/')                                
            } else {
                res.status(404).json({
                    message: "Email or Password is wrong"
                })
                console.log("Failed!")
            }            

        }catch(error){
            console.log(error);
        }
    },

    deleteDestroy: async(req, res) =>{
        try{
        //Taking login method
            const {
                email,
                password,
            } = req.body
            // console.log(`input: ${email}, Password: ${password}`)
            const userFind = await User.findOne({
                where: {
                    email: email,
                    password: password
                }
            })
            if (userFind) {
                //Delete username, email, password
                await User.destroy({
                    where: {
                      id: userFind.id
                    }
                });
                res.redirect('/')                                
            } else {
                res.status(404).json({
                    message: "Email or Password is wrong"
                })
                console.log("Failed!")
            } 
        }catch(error){
            console.log(error);
        }
    }

}