import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title:{
        type: String,
       // requrired:false,
    },
    description:{
        type: String,
       // requrired:true,
    },
    image:{
        type: String,
       // requrired:true,
    },
    user:{
       type:mongoose.Types.ObjectId,
       ref:"User",
    // requrired:true,
    }
});

export default mongoose.model("Blog",BlogSchema);