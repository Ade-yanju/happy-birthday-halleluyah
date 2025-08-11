import React, { useEffect, useMemo, useRef, useState } from "react";

const CONFIG = {
  friendName: "Oluwagbemileke Halleluyah Deborah",
  rotatingTaglines: [
    "Wishing you joy, health, and ridiculous amounts of cake. 🎂",
    "Another orbit around the sun—shinier than ever. ☀️",
    "Today we celebrate your magic. ✨",
    "May your year be bold, bright, and beautiful. 🌈",
    "Cheers to growth, grace, and good chaos. 🥂",
    "Wishing you a day filled with laughter, joy, and cake! 🎂",
    "May your year ahead be as bright and beautiful as you are. 🌟",
    "Happy Birthday! May all your dreams take flight this year. 🕊️",
    "Here’s to another year of blessings and adventures. 🥂",
    "May your special day be surrounded with love and happiness. 💖",
    "Happy Birthday! Keep shining like the star you are. ✨",
    "Sending you hugs, smiles, and all the cake in the world. 🍰",
    "Cheers to you on your big day! May it be unforgettable. 🎉",
    "Happy Birthday! Wishing you health, success, and endless joy. 🌈",
    "Another year older, wiser, and more fabulous! 💃",
  ],
  heroImage: "/assets/halleluyah1.png",
  gallery: [
    "/assets/halleluyah1.png",
    "/assets/halleluyah2.png",
    "/assets/halleluyah3.png",
    "/assets/halleluyah4.png",
    "/assets/halleluyah5.png",
    "/assets/halleluyah6.png",
    "/assets/halleluyah7.png",
    "/assets/halleluyah8.png",
    "/assets/halleluyah9.png",
    "/assets/halleluyah10.png",
  ],
  letter:
    "Another year, another level. Keep shining, keep winning. Thanks for being you. 💜",
  reasons: [
    {
      title: "Kind at Core",
      body: "You lift people up with gentleness and grace.",
    },
    {
      title: "Relentless",
      body: "You finish what you start and raise the bar each time.",
    },
    {
      title: "Hilarious",
      body: "Laughter follows you; joy is your signature.",
    },
    {
      title: "Faith-Fueled",
      body: "You carry gratitude and praise into everything you do.",
    },
    {
      title: "Builder",
      body: "You create memories, communities, and momentum.",
    },
    {
      title: "Radiant",
      body: "Your presence warms the room and steadies friends.",
    },
  ],
  storage: {
    pantryId: "794be05b-1ab3-4906-ae05-b62cf19d975c",
    basket: "oluwagbemileke_wishes",
    pollMs: 8000,
    pageSize: 8,
    keep: 500,
  },
  music: {
    autoplay: true,
    loopAll: true,
    shuffle: false,
    volume: 0.7,
    tracks: [
      "/assets/music/happy_birthday_1.mp3",
      "/assets/music/happy_birthday_2.mp3",
      "/assets/music/happy_birthday_3.mp3",
      "/assets/music/happy_birthday_4.mp3",
      "/assets/music/happy_birthday_5.mp3",
      "/assets/music/happy_birthday_6.mp3",
      "/assets/music/happy_birthday_7.mp3",
    ],
  },
};

const NAME_TAGLINE =
  "Praise to the Lord, who has lifted you to victory, crowned you with wisdom, and filled your life with sweetness.";

const NAME_POEM = [
  "Halleluyah, a song of praise,",
  "Oluwagbemileke, lifted in grace.",
  "Deborah, like the bee so wise,",
  "Spreading sweetness beneath the skies.",
  "Today we honor the gift.",
  "You are a shining light, our brightest star.",
].join("\n");

