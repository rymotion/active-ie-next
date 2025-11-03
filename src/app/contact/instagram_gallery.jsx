import { useEffect } from "react";

export const InstaWidgetMain = () => {
  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-full max-w-4xl mx-auto py-40">
      {/* Desktop version - larger embed */}
      <div className="hidden md:block">
        <div className="flex justify-center">
          <blockquote
            className="instagram-media w-full max-w-2xl"
            data-instgrm-permalink="https://www.instagram.com/actv_ie/"
            data-instgrm-version="14"
            data-instgrm-width="100%"
          >
            {/* Loading state */}
            <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
              <p>Loading Instagram feed...</p>
            </div>
          </blockquote>
        </div>
      </div>

      {/* Mobile version - smaller embed */}
      <div className="md:hidden">
        <blockquote
          className="instagram-media w-full"
          data-instgrm-permalink="https://www.instagram.com/actv_ie/"
          data-instgrm-version="14"
          data-instgrm-width="100%"
        >
          {/* Loading state */}
          <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
            <p>Loading Instagram feed...</p>
          </div>
        </blockquote>
      </div>
    </div>
  );
};

export const InstaWidgetD2D = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="w-full h-full max-w-4xl mx-auto py-40">
      {/* Desktop version - larger embed */}
      <div className="hidden md:block">
        <div className="flex justify-center">
          <blockquote
            className="instagram-media w-full max-w-2xl"
            data-instgrm-permalink="https://www.instagram.com/death2detox/"
            data-instgrm-version="14"
            data-instgrm-width="100%"
          >
            {/* Loading state */}
            <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
              <p>Loading Instagram feed...</p>
            </div>
          </blockquote>
        </div>
      </div>

      {/* Mobile version - smaller embed */}
      <div className="md:hidden">
        <blockquote
          className="instagram-media w-full"
          data-instgrm-permalink="https://www.instagram.com/death2detox/"
          data-instgrm-version="14"
          data-instgrm-width="100%"
        >
          {/* Loading state */}
          <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
            <p>Loading Instagram feed...</p>
          </div>
        </blockquote>
      </div>
    </div>
  );
};
