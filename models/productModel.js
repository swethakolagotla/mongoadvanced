import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is mandatory"],
    unique: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  comfortLevel: {
    type: String,
    enum: {
      values: ["cheap", "managable", "luxury"],
      message: "not the right comfort level value",
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});
productSchema.pre("save", function (next) {
  this.comfortLevel =
    this.price > 100000 ? "luxury" : this.price > 10000 ? "managable" : "cheap";
  next();
});
productSchema.post("save", function (doc, next) {
  console.log(doc, "created");
  next();
});
productSchema.pre(/^find/,function(next){
  this.find({isActive:true})
  next()
})
productSchema.virtual('discountPercentage').get(function(){
  return this.price<10000?'50%': "20%"
})
const Database = mongoose.model("database", productSchema, "databases");
export default Database;
