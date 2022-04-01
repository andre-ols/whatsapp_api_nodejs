import express from "express";
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';
import client from "./services/clientWhatsapp.js";

client.initialize();

const app = express();

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log(req.method + ' : ' + req.path);
    next();
});

app.use('/chat', chatRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log("Server Running Live on Port : " + port);
});