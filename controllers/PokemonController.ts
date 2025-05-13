import { Request, Response } from 'express';
import Pokemon from '../models/Pokemon';

const tiposValidos = ['charizard', 'mewtwo', 'pikachu'];

// Listar todos os pokémons
export const getAllPokemons = async (req: Request, res: Response) => {
  const pokemons = await Pokemon.findAll();
  res.status(200).json(pokemons);
};

// Buscar pokémon por id
export const getPokemonById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pokemon = await Pokemon.findByPk(id);
  if (!pokemon) {
    return res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
  res.status(200).json(pokemon);
};

// Criar novo pokémon
export const createPokemon = async (req: Request, res: Response) => {
  const { tipo, treinador } = req.body;
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ erro: 'Tipo inválido' });
  }
  const pokemon = await Pokemon.create({ tipo, treinador, nivel: 1 });
  res.status(200).json(pokemon);
};

// Atualizar treinador do pokémon
export const updatePokemon = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { treinador } = req.body;
  const pokemon = await Pokemon.findByPk(id);
  if (!pokemon) {
    return res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
  pokemon.treinador = treinador;
  await pokemon.save();
  res.status(204).send();
};

// Deletar pokémon
export const deletePokemon = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pokemon = await Pokemon.findByPk(id);
  if (!pokemon) {
    return res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
  await pokemon.destroy();
  res.status(204).send();
};

// Função de batalha entre dois pokémons
export const battlePokemons = async (req: Request, res: Response) => {
  const pokemonAId = parseInt(req.params.pokemonAId);
  const pokemonBId = parseInt(req.params.pokemonBId);

  if (pokemonAId === pokemonBId) {
    return res.status(400).json({ erro: 'Os pokémons devem ser diferentes' });
  }

  const pokemonA = await Pokemon.findByPk(pokemonAId);
  const pokemonB = await Pokemon.findByPk(pokemonBId);

  if (!pokemonA || !pokemonB) {
    return res.status(404).json({ erro: 'Um ou ambos os pokémons não foram encontrados' });
  }

  // Probabilidade proporcional ao nível
  const total = pokemonA.nivel + pokemonB.nivel;
  const probA = pokemonA.nivel / total;
  const random = Math.random();

  let vencedor, perdedor;
  if (random < probA) {
    vencedor = pokemonA;
    perdedor = pokemonB;
  } else {
    vencedor = pokemonB;
    perdedor = pokemonA;
  }

  // Atualiza níveis
  vencedor.nivel += 1;
  perdedor.nivel -= 1;

  await vencedor.save();

  let perdedorData = perdedor.toJSON();
  if (perdedor.nivel <= 0) {
    perdedorData.nivel = 0; // Para mostrar no retorno
    await perdedor.destroy();
  } else {
    await perdedor.save();
  }

  return res.status(200).json({
    vencedor: vencedor,
    perdedor: perdedorData
  });
};
