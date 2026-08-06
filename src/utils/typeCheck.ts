export function isString(value: string|string[]):value is string {
    return typeof value === 'string';
}

export function isStringArray(value: string|string[]):value is string[] {
    return Array.isArray(value);
}