import type { ComponentProps } from "react"
import type { CarouselImage } from "../types"

interface CarouselProps extends ComponentProps<"div"> {
    images: CarouselImage[]
}

export const Carousel = ({ images }: CarouselProps) => {
    console.log("🚀 ~ Carousel ~ images:", images)
    return (
        <div>
            <p>Tetsing</p>
            {
                images.map((image) => (
                    <div key={image.id}>
                        <img src={image.url} alt={image.alt} />
                    </div>
                ))
            }
        </div>
    )
}