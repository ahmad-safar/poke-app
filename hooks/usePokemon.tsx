import { fetchPokemon } from '@/lib/api';
import { useInfiniteQuery } from "@tanstack/react-query";

export default function usePokemon() {
  return useInfiniteQuery({
    queryKey: ["pokes"],
    queryFn: fetchPokemon,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const offset = url.searchParams.get("offset");
      return offset!;
    },
    defaultPageParam: "0",
  });
}
