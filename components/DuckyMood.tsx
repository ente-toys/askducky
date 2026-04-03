import type { DuckyMood } from "@/lib/types";

const moodImageMap: Record<DuckyMood, string> = {
  smug: "/ducky/smug.png",
  horrified: "/ducky/horrified.png",
  side_eye: "/ducky/side_eye.png",
  impressed: "/ducky/impressed.png",
  disappointed: "/ducky/disappointed.png",
  chaotic: "/ducky/chaotic.png",
  suspicious: "/ducky/suspicious.png",
  deeply_tired: "/ducky/deeply_tired.png",
};

export function DuckyMood({ mood }: { mood: DuckyMood }) {
  return (
    <div
      aria-label={`Ducky mood: ${mood.replace(/_/g, " ")}`}
      style={{
        display: "grid",
        placeItems: "center",
        width: 92,
        height: 92,
        borderRadius: 24,
        background:
          "linear-gradient(180deg, rgba(255,202,114,0.22), rgba(255,202,114,0.08))",
        border: "1px solid rgba(255,202,114,0.2)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        overflow: "hidden",
      }}
    >
      <img
        src={moodImageMap[mood]}
        alt={mood.replace(/_/g, " ")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
