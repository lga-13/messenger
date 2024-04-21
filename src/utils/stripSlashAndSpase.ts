function stripSlash(v: string): string {
    let value = v.trim();
    while (value.startsWith("/") || value.startsWith(" ")) {
        value = value.substring(1);
    }
    while (value.endsWith("/") || value.endsWith(" ")) {
        value = value.substring(0, value.length - 1);
    }
    return value;
}

export default stripSlash