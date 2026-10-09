
import { useEffect, useState } from "react";
import "./App.css";
import teamImg from "./assets/team-photo.webp";
import confettiImg from "./assets/confetti.png";

const USER = {
  name: "Saptanshu Wanjari",
  initials: "SW",
};

const NAV = [
  { label: "Home", href: "#home", color: "var(--blue)" },
  { label: "Team", href: "#team", color: "var(--red)" },
  { label: "Events", href: "#events", color: "var(--yellow)" },
  { label: "Gallery", href: "#team", color: "var(--green)" },
  { label: "Portfolio", href: "#faq", color: "var(--purple)" },
  { label: "More", href: "#contact", color: "var(--blue)" },
];

const TEAM_POINTS = [
  {
    title: "Passionate Community Leaders",
    text: "Our organizers build an inclusive environment where developers can connect, share knowledge, and grow together.",
  },
  {
    title: "Empowering Developers",
    text: "We host meetups and codelabs to help developers stay current with modern tools and best practices.",
  },
];

const FAQS = [
  {
    q: "What is GDG RBU?",
    a: "GDG RBU is focused on empowering students through hands-on workshops, tech talks, hackathons, and real-world project collaboration.",
  },
  {
    q: "How to join GDG?",
    a: "Follow our social channels and watch for the recruitment announcement. Any student of the university can apply.",
  },
  {
    q: "What does a GDG Lead do?",
    a: "The Lead plans events, guides the core team, and connects the chapter with Google's developer community.",
  },
  {
    q: "How is GDG related to Google?",
    a: "GDG is a Google-supported program, but each chapter is run independently by volunteers from the community.",
  },
  {
    q: "How to reach us?",
    a: "Email us at gdsc@rknec.edu or visit us at Ramdeobaba University, Nagpur.",
  },
];

const SEARCH_MAP = [
  { keys: ["event", "register", "orientation"], id: "events" },
  { keys: ["team", "member", "lead", "gallery"], id: "team" },
  { keys: ["faq", "question", "join"], id: "faq" },
  { keys: ["contact", "email", "address", "reach"], id: "contact" },
  { keys: ["home", "gdg", "gdgr"], id: "home" },
];

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");

    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [
    theme,
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
  ];
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function Logo({ size = 56, outline = false }) {
  const stroke = outline
    ? { stroke: "var(--ink)", strokeWidth: 3.5 }
    : {};

  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 120 72"
      aria-label="GDG logo"
      role="img"
    >
      <rect
        x="6"
        y="14"
        width="46"
        height="18"
        rx="9"
        fill="#ff2d2d"
        transform="rotate(-35 29 23)"
        {...stroke}
      />
      <rect
        x="6"
        y="36"
        width="46"
        height="18"
        rx="9"
        fill="#2a86ff"
        transform="rotate(35 29 45)"
        {...stroke}
      />
      <rect
        x="68"
        y="14"
        width="46"
        height="18"
        rx="9"
        fill="#00a94f"
        transform="rotate(35 91 23)"
        {...stroke}
      />
      <rect
        x="68"
        y="36"
        width="46"
        height="18"
        rx="9"
        fill="#ffa800"
        transform="rotate(-35 91 45)"
        {...stroke}
      />
    </svg>
  );
}

const Chevron = ({ open }) => (
  <svg
    className={`chev ${open ? "open" : ""}`}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21.5 12a9.5 9.5 0 1 1-5.2-8.5" />
    <path d="M8 11.5l4 4 9-10" />
  </svg>
);

