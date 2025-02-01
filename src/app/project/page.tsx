// Project page
import React from "react";
import NavBarComponent from "../components/common/navbar";
import GuideStarWidget from "../components/guidstar";

export default function ProjectPage() {
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
