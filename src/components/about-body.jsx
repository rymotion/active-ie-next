const OrgContentBody = () => {
  return (
    <>
      <div
        className="relative flex w-full w-flex h-full h-flex
      flex-col items-center overflow-hidden py-20 md:py-32"
      >
        <div className="flex flex-row items-center px-4 py-10">
          <div className="flex flex-col items-center px-4 py-10">
            <h1>Our Mission</h1>
            <p className="max-w-xl text-center">
              To build community by creating, cultivating, and promoting health
              and wellness programs with a low financial barrier of entry in the
              Inland Empire. At Active Inland Empire we aim to be able to foster
              a "third place" with local business partners, city governments,
              and supporting community led efforts to make a safer Southern
              California region.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center px-4">
          <h2>What We Do</h2>
          <p className="max-w-xl text-center">
            We aim to craft programs and help support and raise funds for
            efforts that engage with the community and introduce people to
            activities, exercises, and enhances community facilities that would
            push people to get outside of their house and connect with their
            community throughout the Inland Empire. Below are some of the
            efforts that we take on as an organization
          </p>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default OrgContentBody;
