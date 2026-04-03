"use client";

export function MotionPermissionGate({
  permission,
  onRequest,
}: {
  permission: "unknown" | "granted" | "denied" | "unsupported";
  onRequest: () => Promise<void>;
}) {
  if (permission === "granted" || permission === "unsupported") {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => void onRequest()}
      style={{
        appearance: "none",
        border: "1px solid rgba(169, 200, 178, 0.18)",
        background: "rgba(255,255,255,0.04)",
        borderRadius: 999,
        color: "var(--muted)",
        padding: "12px 14px",
        cursor: "pointer",
      }}
    >
      {permission === "denied" ? "Retry motion access" : "Enable shake"}
    </button>
  );
}
