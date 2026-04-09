export type CarouselImage = {
    /**
     * Unique id for the carousel image item. Required.
     */
    id: string | number

    /**
     * URL of the image to be displayed in the carousel item. Required.
     */
    url: string

    /**
     * Alternative text for the image, used for accessibility. Optional.
     */
    alt?: string
}
