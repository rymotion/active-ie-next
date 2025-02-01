// Shop Page
import React from "react";
import NavBarComponent from "../components/common/navbar";
import GuideStarWidget from "../components/guidstar";

export default function ShopPage() {
  return (
    <div>
      <main className="main-content">
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
      <body>Shop Body</body>
      <footer>
        <GuideStarWidget></GuideStarWidget>
      </footer>
    </div>
  );
}