const ensureKeyframes = (() => {
  let done = false;
  return () => {
    if (done) return;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes floatUp { from { transform: translateY(110vh) } to { transform: translateY(-120vh) } }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
    `;
    document.head.appendChild(style);
    done = true;
  };
})();

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0b0f19",
    color: "#fff",
    fontFamily:
      "Poppins, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },
  page: { maxWidth: 1100, margin: "0 auto", padding: 24 },
  headerWrap: { paddingTop: 24, paddingBottom: 10 },
  hero: {
    display: "grid",
    gap: 18,
    alignItems: "center",
    gridTemplateColumns: "1fr",
    background: "#12172b",
    borderRadius: 16,
    padding: 18,
    border: "1px solid #1f2540",
  },
  heroRowWide: {
    display: "grid",
    gap: 18,
    alignItems: "center",
    gridTemplateColumns: "140px 1fr",
  },
  heroImgWrap: {
    width: "clamp(96px, 18vw, 140px)",
    height: "clamp(96px, 18vw, 140px)",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid #2b335d",
    boxShadow: "0 10px 30px rgba(0,0,0,.35)",
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  name: { fontSize: "clamp(28px,6vw,52px)", margin: 0, lineHeight: 1.1 },
  subtitle: { color: "#94a3b8", marginTop: 6 },
  heroTagline: {
    marginTop: 10,
    color: "#e2e8f0",
    fontSize: "clamp(14px, 2.6vw, 18px)",
    lineHeight: 1.5,
    animation: "fadeIn 700ms ease-out both",
  },
  poem: {
    marginTop: 12,
    color: "#e2e8f0",
    whiteSpace: "pre-line",
    lineHeight: 1.6,
    fontStyle: "italic",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid #1f2540",
    padding: 12,
    borderRadius: 10,
    animation: "fadeIn 900ms 80ms ease-out both",
  },
  actions: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 },
  btn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: "#7c3aed",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  section: { padding: "28px 0" },
  gridCards: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gridAutoRows: "1fr",
  },
  card: {
    background: "#12172b",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #1f2540",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 120,
  },
  fullImg: {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: 10,
    border: "1px solid #1f2540",
    animation: "fadeIn 400ms ease-out both",
  },
  queueWrap: {
    overflow: "hidden",
    borderRadius: 14,
    border: "1px solid #1f2540",
    background: "#12172b",
    padding: 12,
  },
  queueRow: {
    display: "flex",
    gap: 10,
    willChange: "transform",
  },
  queueItem: {
    flex: "0 0 auto",
    maxWidth: "100%",
  },
  letterWrap: {
    maxWidth: 900,
    margin: "0 auto",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
    border: "1px solid #1f2540",
    borderRadius: 14,
    padding: "22px 20px",
    boxShadow: "0 12px 32px rgba(0,0,0,.25)",
    animation: "fadeIn 900ms 120ms ease-out both",
  },
  letterHead: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    color: "#e5e7eb",
  },
  letterBadge: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "conic-gradient(from 0deg, #7c3aed, #06b6d4, #7c3aed 75%)",
    boxShadow: "0 6px 16px rgba(0,0,0,.25)",
    border: "1px solid #2a2f55",
  },
  letterTitle: { margin: 0, fontSize: "1.15rem", letterSpacing: 0.3 },
  letterSub: { margin: "2px 0 12px", color: "#aab2cf", fontSize: ".95rem" },
  letterBody: {
    color: "#e5e7eb",
    lineHeight: 1.85,
    fontSize: "1.05rem",
    letterSpacing: 0.2,
  },
  letterGrid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "1fr",
  },
  letterGridWide: {
    display: "grid",
    gap: 18,
    gridTemplateColumns: "1.2fr 0.8fr",
  },
  letterPanel: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid #1f2540",
    borderRadius: 12,
    padding: 14,
  },
  letterList: {
    margin: "10px 0 0",
    paddingLeft: 18,
    color: "#cbd5e1",
    lineHeight: 1.7,
  },
  letterDivider: {
    height: 1,
    background: "linear-gradient(90deg, transparent, #293056, transparent)",
    margin: "12px 0",
  },
  wishForm: { display: "grid", gap: 10, marginBottom: 20 },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #1f2540",
    background: "#0f1424",
    color: "#fff",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: 8,
    background: "#06b6d4",
    color: "#001018",
    cursor: "pointer",
    fontWeight: 800,
  },
  wishList: { display: "grid", gap: 12 },
  wish: {
    background: "#12172b",
    padding: 14,
    borderRadius: 12,
    border: "1px solid #1f2540",
  },
  paginationBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 14,
  },
  pagerGroup: { display: "flex", alignItems: "center", gap: 8 },
  pagerBtn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #1f2540",
    background: "#0f1424",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  pagerBtnDisabled: { opacity: 0.5, cursor: "not-allowed" },
  pageInfo: { color: "#94a3b8", fontSize: 14 },
  footer: { textAlign: "center", padding: 20, color: "#94a3b8" },
  confettiCanvas: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 3,
  },
  balloonsLayer: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2,
    overflow: "hidden",
  },
  musicBar: {
    position: "fixed",
    bottom: 16,
    right: 16,
    zIndex: 6,
    background: "#12172b",
    border: "1px solid #1f2540",
    borderRadius: 14,
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 10px 26px rgba(0,0,0,.35)",
  },
  musicBtn: {
    border: "1px solid #25305a",
    background: "#0f1424",
    color: "#e5e7eb",
    borderRadius: 10,
    padding: "8px 10px",
    cursor: "pointer",
    fontWeight: 700,
  },
  musicTitle: {
    color: "#94a3b8",
    fontSize: 12,
    maxWidth: 180,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  musicSlider: {
    appearance: "none",
    width: 100,
    height: 6,
    borderRadius: 6,
    background: "#25305a",
    outline: "none",
    cursor: "pointer",
  },
  toast: {
    position: "fixed",
    bottom: 80,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#0f1424",
    color: "#e5e7eb",
    border: "1px solid #1f2540",
    borderRadius: 10,
    padding: "10px 14px",
    zIndex: 6,
  },
};

const escapeHtml = (s = "") =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ])
  );

const Shared = {
  pantryId: CONFIG.storage.pantryId,
  basket: CONFIG.storage.basket,
  async list() {
    const url = `https://getpantry.cloud/apiv1/pantry/${
      this.pantryId
    }/basket/${encodeURIComponent(this.basket)}`;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data.items) ? data.items : [];
    } catch {
      return [];
    }
  },
  async add(w) {
    const current = await this.list();
    current.unshift(w);
    const url = `https://getpantry.cloud/apiv1/pantry/${
      this.pantryId
    }/basket/${encodeURIComponent(this.basket)}`;
    const body = JSON.stringify({
      items: current.slice(0, CONFIG.storage.keep),
    });
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (!res.ok) throw new Error("save failed");
    return current;
  },
};

function useConfetti(confettiRef) {
  useEffect(() => {
    const canvas = confettiRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const N = 260;
    const randomParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.2,
      r: Math.random() * 5 + 2,
      c: `hsl(${Math.random() * 360},90%,70%)`,
      s: Math.random() * 2 + 1,
      a: Math.random() * Math.PI,
      life: 300 + Math.random() * 180,
    });
    let pieces = Array.from({ length: N }, randomParticle);
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i];
        p.y += p.s * 2;
        p.x += Math.sin((p.a += 0.02));
        p.life--;
        if (p.life <= 0 || p.y > canvas.height + 40) {
          pieces[i] = randomParticle();
          pieces[i].y = -20;
          continue;
        }
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [confettiRef]);
}

function Balloons() {
  const [balloons] = useState(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        size: 30 + Math.random() * 30,
        hue: Math.floor(Math.random() * 360),
        duration: 7 + Math.random() * 8,
        delay: -Math.random() * 10,
      });
    }
    return arr;
  });
  return (
    <div id="balloons-layer" style={styles.balloonsLayer} aria-hidden>
      {balloons.map((b) => (
        <div
          key={b.id}
          data-balloon
          style={{
            position: "absolute",
            left: `${b.left}vw`,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: `linear-gradient(135deg, hsl(${b.hue} 80% 60%), hsl(${
              (b.hue + 40) % 360
            } 80% 70%))`,
            boxShadow: "0 8px 16px rgba(0,0,0,.25)",
            animation: `floatUp ${b.duration}s linear infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Hero({ name, tagline }) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 720);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <section style={styles.headerWrap}>
      <div
        style={wide ? { ...styles.hero, ...styles.heroRowWide } : styles.hero}
      >
        <div style={styles.heroImgWrap}>
          <img
            src={CONFIG.heroImage}
            alt="Birthday Star"
            style={styles.heroImg}
          />
        </div>
        <div>
          <h1 style={styles.name}>
            Happy Birthday, <span>{name}</span>! ✨
          </h1>
          <p style={styles.subtitle}>{tagline}</p>
          <p style={styles.heroTagline}>{NAME_TAGLINE}</p>
          <pre style={styles.poem}>{NAME_POEM}</pre>
          <div style={styles.actions}>
            <a href="#wishes" style={styles.btn}>
              Send a Wish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reasons({ items }) {
  return (
    <section style={styles.section}>
      <h2>For You</h2>
      <div style={styles.gridCards}>
        {items.map((r, i) => (
          <article key={i} style={styles.card}>
            <h3 style={{ marginTop: 0 }}>{r.title}</h3>
            <p style={{ margin: 0, color: "#cbd5e1" }}>{r.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function GalleryQueue({ images }) {
  const [start, setStart] = useState(0);
  const [visible, setVisible] = useState(3);
  const tickMs = 2200;
  useEffect(() => {
    const id = setInterval(() => {
      setStart((s) => (s + 1) % images.length);
      setVisible((v) => (v < 10 ? v + 1 : 3));
    }, tickMs);
    return () => clearInterval(id);
  }, [images.length]);
  const windowImgs = Array.from(
    { length: visible },
    (_, i) => images[(start + i) % images.length]
  );
  const itemBasis = `${Math.max(100 / visible, 16)}%`;
  return (
    <section style={styles.section}>
      <h2>Memory Lane</h2>
      <div style={styles.queueWrap}>
        <div style={styles.queueRow}>
          {windowImgs.map((src, i) => (
            <div
              key={`${start}-${i}`}
              style={{ ...styles.queueItem, flexBasis: itemBasis }}
            >
              <img src={src} alt={`memory ${i + 1}`} style={styles.fullImg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Letter() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 900);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <section style={styles.section}>
      <div style={styles.letterWrap}>
        <div style={styles.letterHead}>
          <div style={styles.letterBadge} aria-hidden />
          <div>
            <h3 style={styles.letterTitle}>Open Letter</h3>
            <div style={styles.letterSub}>
              To: Oluwagbemileke Halleluyah Deborah • On your birthday
            </div>
          </div>
        </div>
        <div style={wide ? styles.letterGridWide : styles.letterGrid}>
          <div>
            <div style={styles.letterPanel}>
              <p style={styles.letterBody}>{CONFIG.letter}</p>
              <div style={styles.letterDivider} />
              <p style={styles.letterBody}>
                May this new chapter bring clarity for decisions, courage for
                challenges, and delight in every ordinary moment. May your faith
                stay loud, your laughter effortless, and your work deeply
                meaningful. You are loved, celebrated, and cheered on.
              </p>
            </div>
            <div style={{ height: 10 }} />
            <div style={styles.letterPanel}>
              <strong style={{ color: "#e5e7eb" }}>
                Blessings for the Year
              </strong>
              <ul style={styles.letterList}>
                <li>Joy that outlasts circumstances</li>
                <li>Wisdom that multiplies your impact</li>
                <li>Grace that opens unexpected doors</li>
                <li>Strength to finish what you begin</li>
                <li>Sweetness in friendships and family</li>
              </ul>
            </div>
          </div>
          <div>
            <div style={styles.letterPanel}>
              <strong style={{ color: "#e5e7eb" }}>Gratitude</strong>
              <p style={styles.letterBody}>
                Thank you for your kindness, your steady encouragement, and the
                joy you carry into every room.
              </p>
            </div>
            <div style={{ height: 10 }} />
            <div style={styles.letterPanel}>
              <strong style={{ color: "#e5e7eb" }}>Prayer & Hope</strong>
              <p style={styles.letterBody}>
                May your path be bright, your steps be ordered, and your dreams
                take flight with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Wishes() {
  const [allItems, setAllItems] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const pageSize = CONFIG.storage.pageSize || 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(allItems.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const items = allItems.slice(pageStart, pageEnd);
  const clampPage = (p) => Math.min(Math.max(1, p), totalPages);
  const load = async () => {
    try {
      setLoading(true);
      const ws = await Shared.list();
      const clean = (Array.isArray(ws) ? ws : [])
        .filter((x) => x && typeof x.msg === "string")
        .map((x) => ({
          name: (x.name || "Anonymous").toString().slice(0, 80),
          msg: x.msg.toString().slice(0, 2000),
          ts: Number(x.ts) || 0,
        }))
        .sort((a, b) => (b.ts || 0) - (a.ts || 0));
      setAllItems(clean);
      setPage((p) => clampPage(p));
    } catch {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
    const id = setInterval(load, CONFIG.storage.pollMs || 8000);
    return () => clearInterval(id);
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    const w = {
      name: name.trim() || "Anonymous",
      msg: msg.trim(),
      ts: Date.now(),
    };
    try {
      setLoading(true);
      const ws = await Shared.add(w);
      const clean = (Array.isArray(ws) ? ws : [])
        .filter((x) => x && typeof x.msg === "string")
        .map((x) => ({
          name: (x.name || "Anonymous").toString().slice(0, 80),
          msg: x.msg.toString().slice(0, 2000),
          ts: Number(x.ts) || 0,
        }))
        .sort((a, b) => (b.ts || 0) - (a.ts || 0));
      setAllItems(clean);
      setMsg("");
      setPage(1);
    } catch {
      alert("Couldn't save wish right now.");
    } finally {
      setLoading(false);
    }
  };
  const PrevBtn = (
    <button
      style={{
        ...styles.pagerBtn,
        ...(page <= 1 ? styles.pagerBtnDisabled : {}),
      }}
      onClick={() => setPage((p) => clampPage(p - 1))}
      disabled={page <= 1}
      type="button"
    >
      ◀ Prev
    </button>
  );
  const NextBtn = (
    <button
      style={{
        ...styles.pagerBtn,
        ...(page >= totalPages ? styles.pagerBtnDisabled : {}),
      }}
      onClick={() => setPage((p) => clampPage(p + 1))}
      disabled={page >= totalPages}
      type="button"
    >
      Next ▶
    </button>
  );
  return (
    <section id="wishes" style={styles.section}>
      <h2>Birthday Wishes</h2>
      <form onSubmit={onSubmit} style={styles.wishForm}>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <textarea
          style={{ ...styles.input, minHeight: 92 }}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Your birthday wish…"
          required
        />
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Saving…" : "Send Wish"}
        </button>
        <small style={{ color: "#94a3b8" }}>
          Shared globally auto-refreshing every{" "}
          {Math.round((CONFIG.storage.pollMs || 8000) / 1000)}s.
        </small>
      </form>
      <div style={styles.paginationBar}>
        <div style={styles.pagerGroup}>{PrevBtn}</div>
        <div style={styles.pageInfo}>
          {allItems.length === 0
            ? "No wishes yet be the first!"
            : `Showing ${pageStart + 1}-${Math.min(
                pageEnd,
                allItems.length
              )} of ${allItems.length} • Page ${page} of ${totalPages}`}
        </div>
        <div style={styles.pagerGroup}>{NextBtn}</div>
      </div>
      <div style={styles.wishList}>
        {items.map((w, i) => (
          <div key={`${w.ts}-${i}`} style={styles.wish}>
            <strong>{escapeHtml(w.name || "Anonymous")}</strong>
            <small style={{ color: "#94a3b8" }}>
              {" "}
              • {w.ts ? new Date(w.ts).toLocaleString() : ""}
            </small>
            <div>{escapeHtml(w.msg || "")}</div>
          </div>
        ))}
      </div>
      {allItems.length > 0 && (
        <div style={{ ...styles.paginationBar, marginTop: 10 }}>
          <div style={styles.pagerGroup}>{PrevBtn}</div>
          <div style={styles.pageInfo}>
            Page {page} / {totalPages}
          </div>
          <div style={styles.pagerGroup}>{NextBtn}</div>
        </div>
      )}
    </section>
  );
}

function MusicPlayer() {
  const rawTracks = CONFIG.music.tracks.filter(Boolean);
  const [order, setOrder] = useState(() => {
    const idxs = rawTracks.map((_, i) => i);
    if (CONFIG.music.shuffle) {
      for (let i = idxs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
      }
    }
    return idxs;
  });
  const [pos, setPos] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [needTap, setNeedTap] = useState(false);
  const [volume, setVolume] = useState(CONFIG.music.volume ?? 0.7);
  const audioRef = useRef(null);

  const trackIndex = order[pos % order.length] || 0;
  const currentSrc = rawTracks[trackIndex] || "";

  useEffect(() => {
    if (!audioRef.current || rawTracks.length === 0) return;
    audioRef.current.src = currentSrc;
    audioRef.current.volume = volume;
    if (CONFIG.music.autoplay) {
      const tryPlay = async () => {
        try {
          await audioRef.current.play();
          setPlaying(true);
          setNeedTap(false);
        } catch {
          setNeedTap(true);
          setPlaying(false);
        }
      };
      tryPlay();
    }
  }, [currentSrc]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    const onEnded = () => {
      const nextPos = (pos + 1) % order.length;
      if (nextPos === 0 && !CONFIG.music.loopAll) {
        setPlaying(false);
        return;
      }
      setPos(nextPos);
    };
    const a = audioRef.current;
    a.addEventListener("ended", onEnded);
    return () => a.removeEventListener("ended", onEnded);
  }, [pos, order.length]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
        setNeedTap(false);
      } catch {
        setNeedTap(true);
      }
    }
  };

  const nextTrack = () => setPos((p) => (p + 1) % order.length);
  const prevTrack = () => setPos((p) => (p - 1 + order.length) % order.length);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  if (rawTracks.length === 0) return null;

  return (
    <>
      <audio ref={audioRef} preload="auto" playsInline />
      {needTap && (
        <div style={styles.toast} onClick={togglePlay}>
          Tap to play birthday music
        </div>
      )}
      <div style={styles.musicBar}>
        <button style={styles.musicBtn} onClick={prevTrack}>
          Prev
        </button>
        <button style={styles.musicBtn} onClick={togglePlay}>
          {playing ? "Pause" : "Play"}
        </button>
        <button style={styles.musicBtn} onClick={nextTrack}>
          Next
        </button>
        <button style={styles.musicBtn} onClick={toggleMute}>
          {muted ? "Unmute" : "Mute"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={styles.musicSlider}
          aria-label="Volume"
        />
        <span style={styles.musicTitle}>{currentSrc.split("/").pop()}</span>
      </div>
    </>
  );
}

export default function App() {
  ensureKeyframes();
  const confettiRef = useRef(null);
  useConfetti(confettiRef);
  const tagline = useMemo(() => {
    const key = "bd_tagline_idx";
    const idx =
      (+(localStorage.getItem(key) || -1) + 1) % CONFIG.rotatingTaglines.length;
    localStorage.setItem(key, idx);
    return CONFIG.rotatingTaglines[idx];
  }, []);
  return (
    <div style={styles.app}>
      <canvas id="confetti" ref={confettiRef} style={styles.confettiCanvas} />
      <Balloons />
      <MusicPlayer />
      <main style={styles.page}>
        <Hero name={CONFIG.friendName} tagline={tagline} />
        <Reasons items={CONFIG.reasons} />
        <GalleryQueue images={CONFIG.gallery} />
        <Letter />
        <Wishes />
      </main>
      <footer style={styles.footer}>
        <small>Made with love ✨ by Olamilekan</small>
      </footer>
    </div>
  );
}
