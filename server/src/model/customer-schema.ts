import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  custName: { type: String, required: true },
  custEmail: { type: String, required: true },
  spends: { type: Number, required: true },
  visits: { type: Number, required: true },
  lastVisits: { type: Date },
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
