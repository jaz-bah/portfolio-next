export function cursorType(element: HTMLElement) {
    let current: HTMLElement | null = element;

    while (current) {
        const cursorType = current.getAttribute('data-cursor-type');
        if (cursorType) {
            return cursorType;
        }
        current = current.parentElement;
    }

    return null;
}
