import express, {Application} from "express"
import appRoutes from './routes/appRoutes'
import cors from 'cors'
import path from "path"
require("dotenv").config()

const app: Application = express()
const port: string | undefined = process.env.PORT

// Serve static files from the "images" directory
app.use('/api/pokemon/image', express.static(path.join(__dirname, 'silhouette_images')));


// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json()); // Use express.json() to parse JSON bodies
// app.use(morgan('dev'));
// app.use(logger);

app.use('/api/pokemon', appRoutes);

// app.use(errorHandler);

app.listen(port, () => {
    console.log(`app listening to PORT: ${port}`)
})