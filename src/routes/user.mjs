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

router.get("/users",(req, res)=>{
    res.send(users);
});

router.get("/users/:id",getUserById,(req, res)=>{
    res.send(req.user);
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





export default router;