export function vibrate(pattern: number | number[]) {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
    return;
  }

  navigator.vibrate(pattern);
}

export function hapticForQuestionReveal() {
  vibrate(18);
}

export function hapticForVerdictReveal() {
  vibrate([16, 32, 22]);
}

export function hapticForShareSuccess() {
  vibrate([12, 24, 12]);
}
