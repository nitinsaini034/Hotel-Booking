const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const ininData=require("./data")
const Hotal=require("../models/schema")
const mongodb_url="mongodb://127.0.0.1:27017/airbnb"


main().then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(mongodb_url)
}

const sendDB=async()=>{
    await Hotal.deleteMany({});
    await Hotal.insertMany(ininData.data)
    console.log("data sent to database")
}

sendDB()

