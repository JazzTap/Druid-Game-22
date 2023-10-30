
export function pick (choices, mask = choices.map((_) => true)) {
    let res = choices.filter((_, i) => mask[i]);
    return res[Math.floor(Math.random() * res.length)];
}