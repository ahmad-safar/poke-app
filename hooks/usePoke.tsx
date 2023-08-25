import { useInfiniteQuery } from "@tanstack/react-query";

export default function usePoke() {
  const fetchPoke = async ({ pageParam = 0 }) => {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=5&offset=" + pageParam
    );
    const data = await res.json();
    data.results = data.results.map((poke: any) => {
      const url = new URL(poke.url);
      const index = url.pathname.split("/")[4];
      return { ...poke, index };
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
