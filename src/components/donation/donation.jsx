const DonationBody = () => {
  return (
    <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
      <div className="flex flex-col items-center px-4 p-20">
        <h1>Your Proceeds</h1>
        <p className="py-20">
          While we continue our capacity and program building for our
          organization, your contribution helps support our efforts, test,
          build, and sustain these "third-place" program. Every contribution
          made we also ask contributors if they want regular updates on the
          impact their proceeds made.
        </p>
        <p className="py-20">
          Future efforts we look to support athletes and have event
          sponsorships. More details about our Athletics Fund will be released
          once we are ready.
        </p>
        <div className="py-10">
          <script
            defer
            src="https://www.gofundme.com/static/js/embed.js"
          ></script>
          <script
            async
            src="https://widgets.givebutter.com/latest.umd.cjs?acct=ZJkY9KxBnEd5eqgh&p=other"
          ></script>
          <givebutter-widget id="LPDl8L"></givebutter-widget>
        </div>
      </div>
    </div>
  );
};

export default DonationBody;
