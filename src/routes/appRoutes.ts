import express from 'express';
import * as appController from '../controllers/appController';

const router = express.Router();

// get random 4 pokemon obejcts
router.get('/', appController.getRandomPokemons)

// get pokemon by name
router.get('/name/:name', appController.getPokemonByName)

// get pokemon by id
router.get('/id/:id', appController.getPokemonById)

export default router;