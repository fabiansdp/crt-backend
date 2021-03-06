import express from "express";
import cors from "cors";
import solver from "./solver";

const app = express();
const port = process.env.PORT || 8080; // default port to listen

app.use(cors());
app.use(express.json());

app.use("/", solver);

// start the Express server
app.listen(port);