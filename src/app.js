const express = require("express");

require("./db/mongoose");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const noteRouter = require("./routers/note");

const app  = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.use( (err, req, res, next) => {
    res.json({errors: err.message});
});

module.exports = app;