const fetchColor = async (index: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`);
  const data = await res.json();
  return data.color.name;
};

const fetchPokemon = async ({ pageParam = "0" }) => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + pageParam
  );
  const data = await res.json();
  const colors = [];
  for (const key in data.results) {
    const url = new URL(data.results[key].url);
    const index = url.pathname.split("/")[4];
    if (Number(index) > 10000) {
      colors[Number(index)] = Promise.resolve("black");
    } else {
      colors[Number(index)] = fetchColor(index);
    }
    data.results[key].index = index;
  }
  const colorsData = await Promise.allSettled(colors);

  for (const key in data.results) {
    const color =
      colorsData[data.results[key].index].status === "fulfilled"
        ? (colorsData[data.results[key].index] as any).value
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
        twColor = color + "-400";
        break;
    }
    data.results[key].color = twColor;
  }
  return data;
};

export { fetchPokemon };
