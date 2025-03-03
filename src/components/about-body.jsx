const OrgContentBody = () => {
  return (
    <>
      <div
        className="relative flex w-full w-flex h-full h-flex
      flex-col items-center overflow-hidden py-20 md:py-32"
      >
        <div className="flex flex-col items-center px-4 py-10">
          <h1>Our Mission</h1>
          <p className="max-w-xl text-center">
            To build community by creating, cultivating, and promoting health
            and wellness programs with a low financial barrier of entry in the
            Inland Empire. At Active Inland Empire we aim to be able to foster a
            "third place" with local business partners, city governments, and
            supporting community led efforts to make a safer Southern California
            region.
          </p>
        </div>
        <div className="flex flex-col items-center px-4 ptop-20 pbottom-20">
          <h1>Our Programs</h1>
          <p className="max-w-xl text-center">
            We aim to craft programs that engage with the community and
            introduce people to exercises that they may not have the opportunity
            to try in various settings and events throughout the Inland Empire.
          </p>
        </div>
      </div>
    </>
  );
};

export default OrgContentBody;
