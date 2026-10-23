import { Suspense } from "react";
import { Header } from "widgets/sidebar/header/ui/Header";
import { About } from "widgets/about";
import { WhatIDo } from "widgets/whatIDo";
import { Skills } from "widgets/skills";
import Experience from "widgets/experience/ui/Experience";
import { Portfolio } from "widgets/portfolio";
import { Footer } from "widgets/footer";
import "./app.scss";

export default function App() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <Header />
      <main>
        <About />
        <WhatIDo />
        <Skills />
        <Experience />
        <Portfolio />
      </main>
      <Footer />
    </Suspense>
  );
}
