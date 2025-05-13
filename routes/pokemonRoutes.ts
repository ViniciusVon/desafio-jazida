import express from 'express';
import * as PokemonController from '../controllers/PokemonController';

const router = express.Router();

router.get('/pokemons', PokemonController.getAllPokemons);
router.get('/pokemons/:id', PokemonController.getPokemonById);
router.post('/pokemons', PokemonController.createPokemon);
router.put('/pokemons/:id', PokemonController.updatePokemon);
router.delete('/pokemons/:id', PokemonController.deletePokemon);
router.post('/batalhar/:pokemonAId/:pokemonBId', PokemonController.battlePokemons);

export default router;
