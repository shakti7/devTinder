const mongoose = require('mongoose')
const {Schema,model}=mongoose


const connectionRequestSchema = new Schema({
    fromUserId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum:{
            values:['ignored','interested','accepted','rejected'],
            message:`{VALUE} not supported`
        }
    }
},{timestamps: true})

connectionRequestSchema.index({fromUserId: 1,toUserId:1})

connectionRequestSchema.pre('save',function (next){
    const connectionRequest = this

    // console.log(connectionRequest);
    const {fromUserId,toUserId} = connectionRequest

    if(toUserId == fromUserId.toString()){
        throw new Error("Can not send request to yourself");
    }
    next()
})

module.exports = model('ConnectRequest',connectionRequestSchema)