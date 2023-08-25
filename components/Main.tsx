"use client";

import usePageBottom from "@/hooks/usePageBottom";
import usePoke from "@/hooks/usePoke";
import { useEffect } from 'react';

export default function Main() {
  const reachedBottom = usePageBottom();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = usePoke();

  useEffect(() => {
    if (reachedBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [reachedBottom, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (status === "pending") {
    return <div className="p-5">Loading...</div>;
  }
  return (
    <main>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center p-4">
        {data!.pages.map((page) => {
          return page.results.map((poke: any) => {
            return (
              <div
                key={poke.index}
                className={`bg-${poke.color} rounded-lg p-2`}
              >
                <img
                  key={poke.index}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.index}.png`}
                  alt={poke.name}
                />
                <p
                  className={
                    poke.color == "white" ? "text-black" : "text-white"
                  }
                >
                  {poke.name}
                </p>
              </div>
            );
          });
        })}
      </div>
      {isFetchingNextPage && <div className="px-5 mb-5">Loading...</div>}
    </main>
  );
}
