require("dotenv").config();
const url = process.env.MONGODB;
const port = process.env.PORT;
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

mongoose
	.connect(url)
	.then(() => {
		console.log("Connected to database!");
	})
	.catch((e) => {
		console.log("Not Connected to database!", e);
	});

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
	console.log(`Listening on port ${port}\nhttp://localhost:3000/`);
});
