import { useCallback, useEffect, useRef, useState } from "react";

// Floating decorations data
const DECORATIONS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${8 + Math.random() * 14}px`,
  delay: `${Math.random() * 8}s`,
  duration: `${6 + Math.random() * 8}s`,
  symbol: ["♥", "✦", "✧", "★", "💕", "🌸", "✨"][Math.floor(Math.random() * 7)],
  top: `${Math.random() * 100}%`,
}));

const SPARKLES_OVERLAY = [
  { sym: "✦", x: "10%", y: "15%", sz: "12px" },
  { sym: "✧", x: "22%", y: "40%", sz: "20px" },
  { sym: "★", x: "34%", y: "65%", sz: "12px" },
  { sym: "♥", x: "46%", y: "15%", sz: "20px" },
  { sym: "✦", x: "58%", y: "40%", sz: "12px" },
  { sym: "✧", x: "70%", y: "65%", sz: "20px" },
  { sym: "★", x: "82%", y: "15%", sz: "12px" },
  { sym: "♥", x: "94%", y: "40%", sz: "20px" },
];

const HERO_SPARKLES = [
  { sym: "✦", top: "10%", left: "5%", right: "auto", sz: "14px" },
  { sym: "✧", top: "28%", left: "auto", right: "9%", sz: "22px" },
  { sym: "★", top: "46%", left: "13%", right: "auto", sz: "14px" },
  { sym: "✦", top: "64%", left: "auto", right: "17%", sz: "22px" },
  { sym: "✧", top: "82%", left: "21%", right: "auto", sz: "14px" },
];

const VOICE_AVATARS = ["⚔️", "👤", "👤", "👤", "👤", "👤"];

type LoadingStage = 1 | 2 | 3 | null;

function LoadingOverlay({
  stage,
  onAdvance,
}: { stage: LoadingStage; onAdvance: () => void }) {
  if (stage === null) return null;

  const content = {
    1: {
      title: "🌸 Welcome To Dracon Support! 🌸",
      subtitle: "press h to continue",
    },
    2: {
      title: "💗 Did you really think it's a support website? 💗",
      subtitle: "press k to continue",
    },
    3: {
      title: "🎂 Happy Birthday To Haswanth Kumar! 🎂",
      subtitle: "Finally near to becoming an adult ✨",
    },
  }[stage];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "linear-gradient(135deg, #FFD3DC 0%, #FF9FB5 50%, #ffb7c5 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "24px",
      }}
      className="stage-fade-in"
    >
      {/* Sparkles in overlay */}
      {SPARKLES_OVERLAY.map((sp) => (
        <span
          key={sp.x}
          style={{
            position: "absolute",
            left: sp.x,
            top: sp.y,
            fontSize: sp.sz,
            opacity: 0.5,
            pointerEvents: "none",
          }}
          className="animate-sparkle"
        >
          {sp.sym}
        </span>
      ))}

      <div
        style={{
          background: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(12px)",
          borderRadius: "28px",
          padding: "48px 40px",
          maxWidth: "620px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 8px 40px rgba(255,107,139,0.25)",
          border: "1.5px solid rgba(255,255,255,0.6)",
        }}
      >
        {/* Stage indicator dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                width: s === stage ? "24px" : "8px",
                height: "8px",
                borderRadius: "999px",
                background: s <= stage ? "#ff6b8b" : "rgba(255,107,139,0.3)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(18px, 4vw, 28px)",
            color: "#1a1a1a",
            marginBottom: "24px",
            lineHeight: 1.3,
          }}
        >
          {content.title}
        </h1>

        {stage < 3 ? (
          <button
            type="button"
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "14px",
              color: "#ff6b8b",
              background: "rgba(255,107,139,0.1)",
              padding: "10px 20px",
              borderRadius: "999px",
              display: "inline-block",
              border: "1.5px solid rgba(255,107,139,0.3)",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={onAdvance}
          >
            {content.subtitle}
          </button>
        ) : (
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "16px",
              color: "#555",
            }}
          >
            {content.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function FloatingDecorations() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {DECORATIONS.map((d) => (
        <span
          key={d.id}
          style={{
            position: "absolute",
            left: d.left,
            bottom: "-20px",
            fontSize: d.size,
            opacity: 0.5,
            animationName: "float-up",
            animationDuration: d.duration,
            animationDelay: d.delay,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            color: "#ff6b8b",
          }}
        >
          {d.symbol}
        </span>
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          background: "linear-gradient(135deg, #FFD3DC 0%, #FF9FB5 100%)",
          borderRadius: "28px",
          padding: "clamp(32px, 6vw, 64px)",
          boxShadow: "0 8px 40px rgba(255,107,139,0.3)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
        className="animate-fade-in"
      >
        {/* Background sparkles */}
        {HERO_SPARKLES.map((sp) => (
          <span
            key={sp.top}
            style={{
              position: "absolute",
              top: sp.top,
              left: sp.left,
              right: sp.right,
              fontSize: sp.sz,
              opacity: 0.3,
              color: "#ff6b8b",
              pointerEvents: "none",
            }}
            className="animate-sparkle"
          >
            {sp.sym}
          </span>
        ))}

        <p
          style={{
            color: "#ff6b8b",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          🎀 A Special Birthday Experience 🎀
        </p>

        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(56px, 12vw, 96px)",
            color: "#1a1a1a",
            lineHeight: 1,
            marginBottom: "16px",
            letterSpacing: "-2px",
          }}
        >
          HASWANTH
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#555",
            marginBottom: "28px",
            fontWeight: 400,
          }}
        >
          is finally becoming an adult ✨
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#ff6b8b",
            color: "#fff",
            padding: "10px 24px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(255,107,139,0.4)",
          }}
        >
          🎂 April 2026
        </div>

        {/* Scroll down indicator */}
        <div
          style={{
            marginTop: "36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(255,107,139,0.8)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            scroll to explore
          </span>
          <div
            className="animate-bounce-down"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <svg
              role="img"
              aria-label="scroll down"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff6b8b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>scroll down</title>
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <svg
              role="img"
              aria-label="scroll down"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffb7c5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginTop: "-6px" }}
            >
              <title>scroll down</title>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeviCard({
  emoji,
  caption,
  imgSrc,
}: { emoji: string; caption: string; imgSrc: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-reveal card-hover"
      style={{
        maxWidth: "480px",
        width: "100%",
        background: "#fff",
        borderRadius: "20px",
        border: "2px solid #ffb7c5",
        boxShadow: "0 4px 20px rgba(255,107,139,0.15)",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div
        style={{
          height: "240px",
          background: "linear-gradient(135deg, #FFD3DC 0%, #ffb7c5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={imgSrc}
          alt="Levi"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = "none";
            const parent = t.parentElement;
            if (parent)
              parent.innerHTML = `<span style='font-size:80px'>${emoji}</span>`;
          }}
        />
      </div>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p
          style={{
            color: "#ff6b8b",
            fontWeight: 700,
            fontSize: "16px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {caption}
        </p>
      </div>
    </div>
  );
}

function LeviImageSection({ onContinue }: { onContinue: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        padding: "80px 24px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(24px, 5vw, 36px)",
          color: "#1a1a1a",
          textAlign: "center",
        }}
      >
        🗡️ A Tale of Three Levis 🗡️
      </h2>

      <LeviCard
        emoji="🗡️"
        caption="💖 Happy Birthday To Levi FanBoy 💖"
        imgSrc="/assets/generated/levi-chibi.dim_400x400.png"
      />
      <LeviCard
        emoji="🌸"
        caption="💖 Happy Birthday To Levi FanBoy 💖"
        imgSrc="/assets/generated/levi-flowers.dim_400x400.png"
      />
      <LeviCard
        emoji="🍵"
        caption="💖 Happy Birthday To Levi FanBoy 💖"
        imgSrc="/assets/generated/levi-tea.dim_400x400.png"
      />

      {/* Levi birthday card + m gate */}
      <div
        ref={cardRef}
        className="scroll-reveal card-hover"
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "#fff",
          borderRadius: "24px",
          border: "2px solid #ffb7c5",
          boxShadow: "0 4px 24px rgba(255,107,139,0.2)",
          padding: "36px 28px",
          textAlign: "center",
          cursor: "default",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FFD3DC, #ff9fb5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            margin: "0 auto 20px",
            boxShadow: "0 4px 16px rgba(255,107,139,0.3)",
          }}
        >
          ⚔️
        </div>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(18px, 4vw, 22px)",
            color: "#1a1a1a",
            marginBottom: "12px",
            lineHeight: 1.4,
          }}
        >
          &ldquo;Happy Birthday Haswanth! 🫶&rdquo;
        </p>
        <p
          style={{
            fontStyle: "italic",
            color: "#888",
            fontSize: "14px",
            marginBottom: "28px",
          }}
        >
          — Captain Levi Ackerman
        </p>

        <button
          type="button"
          data-ocid="levi-card.primary_button"
          onClick={onContinue}
          style={{
            background: "linear-gradient(135deg, #ff6b8b, #ff9fb5)",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "14px 32px",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(255,107,139,0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 8px 24px rgba(255,107,139,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow =
              "0 4px 16px rgba(255,107,139,0.4)";
          }}
        >
          press m to continue 🌸
        </button>
      </div>
    </section>
  );
}

function MemoriesSection({
  specialUnlocked,
  onSpecialContinue,
}: {
  specialUnlocked: boolean;
  onSpecialContinue: () => void;
}) {
  const mem2Ref = useRef<HTMLDivElement>(null);
  const mem3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refsArr = [mem2Ref, mem3Ref];
    const observers: IntersectionObserver[] = [];
    for (const r of refsArr) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && r.current)
            r.current.classList.add("visible");
        },
        { threshold: 0.15 },
      );
      if (r.current) observer.observe(r.current);
      observers.push(observer);
    }
    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  return (
    <section
      id="memories"
      style={{
        background: "#1a1a1a",
        padding: "80px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(24px, 5vw, 36px)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        ✨ Memories ✨
      </h2>

      {/* Memory 2 - Discord Giveaway */}
      <div
        ref={mem2Ref}
        className="scroll-reveal"
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "#fff",
          borderRadius: "12px",
          borderLeft: "4px solid #ff6b8b",
          padding: "20px",
          boxShadow: "0 4px 24px rgba(255,107,139,0.2)",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#ff9fb5",
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          🤖 Discord Bot
        </p>
        <h3
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            color: "#1a1a1a",
            marginBottom: "16px",
          }}
        >
          🎉 You Have Won A Giveaway! 🎉
        </h3>

        {/* Voice channel illustration */}
        <div
          style={{
            background: "linear-gradient(135deg, #FFD3DC, #ffb7c5)",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {VOICE_AVATARS.map((av, i) => (
              <div
                key={av + String(i)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: i === 0 ? "#ff6b8b" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  border: "2px solid #fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {av}
              </div>
            ))}
            <span
              style={{ fontSize: "12px", color: "#666", marginLeft: "4px" }}
            >
              +14 more
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#555", fontStyle: "italic" }}>
            🔊 ~20 members in voice
          </p>
        </div>

        <div style={{ fontSize: "14px", color: "#333", lineHeight: 1.8 }}>
          <p>
            <strong>Prize:</strong> Avatar Decoration ✨
          </p>
          <p>
            <strong>Hosted In:</strong> Telugu Verse 💗
          </p>
        </div>

        <div
          style={{
            borderTop: "1px solid #eee",
            marginTop: "12px",
            paddingTop: "10px",
          }}
        >
          <p style={{ fontSize: "12px", color: "#999", fontStyle: "italic" }}>
            win avu blo chala giveaways
          </p>
        </div>
      </div>

      {/* Memory 3 - Discord Chat */}
      <div
        ref={mem3Ref}
        className="scroll-reveal"
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "#2d2d2d",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFD3DC, #ff6b8b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              flexShrink: 0,
            }}
          >
            ⚔️
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  color: "#ff6b8b",
                  fontSize: "15px",
                }}
              >
                Levi Ackerman
              </span>
              <span style={{ fontSize: "11px", color: "#666" }}>
                Today at some point
              </span>
            </div>
            <p style={{ color: "#e0e0e0", fontSize: "15px", lineHeight: 1.5 }}>
              My <em style={{ color: "#ff9fb5" }}>Pashion</em>{" "}
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#666",
                  fontSize: "13px",
                }}
              >
                Passion
              </span>{" "}
              is becoming a game dev
            </p>
          </div>
        </div>
      </div>

      {/* Continue button */}
      {!specialUnlocked && (
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            data-ocid="memories.primary_button"
            onClick={onSpecialContinue}
            style={{
              background: "transparent",
              border: "2px solid #ff6b8b",
              color: "#ff6b8b",
              borderRadius: "999px",
              padding: "14px 32px",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ff6b8b";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#ff6b8b";
            }}
          >
            press m to continue 💕
          </button>
        </div>
      )}
    </section>
  );
}

function SpecialMessagesSection() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="special-messages"
      style={{
        background: "#fbfbfd",
        padding: "80px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        ref={titleRef}
        className="scroll-reveal"
        style={{ textAlign: "center" }}
      >
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(24px, 5vw, 36px)",
            color: "#1a1a1a",
            marginBottom: "12px",
          }}
        >
          💌 Special Message 💌
        </h2>
        <div
          style={{
            height: "3px",
            width: "80px",
            background: "linear-gradient(90deg, #FFD3DC, #ff6b8b)",
            borderRadius: "999px",
            margin: "0 auto",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Card 1 - From Power */}
        <div
          data-ocid="special.card.1"
          className="card-hover"
          style={{
            background: "linear-gradient(135deg, #FFD3DC, #ffb7c5)",
            borderRadius: "20px",
            padding: "28px 24px",
            boxShadow: "0 4px 20px rgba(255,107,139,0.2)",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "#ff6b8b",
              fontWeight: 700,
              fontSize: "13px",
              marginBottom: "12px",
            }}
          >
            💝 From Power
          </p>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              color: "#1a1a1a",
              lineHeight: 1.4,
              marginBottom: "16px",
            }}
          >
            Happy Birthday Hashu Blo!
          </p>
          <p style={{ fontStyle: "italic", color: "#666", fontSize: "14px" }}>
            With all the love 💗
          </p>
        </div>

        {/* Card 2 - From Kethan */}
        <div
          data-ocid="special.card.2"
          className="card-hover"
          style={{
            background: "#1a1a1a",
            borderRadius: "20px",
            padding: "28px 24px",
            boxShadow: "0 4px 20px rgba(255,107,139,0.3)",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "#ff6b8b",
              fontWeight: 700,
              fontSize: "13px",
              marginBottom: "12px",
            }}
          >
            💝 From Kethan
          </p>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "#fff",
              lineHeight: 1.5,
              marginBottom: "16px",
            }}
          >
            Haswanthika 100 years brathakali
          </p>
          <p style={{ fontStyle: "italic", color: "#aaa", fontSize: "14px" }}>
            Always 💕
          </p>
        </div>

        {/* Card 3 - From Everyone */}
        <div
          data-ocid="special.card.3"
          className="card-hover"
          style={{
            background: "#fff",
            border: "2px solid #ffb7c5",
            borderRadius: "20px",
            padding: "28px 24px",
            boxShadow: "0 4px 20px rgba(255,107,139,0.15)",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "#ff6b8b",
              fontWeight: 700,
              fontSize: "13px",
              marginBottom: "12px",
            }}
          >
            💝 From Everyone
          </p>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "#1a1a1a",
              lineHeight: 1.5,
              marginBottom: "16px",
            }}
          >
            May all your dreams compile without errors! 🎂✨
          </p>
          <p style={{ fontStyle: "italic", color: "#888", fontSize: "14px" }}>
            To the future dev 🚀
          </p>
        </div>

        {/* Card 4 - From Kappa */}
        <div
          data-ocid="special.card.4"
          className="card-hover"
          style={{
            background: "#1a1a1a",
            borderRadius: "20px",
            padding: "28px 24px",
            boxShadow: "0 4px 20px rgba(255,107,139,0.3)",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "#ff6b8b",
              fontWeight: 700,
              fontSize: "13px",
              marginBottom: "12px",
            }}
          >
            💝 From Kappa
          </p>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "#fff",
              lineHeight: 1.5,
              marginBottom: "16px",
            }}
          >
            Happy Birthday Haswanth 💋
          </p>
          <p style={{ fontStyle: "italic", color: "#aaa", fontSize: "14px" }}>
            Always here 💕
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalSection() {
  const words = [
    "Levi FanBoy",
    "Developer 💻",
    "Gamer 🎮",
    "Coder ✨",
    "Dreamer 🌙",
  ];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        background: "#fff",
        padding: "80px 24px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 5vw, 36px)",
            color: "#1a1a1a",
            lineHeight: 1.4,
          }}
        >
          🎀 Happy Birthday To{" "}
          <span
            style={{
              color: "#ff6b8b",
              display: "inline-block",
              transition: "opacity 0.3s ease",
            }}
          >
            {words[wordIndex]}
          </span>{" "}
          <span className="animate-blink" style={{ color: "#ff6b8b" }}>
            |
          </span>{" "}
          🎀
        </p>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";
  const caffeineHref = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`;

  return (
    <footer
      style={{
        background: "#1a1a1a",
        padding: "40px 24px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <p
        style={{
          color: "#fff",
          fontSize: "18px",
          fontWeight: 600,
          marginBottom: "8px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Happy Birthday Hashu Blo Party Ekada? 🎂
      </p>
      <p
        style={{
          color: "#ff6b8b",
          fontSize: "16px",
          marginBottom: "24px",
          fontWeight: 600,
        }}
      >
        By Power 💗
      </p>
      <p style={{ color: "#555", fontSize: "13px", marginBottom: "8px" }}>
        Made with 💗 for Haswanth Kumar
      </p>
      <p style={{ color: "#444", fontSize: "12px" }}>
        © {year}.{" "}
        <a
          href={caffeineHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#ff9fb5", textDecoration: "none" }}
        >
          Built with love using caffeine.ai
        </a>
      </p>
    </footer>
  );
}

export default function App() {
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(1);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [memoriesUnlocked, setMemoriesUnlocked] = useState(false);
  const [specialMessagesUnlocked, setSpecialMessagesUnlocked] = useState(false);

  const memoriesRef = useRef<HTMLDivElement>(null);
  const specialRef = useRef<HTMLDivElement>(null);

  const advanceStage = useCallback(() => {
    setLoadingStage((prev) => {
      if (prev === 1) return 2;
      if (prev === 2) return 3;
      return prev;
    });
  }, []);

  const handleMemoriesContinue = useCallback(() => {
    setMemoriesUnlocked(true);
    setTimeout(() => {
      memoriesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleSpecialContinue = useCallback(() => {
    setSpecialMessagesUnlocked(true);
    setTimeout(() => {
      specialRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  // Keyboard handler for loading stages
  useEffect(() => {
    if (loadingStage === null) return;

    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (loadingStage === 1 && key === "h") advanceStage();
      else if (loadingStage === 2 && key === "k") advanceStage();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [loadingStage, advanceStage]);

  // Auto-advance stage 3
  useEffect(() => {
    if (loadingStage === 3) {
      const t = setTimeout(() => {
        setLoadingStage(null);
        setTimeout(() => setOverlayVisible(false), 500);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [loadingStage]);

  // Keyboard handler for main content
  useEffect(() => {
    if (loadingStage !== null) return;

    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "m") {
        if (!memoriesUnlocked) {
          handleMemoriesContinue();
        } else if (!specialMessagesUnlocked) {
          handleSpecialContinue();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [
    loadingStage,
    memoriesUnlocked,
    specialMessagesUnlocked,
    handleMemoriesContinue,
    handleSpecialContinue,
  ]);

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
      }}
    >
      {/* Floating decorations */}
      {!overlayVisible && <FloatingDecorations />}

      {/* Loading overlay */}
      {overlayVisible && (
        <LoadingOverlay stage={loadingStage} onAdvance={advanceStage} />
      )}

      {/* Main content */}
      {!overlayVisible && (
        <main style={{ position: "relative", zIndex: 1 }}>
          <HeroSection />
          <LeviImageSection onContinue={handleMemoriesContinue} />

          {memoriesUnlocked && (
            <div ref={memoriesRef}>
              <MemoriesSection
                specialUnlocked={specialMessagesUnlocked}
                onSpecialContinue={handleSpecialContinue}
              />
            </div>
          )}

          {specialMessagesUnlocked && (
            <div ref={specialRef}>
              <SpecialMessagesSection />
              <FinalSection />
            </div>
          )}

          <Footer />
        </main>
      )}
    </div>
  );
}
