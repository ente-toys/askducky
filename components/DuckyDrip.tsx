import type { DripConfig } from "@/lib/types";
import { basePath } from "@/lib/config";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function DuckyDrip({
  config,
  size = 100,
}: {
  config: DripConfig;
  size?: number;
}) {
  const layerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    pointerEvents: "none",
  };

  return (
    <div
      aria-label="Ducky avatar"
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <img
        src={`${basePath}/ducky/drip/base.svg`}
        alt=""
        style={layerStyle}
      />
      {config.shoe != null && (
        <img
          src={`${basePath}/ducky/drip/shoes/shoe-${pad(config.shoe)}.svg`}
          alt=""
          style={layerStyle}
        />
      )}
      {config.acc != null && (
        <img
          src={`${basePath}/ducky/drip/acc/acc-${pad(config.acc)}.svg`}
          alt=""
          style={layerStyle}
        />
      )}
      {config.shade != null && (
        <img
          src={`${basePath}/ducky/drip/shades/shade-${pad(config.shade)}.svg`}
          alt=""
          style={layerStyle}
        />
      )}
      {config.cap != null && (
        <img
          src={`${basePath}/ducky/drip/caps/cap-${pad(config.cap)}.svg`}
          alt=""
          style={layerStyle}
        />
      )}
    </div>
  );
}
