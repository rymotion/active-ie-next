import Link from "next/link";
import RouteButton from "../components/navigator";

export default function Contact() {
  return (
    <div>
      <main className="body-content">
        <div id="flutter-instance">
          {/* <Script
              src="/activeie/build/web/main.dart.js"
              strategy="lazyOnload"
            /> */}
          <RouteButton route="/" label="Home"></RouteButton>
        </div>
      </main>
      <footer>
        <p>
          <div id="bottom-window">
            <div id="mni-membership-638729690023438592"></div>
            <a
              href="https://www.guidestar.org/profile/shared/e95c1efc-1ebe-48de-85cc-9f034513d9cf"
              target="_blank"
            >
              <img src="https://widgets.guidestar.org/TransparencySeal/10310069" />
            </a>
          </div>
        </p>
      </footer>
    </div>
  );
}
