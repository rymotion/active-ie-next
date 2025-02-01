import { Bebas_Neue } from "next/font/google";
import RouteButton from "./components/navigator";
import GuideStarWidget from "./components/guidstar";
import NavBarComponent from "./components/common/navbar";
import React from "react";

const font = Bebas_Neue({ weight: "400" });

export default function HomePage() {
  return (
    <div>
      <main className="body-content">
        {/* <div id="flutter-instance">
          {/* <Script
            src="/activeie/build/web/main.dart.js"
            strategy="lazyOnload"
          /> */}
        {/* </div> */}
        <div id="activeie-navbar">
          <NavBarComponent />
        </div>
      </main>
      <footer>
        <GuideStarWidget></GuideStarWidget>
      </footer>
    </div>
  );
}
