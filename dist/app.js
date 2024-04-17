"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appRoutes_1 = __importDefault(require("./routes/appRoutes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Serve static files from the "images" directory
app.use('/api/pokemon/image', express_1.default.static(path_1.default.join(__dirname, 'silhouette_images')));
// Use CORS middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000'
}));
app.use(express_1.default.json()); // Use express.json() to parse JSON bodies
// app.use(morgan('dev'));
// app.use(logger);
app.use('/api/pokemon', appRoutes_1.default);
// app.use(errorHandler);
app.listen(port, () => {
    console.log(`app listening to PORT: ${port}`);
});
