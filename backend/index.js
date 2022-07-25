const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database");
const notesRouter = require("./routes/notes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(notesRouter);

function logger(req, res, next) {
    console.info(new Date(), req.method, req.path);

    next();
}
connectDatabase().then(() => {
    app.listen(3002, () => {
        console.log("Server running at http://localhost:3002");
    });
});