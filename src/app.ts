import express, {Application} from "express"
import appRoutes from './routes/appRoutes';
require("dotenv").config()

const app: Application = express()
const port: string | undefined = process.env.PORT

app.use(express.json()); // Use express.json() to parse JSON bodies
// app.use(morgan('dev'));
// app.use(logger);

app.use('/pokemon', appRoutes);

// app.use(errorHandler);

app.listen(port, () => {
    console.log(`app listening to PORT: ${port}`)
})