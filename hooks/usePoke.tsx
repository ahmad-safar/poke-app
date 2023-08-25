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
    await new Promise(async (resolve) => {
      for (const key in data.results) {
        const url = new URL(data.results[key].url);
        const index = url.pathname.split("/")[4];
        const color = await fetchColor(index);
        data.results[key].color = color;
        data.results[key].index = index;
      }
      resolve(data);
    });
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
