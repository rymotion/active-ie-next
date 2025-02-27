const DonationBody = () => {
  return (
    <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
      <script defer src="https://www.gofundme.com/static/js/embed.js"></script>
      <script
        async
        src="https://widgets.givebutter.com/latest.umd.cjs?acct=ZJkY9KxBnEd5eqgh&p=other"
      ></script>
      <givebutter-widget id="LPDl8L"></givebutter-widget>
    </div>
  );
};

export default DonationBody;
