import Image from "next/image";

export function OrbHero() {
  return (
    <Image
      src="/ducky/hero.png"
      width={220}
      height={252}
      alt=""
      role="img"
      aria-label="Ducky orb hero"
    />
  );
}
