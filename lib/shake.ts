export interface ShakeController {
  start: () => void;
  stop: () => void;
}

interface ShakeOptions {
  onShake: () => void;
  threshold?: number;
  debounceMs?: number;
}

export function createShakeController({
  onShake,
  threshold = 18,
  debounceMs = 1000,
}: ShakeOptions): ShakeController {
  if (typeof window === "undefined") {
    return {
      start() {},
      stop() {},
    };
  }

  let lastMagnitude = 0;
  let lastTriggeredAt = 0;
  let active = false;

  const handleMotion = (event: DeviceMotionEvent) => {
    const accel = event.accelerationIncludingGravity;
    if (!accel) {
      return;
    }

    const x = accel.x ?? 0;
    const y = accel.y ?? 0;
    const z = accel.z ?? 0;
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    const delta = Math.abs(magnitude - lastMagnitude);

    lastMagnitude = magnitude;

    if (delta < threshold) {
      return;
    }

    const now = Date.now();
    if (now - lastTriggeredAt < debounceMs) {
      return;
    }

    lastTriggeredAt = now;
    onShake();
  };

  return {
    start() {
      if (active) {
        return;
      }

      active = true;
      window.addEventListener("devicemotion", handleMotion);
    },
    stop() {
      if (!active) {
        return;
      }

      active = false;
      window.removeEventListener("devicemotion", handleMotion);
    },
  };
}

export async function requestMotionPermission(): Promise<"granted" | "denied" | "unsupported"> {
  if (typeof window === "undefined" || typeof DeviceMotionEvent === "undefined") {
    return "unsupported";
  }

  const iosPermissionEvent = DeviceMotionEvent as typeof DeviceMotionEvent & {
    requestPermission?: () => Promise<"granted" | "denied">;
  };

  if (typeof iosPermissionEvent.requestPermission !== "function") {
    return "granted";
  }

  try {
    return await iosPermissionEvent.requestPermission();
  } catch {
    return "denied";
  }
}
