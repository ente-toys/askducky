const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function OrbHero() {
  return (
    <img
      src={`${basePath}/ducky/hero.png`}
      width={220}
      alt=""
      role="img"
      aria-label="Ducky orb hero"
    />
  );
}
