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
exports.getPokemonSilhouetteImage = exports.getPokemonById = exports.getPokemonByName = exports.getRandomPokemons = void 0;
const axios_1 = __importDefault(require("axios"));
const AppService_1 = require("../services/AppService");
const path_1 = __importDefault(require("path"));
const getRandomPokemons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://pokeapi.co/api/v2/pokemon?limit=50");
        const pokemons = response.data.results;
        const randomPokemons = [];
        const numberOfRandomPokemons = 4;
        // Generate 4 random indices
        while (randomPokemons.length < numberOfRandomPokemons) {
            const randomIndex = Math.floor(Math.random() * pokemons.length);
            const randomPokemon = pokemons[randomIndex];
            // Ensure that the randomly selected Pokémon is not already in the array
            if (!randomPokemons.includes(randomPokemon)) {
                // get pokemon details by name
                const pokemonDetails = yield (0, AppService_1.fetchPokemonByName)(randomPokemon.name);
                // Create silhouette image
                const originalImageUrl = pokemonDetails.sprites.other['official-artwork'].front_default;
                const silhouetteImagePath = pokemonDetails.id + "_silhouette.png";
                // const path: string | undefined = await createSilhouetteImage(originalImageUrl, silhouetteImagePath)
                yield (0, AppService_1.createSilhouetteImage)(originalImageUrl, silhouetteImagePath);
                var pokemonObject = {
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    original_image: pokemonDetails.sprites.other['official-artwork'].front_default,
                    silhouette_image: silhouetteImagePath,
                    status: false,
                    message: ""
                };
                randomPokemons.push(pokemonObject);
            }
        }
        // Set one random Pokémon's status to true
        const randomIndexToSetTrue = Math.floor(Math.random() * randomPokemons.length);
        randomPokemons[randomIndexToSetTrue].status = true;
        exports.correctPockemon = randomPokemons[randomIndexToSetTrue];
        res.json(randomPokemons);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching Pokémon data', error: error });
    }
});
exports.getRandomPokemons = getRandomPokemons;
const getPokemonByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    const pokemon = yield (0, AppService_1.fetchPokemonByName)(name);
    res.json({
        id: pokemon.id,
        name: pokemon.name,
        original_image: pokemon.sprites.other['official-artwork'].front_default
    });
});
exports.getPokemonByName = getPokemonByName;
const getPokemonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const pokemon = yield (0, AppService_1.fetchPokemonByID)(id);
    res.json(pokemon);
});
exports.getPokemonById = getPokemonById;
const getPokemonSilhouetteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = req.params.name;
    res.sendFile(path_1.default.join(__dirname, 'silhouette_images', imageName));
});
exports.getPokemonSilhouetteImage = getPokemonSilhouetteImage;
