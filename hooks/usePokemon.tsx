import { fetchPokemon } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function usePokemon() {
  return useInfiniteQuery({
    queryKey: ["pokes"],
    queryFn: fetchPokemon,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const nextPageUrl = new URL(lastPage.next);
      const offset = nextPageUrl.searchParams.get("offset");
      return offset!;
    },
    defaultPageParam: "0",
  });
}
