const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const indexRoutes = require("./routes/indexRoutes");
const contactRoutes = require("./routes/contactRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const aboutRoutes = require("./routes/aboutRoutes");

const app = express();
dotenv.config();

app.set("view engine", "ejs");

app.listen(process.env.PORT, () => {
  console.log("Port Listening");
});

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/", indexRoutes);

app.use("/", authRoutes);

app.use("/contact", contactRoutes);

app.use("/profile", profileRoutes);

app.use("/about", aboutRoutes);

app.use((req, res) => {
  res.render("404", { title: "Sayfa Bulunamadı" });
  res.status(404);
});
