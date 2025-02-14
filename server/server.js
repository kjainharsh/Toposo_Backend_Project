require("dotenv").config();
const express = require("express");
const app = express();
const connectdb = require("./utils/db.js");
const authRoute = require("./router/auth-router.js");

app.use(express.json());
app.use("/api/auth", authRoute);


const PORT = 5000;
connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    });
});