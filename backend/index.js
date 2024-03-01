import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';



const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1:Allow Al Origins with Defaulf of cors(*)
app.use(cors());
//Option2 : Allow Custom Origins
/*app.use(
cors({
origin: 'http://localhost:3000',
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type'],
})
);*/

//getting errors
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome')
});

//middleware of booksRoute
app.use('/books', booksRoute);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });