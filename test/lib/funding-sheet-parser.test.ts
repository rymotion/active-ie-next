import { describe, it } from "mocha";
import { expect } from "chai";
import {
  parseFundingSheetCsv,
  parseMoneyToCents,
} from "../../src/lib/funding-sheet-parser";

// Mirrors the real "Project Fundraising Summary" export.
const SAMPLE_CSV = `Project Fundraising Summary,
,
Total Contributions (net),"$6,050.29"
  GoFundMe (net),"$3,338.81"
  Givebutter (net),$168.62
  Other donations (net),-
  Grants received,"$2,500.00"
  Active IE matching,$42.86
Processing fees paid,$53.57
Gross raised (net + fees),"$6,103.86"
Total spent,-
Net balance on hand,"$6,050.29"
Fundraising goal,"$22,000.00"
Remaining to goal,"$15,949.71"
% of goal reached,27.5%`;

describe("parseMoneyToCents", () => {
  it("parses quoted currency with thousands separators", () => {
    expect(parseMoneyToCents("$6,050.29")).to.equal(605029);
  });
  it("returns null for dashes, blanks, and percentages", () => {
    expect(parseMoneyToCents("-")).to.equal(null);
    expect(parseMoneyToCents("")).to.equal(null);
    expect(parseMoneyToCents("27.5%")).to.equal(null);
  });
});

describe("parseFundingSheetCsv", () => {
  const entries = parseFundingSheetCsv(SAMPLE_CSV);
  const byLabel = (label: string) =>
    entries.find((entry) => entry.label === label);

  it("categorizes platform donations as individual contributions", () => {
    expect(byLabel("GoFundMe (net)")).to.deep.include({
      kind: "contribution",
      category: "individual_contribution",
      amountCents: 333881,
    });
    expect(byLabel("Givebutter (net)")?.category).to.equal(
      "individual_contribution"
    );
  });

  it("categorizes grants and matching funds", () => {
    expect(byLabel("Grants received")?.category).to.equal("public_org_grant");
    expect(byLabel("Active IE matching")?.category).to.equal(
      "general_fund_allocation"
    );
  });

  it("captures summary figures as metrics", () => {
    expect(byLabel("Total Contributions (net)")).to.deep.include({
      kind: "metric",
      metric: "total_contributions",
    });
    expect(byLabel("Fundraising goal")).to.deep.include({
      kind: "metric",
      metric: "goal",
      amountCents: 2200000,
    });
    expect(byLabel("Net balance on hand")?.metric).to.equal("balance");
    expect(byLabel("Processing fees paid")?.metric).to.equal("fees");
  });

  it("skips empty rows, dashes, percentage rows, and derivable rows", () => {
    expect(byLabel("Other donations (net)")).to.equal(undefined);
    expect(byLabel("Total spent")).to.equal(undefined);
    expect(byLabel("% of goal reached")).to.equal(undefined);
    expect(byLabel("Project Fundraising Summary")).to.equal(undefined);
    expect(byLabel("Remaining to goal")).to.equal(undefined);
  });

  it("stores no contribution rows categorized as 'other' from the sample", () => {
    expect(
      entries.filter(
        (entry) => entry.kind === "contribution" && entry.category === "other"
      )
    ).to.have.lengthOf(0);
  });
});
