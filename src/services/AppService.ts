import axios from "axios"
import sharp from "sharp";
import fs, { stat } from "fs"
import path from "path"
import { correctPockemon, Pokemon } from "../controllers/appController";

export async function fetchPokemonByName(name: string) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokemon = response.data;
        return pokemon

    } catch (error) {
        throw new Error('Error fetching pokémon data by name');
    }
}

export async function fetchPokemonByID(id: string) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon = response.data;
        var message : string
        var status : boolean
        if (pokemon.id == correctPockemon.id) {
            message = "Congratulations... Your Answer is Correct !!"
            status = true
        }else{
            message = "Oops... Wrong Answer.Please Try Again !!"
            status = false
        }

        var pokemonObject : Pokemon = {
            id: correctPockemon.id,
            name: correctPockemon.name,
            original_image: correctPockemon.original_image,
            silhouette_image: correctPockemon.silhouette_image,
            status: status,
            message: message
        }
        return pokemonObject

    } catch (error) {
        throw new Error('Error fetching pokémon data by ID');
    }
}

// create a silhouette version of an image
export async function createSilhouetteImage(originalImage: string, silhouetteImage: string) {
    try {
        const response = await axios.get(originalImage, { responseType: 'arraybuffer' });
        const imageData = Buffer.from(response.data, 'binary');

        // Specify the folder path
        const outputFolder = path.join(__dirname, '..','silhouette_images');

        // Create the folder if it doesn't exist
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }

        // Specify the full path for the silhouette image
        const fullSilhouetteImagePath = path.join(outputFolder, silhouetteImage);

        await sharp(imageData)
            .resize(300, 300) // Resize the image (optional)
            .threshold(150) // Apply a threshold to create the silhouette
            .negate() // Invert the colors
            .toFile(fullSilhouetteImagePath);

        // return fullSilhouetteImagePath
    } catch (error) {
        console.error('Error creating silhouette image:', error);
    }
}