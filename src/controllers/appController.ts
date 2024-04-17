import { Request, Response } from 'express';
import axios from "axios"
import { fetchPokemonByName, fetchPokemonByID, createSilhouetteImage }  from '../services/AppService';
import path from 'path'

type Pokemon = {
    id:number,
    name: string,
    original_image: string,
    silhouette_image: string | undefined,
    status: boolean 
}

export const getRandomPokemons = async (req: Request, res: Response) => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
        const pokemons = response.data.results;
       
        const randomPokemons: Pokemon[]  = [];
        const numberOfRandomPokemons = 4;
        
        // Generate 4 random indices
        while (randomPokemons.length < numberOfRandomPokemons) {
            const randomIndex = Math.floor(Math.random() * pokemons.length);
            const randomPokemon = pokemons[randomIndex];

            // Ensure that the randomly selected Pokémon is not already in the array
            if (!randomPokemons.includes(randomPokemon)) {

                // get pokemon details by name
                const pokemonDetails = await fetchPokemonByName(randomPokemon.name)

                // Create silhouette image
                const originalImageUrl = pokemonDetails.sprites.other['official-artwork'].front_default;
                const silhouetteImagePath = pokemonDetails.id + "_silhouette.png";

                // const path: string | undefined = await createSilhouetteImage(originalImageUrl, silhouetteImagePath)
                await createSilhouetteImage(originalImageUrl, silhouetteImagePath)
                var pokemonObject : Pokemon = {
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    original_image: pokemonDetails.sprites.other['official-artwork'].front_default,
                    silhouette_image: silhouetteImagePath,
                    status: false
                }
                randomPokemons.push(pokemonObject);
            }
        }

        // Set one random Pokémon's status to true
        const randomIndexToSetTrue = Math.floor(Math.random() * randomPokemons.length);
        randomPokemons[randomIndexToSetTrue].status = true;
        
        res.json(randomPokemons)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Pokémon data', error: error });
    }
};

export const getPokemonByName = async(req:Request, res:Response) => {
    const name = req.params.name;
    const pokemon = await fetchPokemonByName(name);
    res.json({
        id: pokemon.id,
        name : pokemon.name,
        original_image: pokemon.sprites.other['official-artwork'].front_default
    });
}

export const getPokemonById = async(req:Request, res:Response) => {
        const id = req.params.id;
        const pokemon = await fetchPokemonByID(id);
        res.json({
        id: pokemon.id,
        name : pokemon.name,
        original_image: pokemon.sprites.other['official-artwork'].front_default
    });

}

export const getPokemonSilhouetteImage = async(req:Request, res:Response) => {
    const imageName = req.params.name;
    res.sendFile(path.join(__dirname, 'silhouette_images', imageName));
    // const name = req.params.name;
    // const silhouetteImage = await fetchPokemonSilhouetteImage(name);
    // res.json({
    //     silhouette_image: silhouetteImage
    // });
}