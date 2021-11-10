const {Schema,model, Mongoose} =require('mongoose');


const WithdrawSchema=new Schema({
    name:{
        type:String,
    },
    paymenttype:{
        type:String,
        required:true

    },
    withdrawnumber:{
        type:String
    },
    contactnumber:{
        type:String
    },
    messege:{
        type:String
    },
    amount:{
        type:String
    },
    username:"",
    status:{
        type:String,
        default:"processing",
        enum:["processing","paid"]
    }
},
{timestamps:true}
)
module.exports=model("withdraw",WithdrawSchema);