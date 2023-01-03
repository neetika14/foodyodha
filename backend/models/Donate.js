import mongoose from 'mongoose';

const DonateSchema = new mongoose.Schema({

    eventDesc:{
        type: String,
        required: [true, "Enter event details"]
    },
    date:{
        type: String,
        required: false
    },
    location:{
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pinCode: { type: Number, required: true }
    },
    PhoneNo1:{
        type: Number,
        required: [true, "Enter name of the issuer"]
    },
    PhoneNo2:{
        type: Number,
        required: [true, "Enter name of the issuer"]
    },
    additionalComment:{
        type: String,
    },
    delivery:{
        type:String,
        required: true                      //pickup or delivery from donar
    },
    expectedFoodAmount:{                    //accepted food amount to be donated
        type:Number,
    },
    status:{
        type: String,
        default: "Unverified",
        required:true,
    },
    verifiedAt: Date,
    requestedAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
    }
    
});

export default mongoose.model("Donate", DonateSchema)