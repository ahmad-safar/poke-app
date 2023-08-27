interface PokemonProps {
  pokemon: Pokemon;
}

export default function Pokemon({ pokemon }: PokemonProps) {
  return (
    <div className={`bg-${pokemon.color} rounded-lg p-2`}>
      <img
        key={pokemon.index}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.index}.png`}
        alt={pokemon.name}
        placeholder="blur"
      />
      <p className={pokemon.color == "white" ? "text-black" : "text-white"}>
        {pokemon.name}
      </p>
    </div>
  );
}
