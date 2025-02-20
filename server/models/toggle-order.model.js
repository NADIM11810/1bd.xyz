import mongoose from "mongoose";

const toggleOrderSchema = new mongoose.Schema({
  signCopy: {
    type: Boolean,
    default: false,
  },
  nidCopy: {
    type: Boolean,
    default: false,
  },
});

const toggleOrder = mongoose.model("ToggleOrder", toggleOrderSchema);

export default toggleOrder;
