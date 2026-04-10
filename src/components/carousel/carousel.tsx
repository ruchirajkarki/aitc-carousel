import type { ComponentProps } from 'react'
import { useEffect } from 'react'

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
    const {
        activeImage,
        getPrevImageByStep,
        getNextImageByStep,
        goToPreviousSlide,
        goToNextSlide
    } = useCarousel()

    // we add keyboard navigation for the carousel,
    // which allowing users to navigate through the slides
    // using the left and right arrow keys. We also ensure that the
    // event listener is properly cleaned up when the component unmounts to prevent memory leaks.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') goToPreviousSlide()
            if (event.key === 'ArrowRight') goToNextSlide()
        }

        globalThis.addEventListener('keydown', handleKeyDown)

        return () => {
            globalThis.removeEventListener('keydown', handleKeyDown)
        }
    }, [goToNextSlide, goToPreviousSlide])

    const prevImage = getPrevImageByStep(1)
    const nextImage = getNextImageByStep(1)

    return (
        <div
            className={cn(
                'carousel mx-auto relative overflow-hidden space-y-4',
                className
            )}
            {...props}
        >
            <div
                className="flex size-full "
                style={{
                    width: 'var(--carousel-card-w)',
                    height: 'var(--carousel-card-h)',
                    borderRadius: 'var(--carousel-radius)'
                }}
            >
                <img
                    src={getPrevImageByStep(2).url}
                    alt={getPrevImageByStep(2).alt ?? 'Previous image'}
                    className="object-cover"
                    draggable={false}
                />
                <img
                    src={prevImage.url}
                    alt={prevImage.alt ?? 'Previous image'}
                    className="object-cover"
                    draggable={false}
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
                    draggable={false}
                />
                <img
                    src={getNextImageByStep(2).url}
                    alt={getNextImageByStep(2).alt ?? 'Next image'}
                    className="object-cover"
                    draggable={false}
                />
            </div>
            <CarouselControls />
        </div>
    )
}
