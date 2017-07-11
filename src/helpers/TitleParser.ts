export function parseTitle(rawName: string): { title: string, order: number } {
    let tokens = rawName
        .replace(/\.(md|html)$/, '')
        .split('_');

    const orderPart = tokens[0];
    const order = parseInt(orderPart);

    if (!orderPart || !isNaN(order)) {
        tokens.splice(0, 1);
    }

    const title = tokens.join(' ');

    return {order, title};
}