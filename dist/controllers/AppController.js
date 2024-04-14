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
exports.getPokemonById = exports.getPokemonByName = exports.getRandomPokemons = void 0;
const axios_1 = __importDefault(require("axios"));
const AppService_1 = require("../services/AppService");
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
                const silhouetteImagePath = "_silhouette.png";
                (0, AppService_1.createSilhouetteImage)(originalImageUrl, silhouetteImagePath);
                // Update the silhouette_image property in the JSON object
                // pokemon.silhouette_image = `${pokemon.name}_silhouette.png`;
                // console.log('Updated silhouette image path:', pokemon.silhouette_image);
                var pokemonObject = {
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    original_image: pokemonDetails.sprites.other['official-artwork'].front_default,
                    silhouette_image: ""
                };
                randomPokemons.push(pokemonObject);
            }
        }
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
    try {
        const id = req.params.id;
        const response1 = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = response1.data;
        const response2 = yield axios_1.default.get(pokemon.species.url);
        const pokemon_species = response2.data;
        res.json({
            id: pokemon.id,
            name: pokemon.name,
            image_url: pokemon.sprites.other['official-artwork'].front_default,
            shape: pokemon_species.shape,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getPokemonById = getPokemonById;
