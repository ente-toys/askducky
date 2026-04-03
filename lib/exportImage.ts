import { toPng } from "html-to-image";

export async function exportNodeToPng(node: HTMLElement): Promise<Blob> {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    skipFonts: false,
    backgroundColor: "#07110b",
  });

  const response = await fetch(dataUrl);
  return response.blob();
}

export async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
