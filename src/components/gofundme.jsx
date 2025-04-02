import { Suspense } from "react";

const GofundmeWidget = () => {
  return (
    <Suspense fallback={<LoadingGFW></LoadingGFW>}>
      <button>
        <div
          class="gfm-embed"
          data-url="https://www.gofundme.com/f/axels-eagle-project-bike-ramps-for-rancho-cucamonga/widget/large?sharesheet=manage hero&attribution_id=sl:36c9bb55-d95a-46ce-a8fa-197a857f6dcf"
        ></div>
        <script
          defer
          src="https://www.gofundme.com/static/js/embed.js"
        ></script>
      </button>
    </Suspense>
  );
};

const LoadingGFW = () => {
  return <LoadingSkeleton></LoadingSkeleton>;
};

export default GofundmeWidget;

// look at accessibility on lightmode
