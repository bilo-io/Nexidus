export function removeMarkdownCodeBlock(text: string): string {
    return text.replace(/^```[\w]*\n/, '').replace(/\n```$/, '');
}

export function extractCodeLanguage(markdown: string): string | null {
    const match = markdown.match(/^```(\w+)/);
    return match ? match[1] : null;
}
