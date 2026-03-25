export interface PointerCoord {
    x: number
    y: number
}

export function getPointerPosition(event: any): PointerCoord {
    if (event.touches?.[0]) {
        return {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
        }
    }
    return {
        x: event.clientX,
        y: event.clientY,
    }
}

export function isWithinElement(
    coord: PointerCoord,
    element: HTMLElement | null
): boolean {
    if (!element) return false
    const rect = element.getBoundingClientRect()
    return (
        coord.x >= rect.left &&
        coord.x <= rect.right &&
        coord.y >= rect.top &&
        coord.y <= rect.bottom
    )
}

export function getElementCenter(element: HTMLElement): PointerCoord {
    const rect = element.getBoundingClientRect()
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
    }
}