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
exports.createSilhouetteImage = exports.fetchPokemonByName = void 0;
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function fetchPokemonByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemon = response.data;
            // const response2 = await axios.get(pokemon.species.url)
            // const pokemon_species = response2.data
            return pokemon;
        }
        catch (error) {
            throw new Error('Error fetching pokémon data by name');
        }
    });
}
exports.fetchPokemonByName = fetchPokemonByName;
// Function to create a silhouette version of an image
function createSilhouetteImage(originalImage, silhouetteImage) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(originalImage);
        console.log(silhouetteImage);
        try {
            const response = yield axios_1.default.get(originalImage, { responseType: 'arraybuffer' });
            const imageData = Buffer.from(response.data, 'binary');
            // Specify the folder path
            const outputFolder = path_1.default.join(__dirname, 'silhouette_images');
            // Create the folder if it doesn't exist
            if (!fs_1.default.existsSync(outputFolder)) {
                fs_1.default.mkdirSync(outputFolder);
            }
            // Specify the full path for the silhouette image
            const fullSilhouetteImagePath = path_1.default.join(outputFolder, silhouetteImage);
            yield (0, sharp_1.default)(imageData)
                .resize(300, 300) // Resize the image (optional)
                .threshold(150) // Apply a threshold to create the silhouette
                .negate() // Invert the colors
                .toFile(fullSilhouetteImagePath);
            console.log('Silhouette image created successfully.');
        }
        catch (error) {
            console.error('Error creating silhouette image:', error);
        }
    });
}
exports.createSilhouetteImage = createSilhouetteImage;
