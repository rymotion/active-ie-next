export default function DisclosureBar() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center h-full w-full px-20 2xl:px-16">
        <div>
          <p className="text-sm">
            Active: Inland Empire Inc is a 501(c)(3) non-profit organization
            Federal EIN 33-1746388 - All donations are tax-deductible
          </p>
          <p className="text-sm">
            More information is available on our Guidestar page or by opening an
            inquiry at organization@activeie.org
          </p>
        </div>
        <div className="h-full w-full px-20 2xl:px-16">
          <a href="https://app.candid.org/profile/15951102" target="_blank">
            <img src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/15951102/svg" />{" "}
          </a>
        </div>
      </div>
    </div>
  );
}
