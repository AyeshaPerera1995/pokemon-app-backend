"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appRoutes_1 = __importDefault(require("./routes/appRoutes"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json()); // Use express.json() to parse JSON bodies
// app.use(morgan('dev'));
// app.use(logger);
app.use('/pokemon', appRoutes_1.default);
// app.use(errorHandler);
app.listen(port, () => {
    console.log(`app listening to PORT: ${port}`);
});
