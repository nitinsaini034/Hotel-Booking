const express=require('express')
const app=express()
const port=3000;
const cors=require('cors')
const mongoose=require('mongoose')
const mongodb_url="mongodb://127.0.0.1:27017/airbnb"
const Hotal=require("./models/schema")
const Review=require('./models/reviews')
const multer=require('multer');
const upload=multer({dest:'uploads/'})
main().then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(mongodb_url)
}

const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials:true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public')); 

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/hotel-images')
    },
    filename:(req,file,cb)=>{
       cb(null,file.uploads)
    }
})

const uploads=multer({storage:storage})


//index router
app.get("/",async(req,res)=>{
    const hotels=await Hotal.find();
    res.send(hotels)
})


//show route
app.get('/:hotalID',async(req,res)=>{
    const {hotalID}=req.params;
    const Hotaldetail=await Hotal.findById(hotalID);
    res.json(Hotaldetail)
})

//new route
app.post('/new',async(req,res)=>{
    try {
        const newhotal=new Hotal(req.body);
        await newhotal.save();
        res.json(newhotal);
    } catch (error) {
        console.log(error);
    }
})
  
//delete route
app.delete('/:hotalID',async(req,res)=>{
    const {hotalID}=req.params;
    const deletehotal=await Hotal.findByIdAndDelete(hotalID)
    res.json(deletehotal)   
})

//review route
app.post('/:hotalID/review',async(req,res)=>{
    const {hotalID}=req.params;
    const hotal= await Hotal.findById(hotalID)
    const newReview=new Review(req.body)
    hotal.reviews.push(newReview);
    await newReview.save();
    await hotal.save();
    res.json(newReview);
})

//delete review route
app.delete('/:hotaId/reviews/:reviewId',async(req,res)=>{
    const {hotalID, reviewID}=req.params;
    await Hotal.findByIdAndUpdate(hotalID,{$pull:{review:reviewID}})
    await Review.findByIdAndDelete(reviewID)
    res.json({message:'review deleted'})
})
app.listen(port,()=>{
    console.log(`app is listing on port ${port}`)
})