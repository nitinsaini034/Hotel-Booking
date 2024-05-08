const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require('./reviews')

const hotalSchema=new Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://www.pexels.com/photo/caravelle-hotel-774042/",
        set:(v)=> v==="" ? "https://www.pexels.com/photo/caravelle-hotel-774042/" :v,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ] 
});

hotalSchema.post("findOneAndDelete",async(hotal)=>{
    if(hotal){
        await Review.deleteMany({_id:{$in:hotal.reviews}});  
    }
})

const Hotal=mongoose.model("Listing",hotalSchema);
module.exports=Hotal;
