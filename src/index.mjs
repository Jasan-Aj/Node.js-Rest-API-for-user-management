import express from "express";
import userRoutes from "./routes/user.mjs";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://localhost/users")
.then(()=>console.log("db created")).catch((err)=> console.log(err));

app.use(express.json());
app.use(userRoutes);

app.get("/",(req, res)=>{
    res.redirect("/users");
});

app.listen(3000);