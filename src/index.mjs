import express from "express";
import userRoutes from "./routes/user.mjs";
import mongoose from "mongoose";
import passport from "passport";

const app = express();

mongoose.connect("mongodb://localhost/users")
.then(()=>console.log("db Connected")).catch((err)=> console.log(err));

app.use(express.json());
app.use(userRoutes);

app.get("/",(req, res)=>{
    res.send("hello");
});

app.listen(3000);