import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js'

const app = express();

const CONNECTION_URL ='mongodb+srv://agne:labas@cluster0.uz3vu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

const corsOptions = {
	exposedHeaders: ['gameUser-id']
}

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors(corsOptions));

app.use('/images', express.static('images'))
app.use('/', routes);