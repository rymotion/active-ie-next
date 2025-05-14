import GofundmeWidget from "../gofundme";
import style from "@/components/donation/donation.module.css";

const DonationBody = () => {
  return (
    <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
      <div className="flex flex-col items-center px-4 p-20">
        <h1>Your Proceeds</h1>
        <p className="py-10">
          While we continue our capacity and program efforts, your contribution
          helps support our efforts, test, build, and sustain these
          "third-place" program. Every contribution made we also ask
          contributors if they want regular updates on the impact their proceeds
          made.
        </p>
        <p className="py-10">
          If you want to partner with us to help build a better, healthier, and
          safer Inland Empire you can contribute to our General Contribution
          Fund. Monthly we look to allocate 10% of the proceeds given to be used
          on the other efforts listed below.
        </p>
        <h2>
          Additional Benefits to Setting up Monthly, Quarterly, or Annual
          Contributions
        </h2>
        <table className={style.li}>
          {/* <ul>
            <li>Monthly Giveaway for Merch Drops</li>
          </ul>
          <ul>
            <li>Discounts on the online shop</li>
          </ul>
          <ul>
            <li>First Access to Test Events</li>
          </ul> */}
        </table>
        <div className="py-10">
          <script
            async
            src="https://widgets.givebutter.com/latest.umd.cjs?acct=ZJkY9KxBnEd5eqgh&p=other"
          ></script>
          <givebutter-widget id="LPDl8L"></givebutter-widget>
        </div>
        <p className="py-10">
          If you are looking to make a direct impact with a specific effort we
          are supporting here are the projects we are assisting with.
        </p>
        <div className="flex flex-col items-center padding-10">
          <GofundmeWidget />
        </div>
      </div>
    </div>
  );
};

export default DonationBody;
