"use client";

import usePageBottom from "@/hooks/usePageBottom";
import usePoke from "@/hooks/usePoke";

export default function Main() {
  const reachedBottom = usePageBottom();
  const { data, fetchNextPage, hasNextPage, status } = usePoke();

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (reachedBottom && hasNextPage) {
    fetchNextPage();
  }

  return (
    <main>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center p-4">
        {data!.pages.map((page) => {
          return page.results.map((poke: any) => {
            return (
              <div
                key={poke.index}
                className={`bg-${
                  poke.color == "white" ? poke.color : poke.color + "-400"
                } rounded-lg p-2`}
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
    </main>
  );
}
