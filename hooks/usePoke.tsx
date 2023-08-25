import { useInfiniteQuery } from "@tanstack/react-query";

const fetchColor = async (index: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`);
  const data = await res.json();
  return data.color.name;
};

export default function usePoke() {
  const fetchPoke = async ({ pageParam = "0" }) => {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + pageParam
    );
    const data = await res.json();
    const colors = [];
    for (const key in data.results) {
      const url = new URL(data.results[key].url);
      const index = url.pathname.split("/")[4];
      colors[Number(index)] = fetchColor(index);
      data.results[key].index = index;
    }
    const colorsData = await Promise.all(colors);

    for (const key in data.results) {
      const color = colorsData[data.results[key].index];
      let twColor
      switch (color) {
        case "white":
          twColor = "white"
          break;
        case "black":
          twColor = "gray-400"
          break;
        default:
          twColor = color + "-400"
          break;
      }
      data.results[key].color = twColor;
    }
    return data;
  };

  return useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchPoke,
    getNextPageParam: (lastPage) => {
      const url = new URL(lastPage.next);
      const offset = url.searchParams.get("offset");
      return offset as any;
    },
    defaultPageParam: "0",
  });
}
