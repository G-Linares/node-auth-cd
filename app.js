import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {username, password} from './info.js'
import cookieParser from 'cookie-parser';

import mainRoutes from './routes/mainRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())
app.use(cors());

app.use('/api', mainRoutes);


const CONNECTION_URL =
  `mongodb+srv://${username}:${password}@mern.yktji.mongodb.net/myFirstDatabase?retryWrites=true`

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
  )
  .catch((error) => console.log(error.message));
