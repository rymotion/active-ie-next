"use client";

import Image from "next/image";
import Screen from "@/components/screen/screen";
import LogoAsset from "@/assets/logo.png";
import { useTranslations } from "next-intl";
import InquiryForm from "./inquiry-form";

const CONTACT_EMAIL = "organization@activeie.org";

// Explicit font/size classes so the sheet is unaffected by the global
// `h1 { font-family: var(--font-beba); font-size: xx-large; }` rule.
const sectionHeadingClass =
  "mb-4 border-b-2 border-maroon pb-1 font-sans text-lg font-bold uppercase tracking-wide text-maroon sm:text-xl";

const headerCellClass =
  "px-3 py-2 font-sans text-xs font-bold uppercase tracking-wider sm:text-sm";

const heroVideoUrl =
  "https://cdn.shopify.com/videos/c/o/v/bafe408dc75145d8a4538bacfd679a10.mov";

const sideVideoUrl =
  "https://cdn.shopify.com/videos/c/o/v/f3d9fe2a49d94fb08a7d8502cb7cbdf2.mp4";

export default function ContrastTherapyPage() {
  const t = useTranslations();

  const includeItems = [
    t("contrastTherapy.includes1"),
    t("contrastTherapy.includes2"),
    t("contrastTherapy.includes3"),
    t("contrastTherapy.includes4"),
    t("contrastTherapy.includes5"),
    t("contrastTherapy.includes6"),
  ];

  const depositRows: [string, string, string, string][] = [
    [t("contrastTherapy.depositRowSingleOnSite"), "$165", "$82.50", "$82.50"],
    [t("contrastTherapy.depositRowSingleBring"), "$365", "$182.50", "$182.50"],
    [t("contrastTherapy.depositRowPartyOnSite"), "$300", "$150.00", "$150.00"],
    [t("contrastTherapy.depositRowPartyBring"), "$500", "$250.00", "$250.00"],
  ];

  const sameDayDepositRows: [string, string, string, string][] = [
    [
      t("contrastTherapy.depositRowSingleOnSiteSameDay"),
      "$165",
      "$82.50",
      "$82.50",
    ],
    [
      t("contrastTherapy.depositRowSingleBringSameDay"),
      "$365",
      "$182.50",
      "$182.50",
    ],
    [
      t("contrastTherapy.depositRowPartyOnSiteSameDay"),
      "$300",
      "$150.00",
      "$150.00",
    ],
    [
      t("contrastTherapy.depositRowPartyBringSameDay"),
      "$500",
      "$250.00",
      "$250.00",
    ],
  ];

  return (
    <Screen>
      <div className="full-bleed bg-maroon px-4 py-10 sm:px-6 md:py-16">
        <article className="mx-auto w-full max-w-4xl rounded-lg bg-white p-5 text-gray-900 shadow-2xl sm:p-8 md:p-10">
          {/* Sheet header */}
          <header className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={LogoAsset}
                alt={t("contrastTherapy.logoAlt")}
                width={80}
                height={80}
                className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
                priority
              />
              <div>
                <h1 className="font-sans text-2xl font-extrabold uppercase leading-tight tracking-wide text-maroon sm:text-3xl">
                  {t("common.activeInlandEmpire")}
                </h1>
                <p className="mt-1 text-sm font-semibold text-red-700 sm:text-base">
                  {t("contrastTherapy.subtitle")}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-xs leading-5 text-gray-500 sm:text-right">
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
                  {t("contact.email")}
                </a>
              </p>
              <p>{t("contrastTherapy.contactWebsite")}</p>
              <p>{t("contrastTherapy.contactLocation")}</p>
            </div>
          </header>

          <p className="mt-3 text-xs text-gray-500">
            {t("contrastTherapy.metaLine")}
          </p>

          <p className="mt-5 text-sm leading-6 text-gray-800 sm:text-base">
            {t("contrastTherapy.intro")}
          </p>

          {/* Multimedia placeholder: video */}
          <div className="mt-6">
            <video src={heroVideoUrl} controls className="w-full" />
          </div>

          {/* Packages */}
          <section className="mt-8">
            <h2 className={sectionHeadingClass}>
              {t("contrastTherapy.packagesHeading")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-center text-sm">
                <thead>
                  <tr className="bg-maroon text-white">
                    <th scope="col" className={headerCellClass}>
                      {t("contrastTherapy.pkgSingle")}
                    </th>
                    <th scope="col" className={headerCellClass}>
                      {t("contrastTherapy.pkgParty")}
                    </th>
                    <th scope="col" className={headerCellClass}>
                      {t("contrastTherapy.pkgCustom")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-cream">
                    <td className="px-3 py-2">
                      {t("contrastTherapy.gallonsSingle")}
                    </td>
                    <td className="px-3 py-2">
                      {t("contrastTherapy.gallonsParty")}
                    </td>
                    <td className="px-3 py-2">
                      {t("contrastTherapy.gallonsCustom")}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-3 font-sans text-2xl font-extrabold text-maroon sm:text-3xl">
                      $165
                    </td>
                    <td className="px-3 py-3 font-sans text-2xl font-extrabold text-maroon sm:text-3xl">
                      $300
                    </td>
                    <td className="px-3 py-3 font-sans text-2xl font-extrabold text-maroon sm:text-3xl">
                      $300+
                    </td>
                  </tr>
                  <tr className="bg-cream">
                    <td
                      colSpan={3}
                      className="px-3 py-1.5 text-xs text-gray-600"
                    >
                      {t("contrastTherapy.waterOnSiteCaption")}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-3 py-3 font-sans text-2xl font-extrabold text-red-600 sm:text-3xl">
                      $365
                    </td>
                    <td className="px-3 py-3 font-sans text-2xl font-extrabold text-red-600 sm:text-3xl">
                      $500
                    </td>
                    <td className="px-3 py-3 font-sans text-2xl font-extrabold text-red-600 sm:text-3xl">
                      $500+
                    </td>
                  </tr>
                  <tr className="bg-cream">
                    <td
                      colSpan={3}
                      className="px-3 py-1.5 text-xs text-gray-600"
                    >
                      {t("contrastTherapy.weBringCaption")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-700">
              <strong>{t("contrastTherapy.customNoteLead")}</strong>{" "}
              {t("contrastTherapy.customNoteBody")}
            </p>
          </section>

          {/* Includes */}
          <section className="mt-8">
            <h2 className={sectionHeadingClass}>
              {t("contrastTherapy.includesHeading")}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {includeItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-800"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-bold text-red-600"
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Multimedia placeholders: photos */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <video src={sideVideoUrl} controls className="w-full rounded-md" />

            <video src={sideVideoUrl} controls className="w-full rounded-md" />
          </div>

          {/* Water options */}
          <section className="mt-8">
            <h2 className={sectionHeadingClass}>
              {t("contrastTherapy.waterHeading")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-maroon text-white">
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.waterColOption")}
                    </th>
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.waterColMeaning")}
                    </th>
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.waterColPricing")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white align-top">
                    <th
                      scope="row"
                      className="px-3 py-2 text-left font-semibold text-gray-900"
                    >
                      {t("contrastTherapy.waterOnSiteOption")}
                    </th>
                    <td className="px-3 py-2 text-gray-700">
                      {t("contrastTherapy.waterOnSiteMeaning")}
                    </td>
                    <td className="px-3 py-2 font-semibold text-maroon">
                      {t("contrastTherapy.waterOnSitePricing")}
                    </td>
                  </tr>
                  <tr className="bg-cream align-top">
                    <th
                      scope="row"
                      className="px-3 py-2 text-left font-semibold text-gray-900"
                    >
                      {t("contrastTherapy.waterBringOption")}
                    </th>
                    <td className="px-3 py-2 text-gray-700">
                      {t("contrastTherapy.waterBringMeaning")}
                    </td>
                    <td className="px-3 py-2 font-semibold text-red-600">
                      {t("contrastTherapy.waterBringPricing")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Deposit & booking terms */}
          <section className="mt-8">
            <h2 className={sectionHeadingClass}>
              {t("contrastTherapy.depositHeading")}
            </h2>
            <p className="text-sm leading-6 text-gray-800">
              {t("contrastTherapy.depositTerms")}
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-maroon text-white">
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.depositColPackage")}
                    </th>
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.depositColTotal")}
                    </th>
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.depositColDeposit")}
                    </th>
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.depositColBalance")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {depositRows.map(
                    ([label, total, deposit, balance], index) => (
                      <tr
                        key={label}
                        className={index % 2 === 0 ? "bg-white" : "bg-cream"}
                      >
                        <th
                          scope="row"
                          className="px-3 py-2 text-left font-semibold text-gray-900"
                        >
                          {label}
                        </th>
                        <td className="px-3 py-2 font-semibold text-maroon">
                          {total}
                        </td>
                        <td className="px-3 py-2 text-gray-800">{deposit}</td>
                        <td className="px-3 py-2 text-gray-800">{balance}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              {t("contrastTherapy.finePrint")}
            </p>
          </section>

          {/* Same day booking */}
          <section className="mt-8">
            <h2 className={sectionHeadingClass}>
              {t("contrastTherapy.sameDayBookingHeading")}
            </h2>
            <p className="text-sm leading-6 text-gray-800">
              {t("contrastTherapy.sameDayBookingTerms")}
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-maroon text-white">
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.depositColPackage")}
                    </th>
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.depositColTotal")}
                    </th>
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.depositColDeposit")}
                    </th>
                    <th scope="col" className={`${headerCellClass} text-left`}>
                      {t("contrastTherapy.depositColBalance")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sameDayDepositRows.map(
                    ([label, total, deposit, balance], index) => (
                      <tr
                        key={label}
                        className={index % 2 === 0 ? "bg-white" : "bg-cream"}
                      >
                        <th
                          scope="row"
                          className="px-3 py-2 text-left font-semibold text-gray-900"
                        >
                          {label}
                        </th>
                        <td className="px-3 py-2 font-semibold text-maroon">
                          {total}
                        </td>
                        <td className="px-3 py-2 text-gray-800">{deposit}</td>
                        <td className="px-3 py-2 text-gray-800">{balance}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              {t("contrastTherapy.finePrint")}
            </p>
          </section>

          {/* Inquiry form */}
          <section className="mt-10">
            <h2 className={sectionHeadingClass}>
              {t("contrastTherapy.form.heading")}
            </h2>
            <p className="mb-4 text-sm text-gray-700">
              {t("contrastTherapy.form.intro")}
            </p>
            <InquiryForm />
          </section>
        </article>
      </div>
    </Screen>
  );
}
