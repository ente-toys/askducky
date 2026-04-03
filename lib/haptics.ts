export function vibrate(pattern: number | number[]) {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
    return;
  }

  navigator.vibrate(pattern);
}

export function hapticForQuestionReveal() {
  vibrate(28);
}

export function hapticForVerdictReveal() {
  vibrate([25, 50, 34]);
}

export function hapticForShareSuccess() {
  vibrate([19, 37, 19]);
}
