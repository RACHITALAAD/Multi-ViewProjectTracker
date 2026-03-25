export interface VirtualScrollRange {
    startIndex: number
    endIndex: number
    offsetY: number
}

export function calculateVirtualRange(
    scrollTop: number,
    itemHeight: number,
    containerHeight: number,
    totalItems: number,
    buffer: number = 5
): VirtualScrollRange {
    // Calculate which items should be visible
    const visibleStart = Math.max(0, Math.floor(scrollTop / itemHeight))
    const visibleEnd = Math.ceil((scrollTop + containerHeight) / itemHeight)

    // Add buffer for smooth scrolling
    const startIndex = Math.max(0, visibleStart - buffer)
    const endIndex = Math.min(totalItems - 1, visibleEnd + buffer)

    // Calculate offset for spacing above first visible item
    const offsetY = startIndex * itemHeight

    return {
        startIndex,
        endIndex,
        offsetY,
    }
}

export function calculateScrollbarHeight(
    containerHeight: number,
    contentHeight: number,
    scrollTop: number
): { thumbHeight: number; thumbTop: number } {
    const scrollRatio = containerHeight / contentHeight
    const thumbHeight = containerHeight * scrollRatio
    const maxThumbTravel = containerHeight - thumbHeight
    const maxScrollTravel = contentHeight - containerHeight
    const thumbTop = (scrollTop / maxScrollTravel) * maxThumbTravel

    return { thumbHeight, thumbTop }
}