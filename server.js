//import dependencies
require("dotenv").config()
const express=require("express")
const morgan=require("morgan")
const methodOverride=require("method-override")
const mongoose=require("mongoose")

//create Express Application Object
const app=express()

//setup inputs for connect function
const DATABASE_URL=process.env.DATABASE_URL
const CONFIG={
    useNewUrlParser:true,   //supports new connection string format....depricated
    useUnifiedTopology:true //opts in using MongoDB driver's new connection management engine.....depricated
}

//establish connection
mongoose.connect(DATABASE_URL,CONFIG)

//events for when connectin opens/disconnects/errors
mongoose.connection
.on("open",()=>console.log("Connected to Mongoose"))
.on("close",()=>console.log("Disconnected from Mongoose"))
.on("error",(error)=>console.log(error))

//pull schema and model from mongoose
const{Schema,model}=mongoose    //destructuring schema and model fro mongoose.....schema and model are used to define and interacr with MongoDB colelctions

//make todo schema
const todoSchema=new Schema({
    text:String
})

//make todo model
const Todo=model("Todo",todoSchema);

//register middleware
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method"))  //override for put and delete requests from _method query parameter (hidden form field)
app.use(express.urlencoded({extended:true}))
app.use("/static",express.static("static"))


//server listener
const PORT=process.env.PORT || 3001
app.listen(PORT,()=>console.log(`Now listening on port ${PORT}`))

//route to reset db with sample data
app.get("/",async(req,res)=>{
    //get todos
    const todos=await Todo.find({})
    //render index.ejs
    res.render("index.ejs",{todos})
})

app.get("/seed",async(req,res)=>{
    //delete all existing todos
    await Todo.deleteMany({})
    //add sample todos
    await Todo.create([{text:"Eat Breakfast"},{text:"Eat Lunch"},{text:"Eat Dinner"}])
    //redirect to main page
    res.redirect("/")
})

app.post("/todo",async(req,res)=>{
    //create a new todo
    await Todo.create(req.body)
    //redirect to main page
    res.redirect("/")
})

app.delete("/todo/:id",async(req,res)=>{
    //get the id from params
    const id=req.params.id
    //delete the todo
    await Todo.findByIdAndDelete(id)
    //redirect to main page
    res.redirect("/")
})



