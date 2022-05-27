import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import mainRoutes from './routes/mainRoutes.js'

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())
app.use(cors());

app.use('/api', mainRoutes);

const CONNECTION_URL =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER_NAME}.yktji.mongodb.net/${process.env.MONGO_COLLECTION_NAME}?retryWrites=true`

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
  )
  .catch((error) => console.log(error.message));