function Navbar({ theme, toggleTheme }) {
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <a href="#home" className="nav-logo" aria-label="Home">
          <Logo size={64} />
        </a>

        <nav
          className={`nav-pills ${menu ? "open" : ""}`}
          aria-label="Main"
        >
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="pill-btn"
              style={{ background: item.color }}
              onClick={() => setMenu(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <div className="profile">
            <button
              className="profile-btn"
              onClick={() => setProfile(!profile)}
              aria-expanded={profile}
            >
              <span className="avatar">{USER.initials}</span>
              <span className="profile-name">{USER.name}</span>
              <Chevron open={profile} />
            </button>

            {profile && (
              <div className="profile-menu">
                <a href="#home" onClick={() => setProfile(false)}>
                  Profile
                </a>
                <a href="#contact" onClick={() => setProfile(false)}>
                  Contact
                </a>
              </div>
            )}
          </div>

          <button
            className="burger"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle menu"
            aria-expanded={menu}
          >
            {menu ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState("");

  const onSearch = (e) => {
    e.preventDefault();

    const q = query.trim().toLowerCase();

    if (!q) return;

    const hit = SEARCH_MAP.find((item) =>
      item.keys.some((key) => q.includes(key))
    );

    if (hit) {
      document
        .getElementById(hit.id)
        ?.scrollIntoView({ behavior: "smooth" });

      setHint("");
    } else {
      setHint("No match. Try: events, team, faq, contact");
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-text">
        <h1>Google Developer Groups, RBU</h1>

        <p>
          Empowering students with cutting-edge tech skills, community, and
          resources for a future in technology
        </p>

        <div className="hero-btns">
          <a href="#events" className="outline-btn">
            Learn more
          </a>
          <a href="#team" className="outline-btn">
            Profile
          </a>
        </div>

        <span className="tag">GDG • RBU</span>
      </div>

      <div className="blob">
        <div className="blob-top" />
        <div className="blob-bottom" />

        <form className="search" onSubmit={onSearch} role="search">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="gdgr"
            aria-label="Search the site"
          />
        </form>

        {hint && <p className="search-hint">{hint}</p>}
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="section">
      <h2 className="section-title reveal">Upcoming Event</h2>

      <div className="events-grid">
        <article className="event-card reveal">
          <span className="status-pill">Upcoming</span>

          <div className="event-body">
            <h3>GDG Orientation</h3>

            <p>
              Google Developer Groups (GDG) – Student Chapter is a community
              of students passionate about technology, innovation, and
              learning. We bring students together to learn, build, and grow
              through technical workshops, hands-on sessions, hackathons,
              projects, and networking.
            </p>

            <a
              href="#contact"
              className="arrow-btn"
              aria-label="Open event details"
            >
              ↗
            </a>
          </div>
        </article>

        <article
          className="ticket reveal"
          style={{ transitionDelay: "120ms" }}
        >
          <span className="notch" aria-hidden="true" />
          <h3>New Event</h3>
          <hr />

          <p className="ticket-label">Date &amp; Time</p>
          <p className="ticket-date">
            Oct 7, 2026
            <br />
            3:00 PM
          </p>

          <a href="#contact" className="register-btn">
            Register Now
          </a>
        </article>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="section">
      <div className="team-card reveal">
        <div className="team-text">
          <h2>Meet the Google Developer Group Team</h2>

          <p>
            Google Developer Groups (GDG) are open and volunteer-run
            communities for developers interested in Google technologies.
            Our team focuses on learning, networking, and collaboration
            through events and hands-on sessions.
          </p>

          <ul className="points">
            {TEAM_POINTS.map((point) => (
              <li key={point.title}>
                <CheckIcon />

                <div>
                  <h4>{point.title}</h4>
                  <p>{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="team-photo">
          <img
            src={teamImg}
            alt="The GDG RBU team posing together at a cafe"
            width="1920"
            height="1440"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section">
      <h2 className="section-title reveal">FAQs</h2>

      <div className="faq-list">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;

          return (
            <div
              key={faq.q}
              className="faq-item reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`faq ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                >
                  <span>{faq.q}</span>
                  <Chevron open={isOpen} />
                </button>

                <div className="faq-a" id={`faq-a-${i}`}>
                  <div className="faq-clip">
                    <p className="faq-box">{faq.a}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <div className="footer-card reveal">
          <div className="foot-head">
            <Logo size={120} outline />

            <h3>Google Developer Groups</h3>
            <p className="foot-sub">
              On Campus • Ramdeobaba University
            </p>
          </div>

          <hr />

          <div className="foot-grid">
            <div className="foot-box blue">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              <p>
                Ramdeobaba University
                <br />
                Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013
              </p>
            </div>

            <a
              className="foot-box yellow"
              href="mailto:gdsc@rknec.edu"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>

              <p>gdsc@rknec.edu</p>
            </a>

            <div className="foot-box purple">
              <p className="follow-title">Follow Us:</p>

              <div className="socials">
                <a href="#" aria-label="Instagram" className="soc red">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1.1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>

                <a href="#" aria-label="LinkedIn" className="soc blue">
                  <b>in</b>
                </a>

                <a href="#" aria-label="X (Twitter)" className="soc green">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="confetti-wrap">
        <img
          className="confetti"
          src={confettiImg}
          alt=""
          aria-hidden="true"
          width="2118"
          height="200"
          loading="lazy"
        />
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();

  useReveal();

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <Events />
        <Team />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
