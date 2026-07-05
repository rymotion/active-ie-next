"use client";

import { FormEvent, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Mirrors the server-side caps in src/app/api/contrast-inquiry/route.ts.
const FIELD_MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 30,
  eventDate: 40,
  eventLocation: 120,
  message: 2000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INQUIRY_ENDPOINT = "/api/contrast-inquiry";
const CONTACT_EMAIL = "organization@activeie.org";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const labelClass = "mb-1 block text-sm font-semibold text-gray-800";
const inputClass =
  "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/40";
const errorTextClass = "mt-1 text-sm text-red-600";

export default function InquiryForm() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [packageInterest, setPackageInterest] = useState("not_sure");
  const [message, setMessage] = useState("");
  // Honeypot field: hidden from humans, bots tend to fill it.
  const [website, setWebsite] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validate = (): FieldErrors => {
    const nextErrors: FieldErrors = {};
    if (name.trim() === "") {
      nextErrors.name = t("contrastTherapy.form.errorNameRequired");
    }
    const trimmedEmail = email.trim();
    if (trimmedEmail === "") {
      nextErrors.email = t("contrastTherapy.form.errorEmailRequired");
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = t("contrastTherapy.form.errorEmailInvalid");
    }
    if (message.trim() === "") {
      nextErrors.message = t("contrastTherapy.form.errorMessageRequired");
    }
    return nextErrors;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidId = nextErrors.name
        ? "contrast-name"
        : nextErrors.email
          ? "contrast-email"
          : "contrast-message";
      document.getElementById(firstInvalidId)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(INQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          eventDate: eventDate.trim(),
          eventLocation: eventLocation.trim(),
          packageInterest,
          message: message.trim(),
          website,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-md border-2 border-maroon bg-cream p-5"
      >
        <p className="font-bold text-maroon">
          {t("contrastTherapy.form.successTitle")}
        </p>
        <p className="mt-1 text-sm text-gray-800">
          {t("contrastTherapy.form.successBody")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      <p className="mb-4 text-xs text-gray-500">
        {t("contrastTherapy.form.requiredNote")}
      </p>

      {/*
        Honeypot: visually hidden but still rendered, removed from the tab
        order and hidden from assistive tech so real users never touch it.
      */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contrast-website">Website</label>
        <input
          id="contrast-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contrast-name" className={labelClass}>
            {t("contrastTherapy.form.nameLabel")}{" "}
            <span aria-hidden="true" className="text-red-600">
              *
            </span>
          </label>
          <input
            id="contrast-name"
            name="name"
            type="text"
            required
            maxLength={FIELD_MAX_LENGTHS.name}
            autoComplete="name"
            className={inputClass}
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contrast-name-error" : undefined}
          />
          {errors.name && (
            <p id="contrast-name-error" className={errorTextClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contrast-email" className={labelClass}>
            {t("contrastTherapy.form.emailLabel")}{" "}
            <span aria-hidden="true" className="text-red-600">
              *
            </span>
          </label>
          <input
            id="contrast-email"
            name="email"
            type="email"
            required
            maxLength={FIELD_MAX_LENGTHS.email}
            autoComplete="email"
            className={inputClass}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contrast-email-error" : undefined}
          />
          {errors.email && (
            <p id="contrast-email-error" className={errorTextClass}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contrast-phone" className={labelClass}>
            {t("contrastTherapy.form.phoneLabel")}
          </label>
          <input
            id="contrast-phone"
            name="phone"
            type="tel"
            maxLength={FIELD_MAX_LENGTHS.phone}
            autoComplete="tel"
            className={inputClass}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="contrast-event-date" className={labelClass}>
            {t("contrastTherapy.form.eventDateLabel")}
          </label>
          <input
            id="contrast-event-date"
            name="eventDate"
            type="date"
            maxLength={FIELD_MAX_LENGTHS.eventDate}
            className={inputClass}
            value={eventDate}
            onChange={(event) => setEventDate(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="contrast-event-location" className={labelClass}>
            {t("contrastTherapy.form.eventLocationLabel")}
          </label>
          <input
            id="contrast-event-location"
            name="eventLocation"
            type="text"
            maxLength={FIELD_MAX_LENGTHS.eventLocation}
            className={inputClass}
            value={eventLocation}
            onChange={(event) => setEventLocation(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="contrast-package" className={labelClass}>
            {t("contrastTherapy.form.packageLabel")}
          </label>
          <select
            id="contrast-package"
            name="packageInterest"
            className={inputClass}
            value={packageInterest}
            onChange={(event) => setPackageInterest(event.target.value)}
          >
            <option value="single">
              {t("contrastTherapy.form.optionSingle")}
            </option>
            <option value="party">
              {t("contrastTherapy.form.optionParty")}
            </option>
            <option value="custom_large">
              {t("contrastTherapy.form.optionCustom")}
            </option>
            <option value="not_sure">
              {t("contrastTherapy.form.optionNotSure")}
            </option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contrast-message" className={labelClass}>
            {t("contrastTherapy.form.messageLabel")}{" "}
            <span aria-hidden="true" className="text-red-600">
              *
            </span>
          </label>
          <textarea
            id="contrast-message"
            name="message"
            required
            rows={5}
            maxLength={FIELD_MAX_LENGTHS.message}
            className={inputClass}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? "contrast-message-error" : undefined
            }
          />
          {errors.message && (
            <p id="contrast-message-error" className={errorTextClass}>
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-4 rounded-md border border-red-600 bg-red-50 p-4 text-sm text-red-800"
        >
          {t("contrastTherapy.form.errorSubmit")}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex items-center rounded-md bg-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting"
          ? t("contrastTherapy.form.sending")
          : t("contrastTherapy.form.submit")}
      </button>
    </form>
  );
}
