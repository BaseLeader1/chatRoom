import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true }, // Define an auto-incrementing ID field
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isConnected: { type: Boolean, default: false },
});

// Before saving, hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Auto-increment userId before saving
userSchema.pre("save", async function (next) {
  if (!this.userId) {
    const lastUser = await this.constructor.findOne(
      {},
      {},
      { sort: { userId: -1 } }
    );
    if (lastUser) {
      this.userId = lastUser.userId + 1;
    } else {
      this.userId = 1;
    }
  }
  next();
});

export default mongoose.model("User", userSchema);
