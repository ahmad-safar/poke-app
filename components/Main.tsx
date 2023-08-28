"use client";

import { useEffect } from "react";
import usePageBottom from "@/hooks/usePageBottom";
import usePokemon from "@/hooks/usePokemon";
import Pokemon from "./Pokemon";
import Loading from "./Loading";

export default function Main() {
  const reachedBottom = usePageBottom();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    usePokemon();

  useEffect(() => {
    if (reachedBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [reachedBottom, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const renderPokemons = () => {
    return data!.pages.map((page) =>
      page.results.map((pokemon) => (
        <Pokemon key={pokemon.name} pokemon={pokemon} />
      )),
    );
  };

  return (
    <main>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center p-4">
        {renderPokemons()}
      </div>
      {isFetchingNextPage && <Loading className="mx-auto pb-5" />}
    </main>
  );
}
