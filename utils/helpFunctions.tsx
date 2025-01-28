export function toTitleCase(word: string) {
    if (!word || word.length < 1) return word;
    
    return (word.charAt(0).toUpperCase() + word.slice(1))
}