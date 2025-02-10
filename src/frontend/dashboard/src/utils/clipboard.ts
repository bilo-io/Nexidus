export function copyToClipboard(text: string): void {
    if (!navigator.clipboard) {
        console.error("Clipboard API not supported");
        return;
    }

    console.log('text:', text)
    navigator.clipboard.writeText(text).then(
        () => console.log("Copied to clipboard!"),
        (err) => console.error("Failed to copy:", err)
    );
}
