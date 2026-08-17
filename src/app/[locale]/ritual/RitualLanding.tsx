"use client";
import React from "react";
import { Button, Tag, PatternBand } from "./ds";
import { RITUAL_CONFIG } from "./config";

type Route = "home" | "ritual" | "pricing" | "events" | "about" | "faq";
type Banner = "ritual" | "heat" | "water";

const mono = (size = 11): React.CSSProperties => ({
  fontFamily: "var(--font-mono)",
  fontSize: size,
  letterSpacing: "0.12em",
});
const monoMuted = (size = 10): React.CSSProperties => ({
  ...mono(size),
  color: "var(--text-muted)",
});
const kana: React.CSSProperties = {
  fontFamily: "var(--font-jp)",
  letterSpacing: "var(--tracking-kana)",
};
const caps: React.CSSProperties = {
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-caps)",
};
const hairline = "var(--border-hairline)";
const input: React.CSSProperties = {
  border: hairline,
  borderRadius: 0,
  background: "var(--paper)",
  padding: "12px 14px",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  color: "var(--ink)",
  boxSizing: "border-box",
  width: "100%",
  minWidth: 0,
};
const field: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  minWidth: 0,
};
const wrap: React.CSSProperties = {
  maxWidth: 1160,
  margin: "0 auto",
  padding: "60px 40px 90px",
};
const specRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 20px",
};

