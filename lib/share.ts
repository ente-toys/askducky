export interface SharePayload {
  title: string;
  text: string;
  url: string;
  file?: File;
}

export interface ShareOutcome {
  method:
    | "native-file"
    | "native-text"
    | "download-copy-caption"
    | "copy-link"
    | "none";
  copiedCaption?: boolean;
  copiedLink?: boolean;
}

async function copyText(text: string): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function sharePayload(
  payload: SharePayload,
  downloadFallback?: () => Promise<void>,
): Promise<ShareOutcome> {
  if (typeof navigator !== "undefined" && navigator.share) {
    if (payload.file) {
      try {
        const filePayload = {
          title: payload.title,
          text: payload.text,
          url: payload.url,
          files: [payload.file],
        };

        if (!navigator.canShare || navigator.canShare(filePayload)) {
          await navigator.share(filePayload);
          return { method: "native-file" };
        }
      } catch {
        // Continue into other fallbacks.
      }
    }

    try {
      await navigator.share({
        title: payload.title,
        text: payload.text,
        url: payload.url,
      });
      return { method: "native-text" };
    } catch {
      // Continue into other fallbacks.
    }
  }

  if (downloadFallback) {
    await downloadFallback();
    const copiedCaption = await copyText(payload.text);
    return { method: "download-copy-caption", copiedCaption };
  }

  const copiedLink = await copyText(payload.url);
  return { method: copiedLink ? "copy-link" : "none", copiedLink };
}
