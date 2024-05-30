const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./models/Register");
const cors=require("cors");

const app = express();
app.use(
  cors({
    origin: ["https://databases-login-page-ykft.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect(
  "mongodb+srv://vishwajeetsharm09:12345@cluster1.cioyfws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
);

app.get("/", (req, res) => {
  res.json("Hello");
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  RegisterModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json("Already have an account");
      } else {
        RegisterModel.create({ name: name, email: email, password: password })
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    })
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
