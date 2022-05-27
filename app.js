import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import {username, password} from './info.js'


//aqui importo el sistema de ruteo 

import mainRoutes from './routes/mainRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//enabilito el CORS para problemas de puertos
app.use(cors());

// aqui tienes que hacer tu base de datos cloud.mongodb.com
// variable de contrasenia de prefencia en archivo .ENV

app.use('/api', mainRoutes);


const CONNECTION_URL =
  `mongodb+srv://${username}:${password}@mern.yktji.mongodb.net/myFirstDatabase?retryWrites=true`

//puerto donde se va a contruir
const PORT = process.env.PORT || 5000;

//inicializo la base de datos y si se puede conectar corre servidor
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
  )
  .catch((error) => console.log(error.message));