function useRoute(): [Route, () => void] {
  const [route, setRoute] = React.useState<Route>("home");
  React.useEffect(() => {
    const read = () => {
      const h = (location.hash.replace(/^#\/?/, "") || "home") as Route;
      setRoute(
        ["home", "ritual", "pricing", "events", "about", "faq"].includes(h)
          ? h
          : "home",
      );
      window.scrollTo(0, 0);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  return [
    route,
    () => {
      location.hash = "#/";
    },
  ];
}

export default function RitualLanding() {
  const [route] = useRoute();
  const [theme, setTheme] = React.useState<"auto" | "light" | "dark">("auto");
  const [sysDark, setSysDark] = React.useState(false);
  const [banner, setBanner] = React.useState<Banner>("ritual");

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => setSysDark(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  React.useEffect(() => {
    if (route !== "home") return;
    const onScroll = () => {
      const mid = window.innerHeight * 0.5;
      let active: Banner = "ritual";
      const heat = document.getElementById("proto-heat");
      const water = document.getElementById("proto-water");
      if (heat && heat.getBoundingClientRect().top < mid) active = "heat";
      if (water && water.getBoundingClientRect().top < mid) active = "water";
      setBanner(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [route]);

  const dark = theme === "dark" || (theme === "auto" && sysDark);
  const scrollToForm = () => {
    if ((location.hash.replace(/^#\/?/, "") || "home") !== "home")
      location.hash = "#/";
    setTimeout(() => {
      const el = document.getElementById("signup");
      if (el)
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 80,
          behavior: "smooth",
        });
    }, 60);
  };

  return (
    <div
      className={`ritual${sysDark ? " ritual-sys-dark" : ""}`}
      data-theme={theme}
      style={{
        minHeight: "100vh",
        transition: "background 150ms, color 150ms",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          padding: "20px 40px",
          borderBottom: hairline,
          position: "sticky",
          top: 0,
          background: "var(--bone)",
          zIndex: 20,
        }}
      >
        <a
          href="#/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            textDecoration: "none",
            color: "var(--ink)",
          }}
        >
          <img
            src="/ritual/mark-ink.svg"
            alt="Ritual seal"
            className="r-seal-ink"
            style={{ width: 36, height: 36, display: "block" }}
          />
          <img
            src="/ritual/mark-reversed.svg"
            alt="Ritual seal"
            className="r-seal-dark"
            style={{ width: 36, height: 36 }}
          />
          <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                ...caps,
              }}
            >
              Ritual
            </span>
            <span style={monoMuted(9)}>COLD PLUNGE · CONTRAST THERAPY</span>
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Tag variant="accent">PILOT · LIMITED SPOTS</Tag>
          <button
            className="r-theme-btn"
            onClick={() => setTheme(dark ? "light" : "dark")}
            style={{
              border: hairline,
              borderRadius: 0,
              background: "transparent",
              color: "var(--ink)",
              cursor: "pointer",
              ...mono(10),
              padding: "7px 12px",
            }}
          >
            {dark ? "LIGHT" : "DARK"}
          </button>
          <Button variant="primary" size="sm" onClick={scrollToForm}>
            Join the list
          </Button>
        </div>
      </header>

      {route === "home" && <Home banner={banner} scrollToForm={scrollToForm} />}
      {route === "ritual" && <RitualScreen scrollToForm={scrollToForm} />}
      {route === "pricing" && <Pricing scrollToForm={scrollToForm} />}
      {route === "events" && <Events scrollToForm={scrollToForm} />}
      {route === "about" && <About />}
      {route === "faq" && <Faq />}

      <PatternBand pattern="tubig" height={56} color="var(--accent)" />
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          padding: "28px 40px",
          borderTop: hairline,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src="/ritual/mark-ink.svg"
            alt=""
            className="r-seal-ink"
            style={{ width: 24, height: 24, display: "block" }}
          />
          <img
            src="/ritual/mark-reversed.svg"
            alt=""
            className="r-seal-dark"
            style={{ width: 24, height: 24 }}
          />
          <span style={monoMuted()}>RITUAL · SOUTHERN CALIFORNIA</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <a href={`mailto:${RITUAL_CONFIG.contactEmail}`} style={mono(10)}>
            {RITUAL_CONFIG.contactEmail.toUpperCase()}
          </a>
          <a href={RITUAL_CONFIG.orgUrl} style={mono(10)}>
            ACTIVE INLAND EMPIRE ↗
          </a>
          <span style={{ ...kana, fontSize: 12, color: "var(--text-muted)" }}>
            プランジ · リカバリー
          </span>
        </div>
      </footer>
    </div>
  );
}

function SideBanner({ active }: { active: Banner }) {
  const banners: {
    id: Banner;
    bg: string;
    word: string;
    label: string;
    outlined?: boolean;
  }[] = [
    {
      id: "ritual",
      bg: "#14120F",
      word: "リチュアル",
      label: "RITUAL · THE PRACTICE",
      outlined: true,
    },
    { id: "heat", bg: "#BF3F26", word: "ネツ", label: "NETSU · 90°C" },
    { id: "water", bg: "#22375A", word: "ミズ", label: "MIZU · 4°C" },
  ];
  return (
    <div
      style={{
        position: "sticky",
        top: 77,
        height: "calc(100vh - 77px)",
        alignSelf: "start",
      }}
    >
      {banners.map((b) => (
        <div
          key={b.id}
          style={{
            position: "absolute",
            inset: "16px 0 16px 40px",
            transition: "opacity 400ms",
            opacity: active === b.id ? 1 : 0,
            background: b.bg,
            border: b.outlined ? "1.5px solid #F4EFE6" : undefined,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "32px 0 24px",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-jp)",
              fontWeight: 700,
              fontSize: "clamp(18px, 4vh, 30px)",
              letterSpacing: "0.3em",
              color: "#F4EFE6",
            }}
          >
            {b.word}
          </span>
          <span
            style={{
              writingMode: "vertical-rl",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.3em",
              color: "#F4EFE6",
            }}
          >
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Home({
  banner,
  scrollToForm,
}: {
  banner: Banner;
  scrollToForm: () => void;
}) {
  const panel: React.CSSProperties = {
    minHeight: "calc(100vh - 77px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 26,
    padding: "60px 40px",
    boxSizing: "border-box",
  };
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "150px minmax(0, 1fr)",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <SideBanner active={banner} />
        <div style={{ minWidth: 0 }}>
          <section id="proto-ritual" style={{ ...panel, gap: 30 }}>
            <span style={monoMuted(11)}>
              THE PRACTICE · SOUTHERN CALIFORNIA
            </span>
            <h1
              style={{
                fontSize: "clamp(64px, 10vw, 130px)",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                lineHeight: 0.95,
              }}
            >
              Ritual
            </h1>
            <p
              style={{
                fontSize: "var(--text-lg)",
                maxWidth: "44ch",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              A pop-up contrast ritual, brought to your door. From city blocks
              to the Mojave. Limited pilot.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <Button variant="accent" size="lg" onClick={scrollToForm}>
                Get early access
              </Button>
              <span style={monoMuted(11)}>HEAT · COLD · REST · RESET</span>
            </div>
          </section>
          <section id="proto-heat" style={{ ...panel, borderTop: hairline }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ ...mono(11), color: "#BF3F26" }}>
                01 · NETSU · HEAT
              </span>
              <Tag>SAUNA · JOINING THE ROUTE</Tag>
            </div>
            <h2
              style={{
                fontSize: "clamp(48px, 6vw, 84px)",
                textTransform: "uppercase",
                lineHeight: 0.95,
              }}
            >
              The heat opens.
            </h2>
            <p
              style={{
                fontSize: "var(--text-lg)",
                maxWidth: "44ch",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              The sauna is held at ninety degrees celsius. Fifteen minutes. The
              heat does the work — the body lets go before the cold asks
              anything of it.
            </p>
            <div style={{ border: hairline, maxWidth: 420 }}>
              <div style={{ ...specRow, borderBottom: hairline }}>
                <span style={mono()}>TEMPERATURE</span>
                <span style={monoMuted(11)}>90°C</span>
              </div>
              <div style={specRow}>
                <span style={mono()}>DURATION</span>
                <span style={monoMuted(11)}>15 MIN</span>
              </div>
            </div>
          </section>
          <section id="proto-water" style={{ ...panel, borderTop: hairline }}>
            <span style={{ ...mono(11), color: "var(--accent)" }}>
              02 · MIZU · WATER
            </span>
            <h2
              style={{
                fontSize: "clamp(48px, 6vw, 84px)",
                textTransform: "uppercase",
                lineHeight: 0.95,
              }}
            >
              The cold holds.
            </h2>
            <p
              style={{
                fontSize: "var(--text-lg)",
                maxWidth: "44ch",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              The plunge is held at four degrees celsius. Three minutes in, ten
              of stillness, three rounds. Breathe through it. The reset is the
              point.
            </p>
            <div style={{ border: hairline, maxWidth: 420 }}>
              <div style={{ ...specRow, borderBottom: hairline }}>
                <span style={mono()}>TEMPERATURE</span>
                <span style={monoMuted(11)}>4°C</span>
              </div>
              <div style={specRow}>
                <span style={mono()}>REST BETWEEN</span>
                <span style={monoMuted(11)}>10 MIN · TOTONOU</span>
              </div>
            </div>
            <div>
              <Button variant="accent" size="md" onClick={scrollToForm}>
                Join the waitlist
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Hub />
      <Signup />
    </div>
  );
}

function Hub() {
  const cards = [
    { href: "#/ritual", n: "01", t: "The Ritual", jp: "トトノウ" },
    { href: "#/pricing", n: "02", t: "Pricing", jp: "ミズ" },
    { href: "#/events", n: "03", t: "Events", jp: "リカバリー" },
    { href: "#/about", n: "04", t: "About", jp: "リチュアル" },
    { href: "#/faq", n: "05", t: "FAQ", jp: "イキ" },
  ];
  return (
    <section style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 40px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 44,
        }}
      >
        <h2 style={{ fontSize: "var(--text-2xl)", ...caps }}>Explore</h2>
        <span style={monoMuted()}>01–05</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          border: hairline,
        }}
      >
        {cards.map((c, i) => (
          <a
            key={c.n}
            href={c.href}
            className="r-hub-card"
            style={{
              padding: "28px 20px",
              borderRight: i < 4 ? hairline : undefined,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span style={mono(10)}>{c.n}</span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 17,
                ...caps,
              }}
            >
              {c.t}
            </span>
            <span style={{ ...kana, fontSize: 12, opacity: 0.7 }}>{c.jp}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Signup() {
  const [f, setF] = React.useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    budget: "",
    heard: "",
    interest: "Both",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");
  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setF((p) => ({
        ...p,
        [k]:
          k === "zip"
            ? e.target.value.replace(/\D/g, "").slice(0, 5)
            : e.target.value,
      }));
  const submit = async () => {
    if (!/^\S+@\S+\.\S+$/.test(f.email))
      return setError("A VALID EMAIL IS REQUIRED");
    if (f.zip.length !== 5) return setError("A 5-DIGIT ZIP IS REQUIRED");
    const entry = { ...f, at: new Date().toISOString() };
    try {
      const res = await fetch(RITUAL_CONFIG.WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error();
    } catch {
      try {
        // fallback so no signup is silently lost while the endpoint is unwired
        const list = JSON.parse(
          localStorage.getItem("ritual-waitlist") || "[]",
        );
        list.push(entry);
        localStorage.setItem("ritual-waitlist", JSON.stringify(list));
      } catch {}
    }
    setError("");
    setSubmitted(true);
  };
  return (
    <section
      id="signup"
      style={{ maxWidth: 1160, margin: "0 auto", padding: "20px 40px 90px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(260px, 380px) minmax(0, 1fr)",
          gap: 60,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ ...kana, fontWeight: 700, fontSize: 16 }}>
              リカバリー
            </span>
            <span style={monoMuted()}>RECOVERY</span>
          </div>
          <h2 style={{ fontSize: "var(--text-2xl)", ...caps }}>
            Get on the list
          </h2>
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              textWrap: "pretty",
            }}
          >
            The pilot is limited. Early names get founding rates.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "LOS ANGELES",
              "ORANGE COUNTY",
              "INLAND EMPIRE",
              "COACHELLA VALLEY",
            ].map((r) => (
              <Tag key={r}>{r}</Tag>
            ))}
          </div>
        </div>
        {submitted ? (
          <div
            style={{
              border: hairline,
              padding: "60px 48px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              alignItems: "flex-start",
            }}
          >
            <span style={{ ...kana, fontWeight: 700, fontSize: 26 }}>
              トトノウ
            </span>
            <h3 style={{ fontSize: "var(--text-xl)", ...caps }}>
              You are on the list
            </h3>
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                maxWidth: "44ch",
              }}
            >
              We reach out to you soon. No noise before then.
            </p>
            <span style={monoMuted()}>CONFIRMED · {f.zip || "SOCAL"}</span>
          </div>
        ) : (
          <div
            style={{
              border: hairline,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 24,
              }}
            >
              <label style={field}>
                <span style={mono(10)}>NAME</span>
                <input
                  value={f.name}
                  onChange={set("name")}
                  placeholder="Your name"
                  style={input}
                />
              </label>
              <label style={field}>
                <span style={mono(10)}>EMAIL *</span>
                <input
                  value={f.email}
                  onChange={set("email")}
                  type="email"
                  placeholder="you@example.com"
                  style={input}
                />
              </label>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 24,
              }}
            >
              <label style={field}>
                <span style={mono(10)}>PHONE</span>
                <input
                  value={f.phone}
                  onChange={set("phone")}
                  type="tel"
                  placeholder="(909) 000-0000"
                  style={{ ...input, fontFamily: "var(--font-mono)" }}
                />
              </label>
              <label style={field}>
                <span style={mono(10)}>ZIP CODE *</span>
                <input
                  value={f.zip}
                  onChange={set("zip")}
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="90000"
                  style={{ ...input, fontFamily: "var(--font-mono)" }}
                />
              </label>
            </div>
            <div style={field}>
              <span style={mono(10)}>I AM INTERESTED IN</span>
              <div style={{ display: "flex", border: hairline }}>
                {["Personal", "Events", "Both"].map((o) => (
                  <button
                    key={o}
                    onClick={() => setF((p) => ({ ...p, interest: o }))}
                    style={{
                      flex: 1,
                      padding: "12px 8px",
                      border: "none",
                      borderRight: "1.5px solid var(--ink)",
                      borderRadius: 0,
                      cursor: "pointer",
                      ...mono(10),
                      textTransform: "uppercase",
                      background:
                        f.interest === o ? "var(--ink)" : "var(--paper)",
                      color: f.interest === o ? "var(--bone)" : "var(--ink)",
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 24,
              }}
            >
              <label style={field}>
                <span style={mono(10)}>BUDGET RANGE</span>
                <select
                  value={f.budget}
                  onChange={set("budget")}
                  style={{
                    ...input,
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">SELECT</option>
                  <option value="Under $500">UNDER $500</option>
                  <option value="$500–1k">$500 – $1K</option>
                  <option value="$1k–2.5k">$1K – $2.5K</option>
                  <option value="$2.5k+">$2.5K +</option>
                </select>
              </label>
              <label style={field}>
                <span style={mono(10)}>HOW DID YOU HEAR ABOUT US</span>
                <select
                  value={f.heard}
                  onChange={set("heard")}
                  style={{
                    ...input,
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">SELECT</option>
                  <option value="Instagram">INSTAGRAM</option>
                  <option value="Word of mouth">WORD OF MOUTH</option>
                  <option value="An event">AN EVENT</option>
                  <option value="Active Inland Empire">
                    ACTIVE INLAND EMPIRE
                  </option>
                  <option value="Other">OTHER</option>
                </select>
              </label>
            </div>
            {error && (
              <span style={{ ...mono(11), color: "var(--ember)" }}>
                {error}
              </span>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <Button variant="primary" size="lg" onClick={submit}>
                Join the waitlist
              </Button>
              <span style={monoMuted()}>NO SPAM · ONE NOTE AT LAUNCH</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ScreenHead({
  title,
  jp,
  label,
}: {
  title: string;
  jp: string;
  label: string;
}) {
  return (
    <>
      <a href="#/" className="r-back">
        ← BACK
      </a>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          margin: "32px 0 12px",
        }}
      >
        <h1 style={{ fontSize: "var(--text-3xl)", ...caps }}>{title}</h1>
        <span style={{ ...kana, fontSize: 16 }}>{jp}</span>
        <span style={monoMuted()}>{label}</span>
      </div>
    </>
  );
}

const cell = (last = false): React.CSSProperties => ({
  padding: "32px 28px",
  borderRight: last ? undefined : hairline,
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

function RitualScreen({ scrollToForm }: { scrollToForm: () => void }) {
  const steps = [
    [
      "01 · RESERVE",
      "Pick the date",
      "Tell us the site — a driveway, a gym floor, a desert lot. A deposit holds the day.",
    ],
    [
      "02 · ARRIVAL",
      "We set up",
      "The plunge arrives self-contained. Setup takes about thirty minutes. Water and ice are handled.",
    ],
    [
      "03 · ROUNDS",
      "The cold",
      "Guided rounds. Three minutes at four degrees. Breathe through it. Rest between.",
    ],
    [
      "04 · RESET",
      "Totonou",
      "Ten minutes of stillness. The reset the practice is named for. This is the point.",
    ],
  ];
  return (
    <div style={wrap}>
      <ScreenHead
        title="The Ritual"
        jp="トトノウ"
        label="TOTONOU · THE RESET"
      />
      <p
        style={{
          margin: "0 0 44px",
          maxWidth: "52ch",
          color: "var(--text-muted)",
          fontSize: "var(--text-lg)",
          textWrap: "pretty",
        }}
      >
        The plunge is held at four degrees. Three minutes in, ten minutes of
        stillness, three rounds. This is the whole practice.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          border: hairline,
          marginBottom: 60,
        }}
      >
        {steps.map(([n, t, d], i) => (
          <div key={n} style={cell(i === steps.length - 1)}>
            <span style={monoMuted()}>{n}</span>
            <h3 style={{ fontSize: "var(--text-lg)", ...caps }}>{t}</h3>
            <p
              style={{
                margin: 0,
                fontSize: "var(--text-sm)",
                color: "var(--text-muted)",
                textWrap: "pretty",
              }}
            >
              {d}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Button variant="accent" onClick={scrollToForm}>
          Join the waitlist
        </Button>
        <span style={monoMuted(11)}>4°C · 3 MIN · 3 ROUNDS</span>
      </div>
    </div>
  );
}

function Pricing({ scrollToForm }: { scrollToForm: () => void }) {
  const rows = [
    [
      "Pop-up plunge",
      "Small gatherings. Flexible configurations and add-ons.",
      "QUOTED PER SITE",
    ],
    [
      "Gyms + classes",
      "Recurring packages for studios and wellness experiences.",
      "FLEXIBLE PACKAGES",
    ],
    ["Full day", "Sunup to sundown, 5 AM – 10 PM.", "FROM $1,000 DEPOSIT"],
    [
      "Extended operations",
      "Beyond full day, for special events and occasions.",
      "QUOTED",
    ],
  ];
  return (
    <div style={wrap}>
      <ScreenHead title="Pricing" jp="ミズ" label="MIZU · WATER" />
      <p
        style={{
          margin: "0 0 44px",
          maxWidth: "52ch",
          color: "var(--text-muted)",
          fontSize: "var(--text-lg)",
          textWrap: "pretty",
        }}
      >
        Configurations flex to the site and the format — gyms, classes, and
        wellness experiences included. A deposit reserves the date.
      </p>
      <div style={{ border: hairline, marginBottom: 44 }}>
        {rows.map(([t, d, p], i) => (
          <div
            key={t}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: 20,
              padding: "24px 28px",
              borderBottom: i < rows.length - 1 ? hairline : undefined,
              alignItems: "baseline",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 17,
                  ...caps,
                }}
              >
                {t}
              </span>
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-muted)",
                }}
              >
                {d}
              </span>
            </div>
            <span style={{ ...mono(11), letterSpacing: "0.1em" }}>{p}</span>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <h2 style={{ fontSize: "var(--text-xl)", ...caps }}>Add-ons</h2>
        <span style={monoMuted()}>SITE-DEPENDENT</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          border: hairline,
          marginBottom: 44,
        }}
      >
        <div
          style={{
            padding: "24px 28px",
            borderRight: hairline,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span style={mono()}>WATER HAUL</span>
          <p
            style={{
              margin: 0,
              fontSize: "var(--text-sm)",
              color: "var(--text-muted)",
            }}
          >
            Charged when water is not readily available on site.
          </p>
        </div>
        <div
          style={{
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span style={mono()}>ICE HAUL</span>
          <p
            style={{
              margin: 0,
              fontSize: "var(--text-sm)",
              color: "var(--text-muted)",
            }}
          >
            Charged during temperature surges, to hold the plunge at four
            degrees.
          </p>
        </div>
      </div>
      <Button variant="accent" onClick={scrollToForm}>
        Request a quote
      </Button>
    </div>
  );
}

function Events({ scrollToForm }: { scrollToForm: () => void }) {
  const cols = [
    [
      "SMALL GATHERING",
      "Private",
      "Your people, your site. Guided rounds for small groups.",
    ],
    [
      "CLASSES + GYMS",
      "Recurring",
      "The plunge as part of your programming — weekly or by series.",
    ],
    [
      "LARGE FORMAT",
      "Full day",
      "Festivals, races, retreats. 5 AM to 10 PM, extendable for special occasions.",
    ],
  ];
  return (
    <div style={wrap}>
      <ScreenHead title="Events" jp="リカバリー" label="RECOVERY" />
      <p
        style={{
          margin: "0 0 44px",
          maxWidth: "52ch",
          color: "var(--text-muted)",
          fontSize: "var(--text-lg)",
          textWrap: "pretty",
        }}
      >
        From a backyard gathering of six to a large-format wellness event. The
        plunge travels; the format flexes.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          border: hairline,
          marginBottom: 44,
        }}
      >
        {cols.map(([n, t, d], i) => (
          <div key={n} style={cell(i === cols.length - 1)}>
            <span style={monoMuted()}>{n}</span>
            <h3 style={{ fontSize: "var(--text-lg)", ...caps }}>{t}</h3>
            <p
              style={{
                margin: 0,
                fontSize: "var(--text-sm)",
                color: "var(--text-muted)",
                textWrap: "pretty",
              }}
            >
              {d}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Button variant="accent" onClick={scrollToForm}>
          Book an event
        </Button>
        <a href="#/pricing" style={mono(11)}>
          SEE PRICING
        </a>
      </div>
    </div>
  );
}

function About() {
  const facts = [
    ["ORIGIN", "RANCHO CUCAMONGA · BIKE PARK FUND"],
    ["PRACTICE", "CONTRAST THERAPY · 7 DAYS"],
    ["RANGE", "CITY LIFE → MOJAVE DESERT"],
    ["GIVEBACK", "A PORTION → ACTIVE INLAND EMPIRE"],
  ];
  return (
    <div style={wrap}>
      <a href="#/" className="r-back">
        ← BACK
      </a>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          margin: "32px 0 12px",
        }}
      >
        <span style={{ ...kana, fontWeight: 700, fontSize: 18 }}>
          リチュアル
        </span>
        <span style={monoMuted()}>RITUAL · THE PRACTICE</span>
      </div>
      <h1 style={{ fontSize: "var(--text-3xl)", ...caps, margin: "0 0 44px" }}>
        Three heritages.
        <br />
        One Ritual.
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(260px, 420px) minmax(0, 1fr)",
          gap: 60,
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: 0, textWrap: "pretty" }}>
            Ritual started as a fundraiser under Active Inland Empire — building
            community while helping build a bike park in Rancho Cucamonga. It
            grew into a full contrast therapy practice, running weekdays and
            weekends.
          </p>
          <p style={{ margin: 0, textWrap: "pretty" }}>
            Inspired by Finnish sauna culture and Asian design and heritage,
            Ritual Wellness is elevating the experience of sauna and recovery
            culture — from the middle of city life to the remote wilderness of
            the Mojave Desert.
          </p>
          <p style={{ margin: 0, textWrap: "pretty" }}>
            A portion of the business done with us goes back into our sister
            nonprofit, <a href={RITUAL_CONFIG.orgUrl}>Active Inland Empire</a>.
          </p>
        </div>
        <div style={{ border: hairline }}>
          {facts.map(([k, v], i) => (
            <div
              key={k}
              style={{
                padding: "24px 28px",
                borderBottom: i < facts.length - 1 ? hairline : undefined,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 16,
              }}
            >
              <span style={mono()}>{k}</span>
              <span style={{ ...monoMuted(11), textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const qa = [
    [
      "How does cold plunging work?",
      "Short, deliberate cold exposure — three minutes at four degrees — followed by rest. Repeated in rounds, it trains the breath, sharpens recovery, and produces the reset the Japanese call totonou.",
    ],
    [
      "What do I bring?",
      "A swimsuit, a towel, and sandals. We provide the rest.",
    ],
    [
      "Is it safe?",
      "Sessions are supervised and rounds are timed. If you are pregnant or have a heart or blood pressure condition, consult your physician first.",
    ],
    [
      "How is the water kept?",
      "The plunge is held at four degrees, filtered and sanitized between groups, and filled fresh for each event.",
    ],
    [
      "What does my site need?",
      "A level surface and vehicle access. A water source on site is ideal — where there is none, we haul water in as an add-on. Power needs are minimal.",
    ],
    [
      "Where do you travel?",
      "Los Angeles, Orange County, the Inland Empire, and the Coachella Valley. Sites beyond the core routes are quoted with a travel fee.",
    ],
    [
      "What if I need to cancel?",
      "Deposits transfer to a new date with 72 hours notice. Weather holds reschedule at no charge.",
    ],
  ];
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 40px 90px" }}>
      <a href="#/" className="r-back">
        ← BACK
      </a>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          margin: "32px 0 44px",
        }}
      >
        <h1 style={{ fontSize: "var(--text-3xl)", ...caps }}>FAQ</h1>
        <span style={{ ...kana, fontSize: 16 }}>イキ</span>
        <span style={monoMuted()}>IKI · BREATH</span>
      </div>
      <div style={{ borderTop: hairline }}>
        {qa.map(([q, a]) => (
          <div
            key={q}
            style={{
              padding: "28px 0",
              borderBottom: hairline,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <h3 style={{ fontSize: "var(--text-lg)" }}>{q}</h3>
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                maxWidth: "60ch",
                textWrap: "pretty",
              }}
            >
              {a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
