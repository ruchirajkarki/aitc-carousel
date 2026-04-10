import type { ComponentProps } from 'react'

import { cn } from '../../lib/utils'
import type { CarouselImage } from '../../types'
import { CarouselControls } from './carousel-control'
import { CarouselProvider, useCarousel } from './carousel-provider'

interface CarouselProps extends ComponentProps<'div'> {
    images: CarouselImage[]
}

export const Carousel = ({ images, className, ...props }: CarouselProps) => {
    return (
        <CarouselProvider images={images}>
            <CarouselContent className={className} {...props} />
        </CarouselProvider>
    )
}

const CarouselContent = ({ className, ...props }: ComponentProps<'div'>) => {
    const { activeImage, getPrevImageByStep, getNextImageByStep } =
        useCarousel()

    const prevImage = getPrevImageByStep(1)
    const nextImage = getNextImageByStep(1)

    return (
        <div
            className={cn('carousel mx-auto w-fit space-y-4', className)}
            {...props}
        >
            <div
                className="overflow-hidden"
                style={{
                    width: 'var(--carousel-card-w)',
                    height: 'var(--carousel-card-h)',
                    borderRadius: 'var(--carousel-radius)'
                }}
            >
                <img
                    src={prevImage.url}
                    alt={prevImage.alt ?? 'Previous image'}
                    className="object-cover"
                />
                <img
                    src={activeImage.url}
                    alt={activeImage.alt ?? 'Carousel image'}
                    className="h-full w-full object-cover"
                    draggable={false}
                />
                <img
                    src={nextImage.url}
                    alt={nextImage.alt ?? 'Next image'}
                    className="object-cover"
                />
            </div>
            <CarouselControls />
        </div>
    )
}
