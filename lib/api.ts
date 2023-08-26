type Pokemon = {
  name: string;
  url: string;
  index: number;
  color: string;
};

type PokemonResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

const fetchColor = async (index: number) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${index}`
    );
    const data = await response.json();
    return data.color.name;
  } catch (error) {
    console.error("Error fetching color:", error);
    return "black";
  }
};

const fetchPokemon = async ({ pageParam = "0" }) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pageParam}`
    );
    const data = (await response.json()) as PokemonResponse;

    const colorPromises = data.results.map((result) => {
      const url = new URL(result.url);
      const index = Number(url.pathname.split("/")[4]);
      if (Number(index) > 10000) {
        return Promise.resolve("black");
      } else {
        return fetchColor(index);
      }
    });

    const colorsData = await Promise.allSettled(colorPromises);

    data.results.forEach((result: any, index: any) => {
      const color =
        colorsData[index].status === "fulfilled"
          ? (colorsData[index] as any).value
          : "black";

      let twColor;
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

      result.index = result.url.split("/")[6];
      result.color = twColor;
    });

    return data;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    throw error;
  }
};

export { fetchPokemon };
