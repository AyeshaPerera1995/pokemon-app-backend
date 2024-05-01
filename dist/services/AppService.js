"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSilhouetteImage = exports.fetchPokemonByID = exports.fetchPokemonByName = void 0;
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const appController_1 = require("../controllers/appController");
function fetchPokemonByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemon = response.data;
            return pokemon;
        }
        catch (error) {
            throw new Error('Error fetching pokémon data by name');
        }
    });
}
exports.fetchPokemonByName = fetchPokemonByName;
function fetchPokemonByID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemon = response.data;
            var message;
            var status;
            if (pokemon.id == appController_1.correctPockemon.id) {
                message = "Congratulations... Your Answer is Correct !!";
                status = true;
            }
            else {
                message = "Oops... Wrong Answer.Please Try Again !!";
                status = false;
            }
            var pokemonObject = {
                id: appController_1.correctPockemon.id,
                name: appController_1.correctPockemon.name,
                original_image: appController_1.correctPockemon.original_image,
                silhouette_image: appController_1.correctPockemon.silhouette_image,
                status: status,
                message: message
            };
            return pokemonObject;
        }
        catch (error) {
            throw new Error('Error fetching pokémon data by ID');
        }
    });
}
exports.fetchPokemonByID = fetchPokemonByID;
// create a silhouette version of an image
function createSilhouetteImage(originalImage, silhouetteImage) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(originalImage, { responseType: 'arraybuffer' });
            const imageData = Buffer.from(response.data, 'binary');
            // Specify the folder path
            const outputFolder = path_1.default.join(__dirname, '..', 'silhouette_images');
            // Create the folder if it doesn't exist
            if (!fs_1.default.existsSync(outputFolder)) {
                fs_1.default.mkdirSync(outputFolder, { recursive: true });
            }
            // Specify the full path for the silhouette image
            const fullSilhouetteImagePath = path_1.default.join(outputFolder, silhouetteImage);
            yield (0, sharp_1.default)(imageData)
                .resize(300, 300) // Resize the image (optional)
                .threshold(150) // Apply a threshold to create the silhouette
                .negate() // Invert the colors
                .toFile(fullSilhouetteImagePath);
            // return fullSilhouetteImagePath
        }
        catch (error) {
            console.error('Error creating silhouette image:', error);
        }
    });
}
exports.createSilhouetteImage = createSilhouetteImage;
