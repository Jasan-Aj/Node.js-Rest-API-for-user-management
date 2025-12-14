import { Router } from "express";
import { users } from "../utils/constants.mjs";
import {validationResult, matchedData, checkSchema } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import {User} from "../mongoose/schemas/user.mjs"

const router = new Router();

//693d6813be28dce537fbe8c8

const getUserById = async (req, res, next)=>{
    const user_id = req.params.id;
    try{
        const user = await User.findById(user_id);
        req.user = user;
        next();
    }catch(err){
        return res.status(400).send({msg: "failed to fetch user!"}); 
    }
    
}

router.get("/users",async (req, res)=>{
    try{
        const users = await User.find();
        if(!users) return res.status(400).send({msg: "users not found!"});
        return res.send(users);

    }catch(err){

    }
});

router.get("/users/:id",getUserById,(req, res)=>{
    const user = req.user;
    if(!user) return res.status(400).send({msg: "user not found!"});
    res.send(user);
});

router.post("/users",
    checkSchema(createUserValidationSchema),
    async (req, res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(401).send({msg: result.array()});
    const body = matchedData(req);
    const newUser = User(body);
    try{
      const savedUser = await newUser.save();  
      res.status(200).send(newUser); 
    }catch(err){
        res.status(400).send({msg: "user not saved"});
    }
});

router.put("/users/:id",
    checkSchema(createUserValidationSchema)
    ,getUserById,async (req, res)=>{
    const user = req.user;
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send({msg: result.array()});
    }
    const {username, password} = matchedData(req);
    user.username = username;
    user.password = password;
    console.log(user.username);
    try{
       const updatedUser = await user.save();
       return res.status(200).send(updatedUser);
    }catch(err){
        return res.status(400).send({msg: "failed to update the user"})
    }
});

router.patch("/users/:id",getUserById, async(req, res)=>{
    const user = req.user;
    const {body} = req;
    if(body.username){
        user.username = body.username;
    }
    if(body.password){
        user.password = body.password;
    }
    try{
        const updatedUser = await user.save();
        return res.send(updatedUser);
    }catch(err){
        return res.status(400).send({msg: "failed to update user"});
    }
});

router.delete("/users/:id",getUserById,async (req, res)=>{
    const user = req.user;
    try{
        await user.deleteOne();
        return res.send({msg: "user deleted"});
    }catch(err){
        return res.send({msg: "failed to delete user"});
    }
});

export default router;