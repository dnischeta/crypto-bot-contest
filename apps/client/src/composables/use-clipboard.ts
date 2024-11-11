export function useClipboard() {
  async function writeText(text: string) {
    // Probably we don't need to implement fallback here
    // See https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText#browser_compatibility
    await navigator.clipboard.writeText(text)
  }

  return { writeText }
}
