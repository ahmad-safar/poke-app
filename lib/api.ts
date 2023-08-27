type PokemonResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

const DEFAULT_DATA_LIMIT = 20;

const fetchColor = async (index: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${index}`,
    );
    const data = await response.json();
    return data.color.name;
  } catch (error) {
    console.error("Error fetching color:", error);
    return "black";
  }
};

const fetchPokemon = async ({ pageParam }: { pageParam: string }) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${DEFAULT_DATA_LIMIT}&offset=${pageParam}`,
    );
    const data = (await response.json()) as PokemonResponse;

    const colorPromises = data.results.map(async (result) => {
      const url = new URL(result.url);
      const index = Number(url.pathname.split("/")[4]);

      if (Number.isNaN(index) || index > 10000) {
        return "black";
      } else {
        return fetchColor(index);
      }
    });

    const colorsData = await Promise.allSettled(colorPromises);

    data.results.forEach((result, index) => {
      const color =
        colorsData[index].status === "fulfilled"
          ? (colorsData[index] as PromiseFulfilledResult<string>).value
          : "black";

      let twColor: string;
      switch (color) {
        case "white":
          twColor = "white";
          break;
        case "black":
          twColor = "gray-400";
          break;
        default:
          twColor = `${color}-400`;
          break;
      }

      result.index = Number(result.url.split("/")[6]);
      result.color = twColor;
    });

    return data;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    throw error;
  }
};

export { fetchPokemon };
