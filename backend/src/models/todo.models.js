import mongoose , {Schema} from "mongoose";

const todoSchema= new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        enum:["High","Moderate","Low"],
        default:"High"
    },
    description:{
        type:String,
    },
    taskimage:{
        type:String,
    },
    status:{
        type:String,
        enum:["Not Started","In Progress","Completed"],
        default:"Not Started"
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
},{timestamps:true})

export const Todo = mongoose.model("Todo",todoSchema)