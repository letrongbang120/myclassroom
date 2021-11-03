import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: {
    type: Array
  },
  description: {
    type: String,
    required: true
  },
  numMember: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});
const Class = mongoose.model("Class", classSchema);
export default Class;