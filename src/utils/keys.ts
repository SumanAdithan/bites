// bites:restaurant:sdjgh

export function getKeyName(...args: string[]) {
    return `bites:${args.join(':')}`;
}
