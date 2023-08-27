import Loading from "@/components/Loading";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading className="mx-auto p-5" />}>
        <Main />
      </Suspense>
    </>
  );
}
