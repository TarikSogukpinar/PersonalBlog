const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, "Please provide a email !"],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide valid email",
    ],
    maxlength: 30,
    minlength: 6,
  },
  github: {
    type: String,
    maxlength: 30,
  },
  linkedin: {
    type: String,
    maxlength: 30,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "mod", "writer"],
  },
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      return console.log("Parolanız Hatalı");
    }
  } else {
    return console.log("Kullaci Yok");
  }
};

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
