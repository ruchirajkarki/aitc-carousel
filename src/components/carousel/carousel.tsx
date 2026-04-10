import type { ComponentProps } from 'react'
import { useEffect } from 'react'

import { cn } from '../../lib/utils'
import type { CarouselImage } from '../../types'
import { CarouselControls } from './carousel-control'
import { CarouselProvider, useCarousel } from './carousel-provider'

interface CarouselProps extends ComponentProps<'div'> {
    images: CarouselImage[]
}

/**
 * Carousel component that wraps the CarouselProvider and renders the CarouselContent.
 * It accepts an array of images and passes them to the provider, while also allowing
 * additional props to be passed down to the content component.
 *
 * @param {CarouselProps} props - The props for the Carousel component, including images and additional div props.
 * @returns {JSX.Element} The rendered Carousel component.
 * @example
 * const images = [
 *   { id: '1', url: 'image1.jpg', alt: 'Image 1' },
 *   { id: '2', url: 'image2.jpg', alt: 'Image 2' },
 *   { id: '3', url: 'image3.jpg', alt: 'Image 3' }
 * ]
 * <Carousel images={images} className="my-carousel" />
 */
export const Carousel = ({ images, className, ...props }: CarouselProps) => {
    return (
        <CarouselProvider images={images}>
            <CarouselContent className={className} {...props} />
        </CarouselProvider>
    )
}

const CarouselContent = ({ className, ...props }: ComponentProps<'div'>) => {
    const { images, activeIndex, goToPreviousSlide, goToNextSlide, goToSlide } =
        useCarousel()

    // Global Keyboard keys for Navigation, left and right
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPreviousSlide()
            if (e.key === 'ArrowRight') goToNextSlide()
        }

        globalThis.addEventListener('keydown', handleKeyDown)
        return () => globalThis.removeEventListener('keydown', handleKeyDown)
    }, [goToNextSlide, goToPreviousSlide])

    // Calculate distance of each slide from the active slide
    // Using direction to ensure correct animation direction when clicking dots
    const getDistance = (index: number) => {
        let distance = index - activeIndex

        // Apply wrap-around only if we have a strong directional preference
        // This ensures clicking a dot in a direction plays animation in that direction
        if (distance > images.length / 2) distance -= images.length
        if (distance < -images.length / 2) distance += images.length

        return distance
    }

    // classes for each slide based on distance from active slide, controlling z-index for layering and pointer events
    const getSlideClasses = (distance: number) => {
        const baseClasses =
            'absolute inset-y-0 left-1/2 w-full transition-all duration-500 ease-out cursor-pointer'

        switch (distance) {
            case 0:
                return cn(baseClasses, 'z-10 pointer-events-auto')
            case 1:
                return cn(baseClasses, 'z-9 pointer-events-auto')
            case 2:
                return cn(baseClasses, 'z-8 pointer-events-auto')
            case -1:
                return cn(baseClasses, 'z-9 pointer-events-auto')
            case -2:
                return cn(baseClasses, 'z-8 pointer-events-auto')
            default:
                return cn(baseClasses, 'z-0 pointer-events-none')
        }
    }

    // opacity style for each slide based on distance from active slide
    const getSlideOpacity = (distance: number) => {
        switch (distance) {
            case 0:
                return 'var(--carousel-opacity-0)'
            case 1:
            case -1:
                return 'var(--carousel-opacity-1)'
            case 2:
            case -2:
                return 'var(--carousel-opacity-2)'
            default:
                return 'var(--carousel-opacity-hidden)'
        }
    }

    // scale for each slide based on distance from active slide
    const getSlideScale = (distance: number) => {
        switch (distance) {
            case 0:
                return 'var(--carousel-scale-0)'
            case 1:
            case -1:
                return 'var(--carousel-scale-1)'
            case 2:
            case -2:
                return 'var(--carousel-scale-2)'
            default:
                return 'var(--carousel-scale-hidden)'
        }
    }

    // style for each slide based on distance from active slide, controlling transform for positioning
    const getSlideTransform = (distance: number) => {
        let translateX = '-50%'

        switch (distance) {
            case 1:
                translateX = 'calc(-50% + var(--carousel-slide-offset-1))'
                break
            case 2:
                translateX = 'calc(-50% + var(--carousel-slide-offset-2))'
                break
            case -1:
                translateX = 'calc(-50% - var(--carousel-slide-offset-1))'
                break
            case -2:
                translateX = 'calc(-50% - var(--carousel-slide-offset-2))'
                break
        }

        return `translateX(${translateX})`
    }

    return (
        <div
            className={cn('carousel mx-auto relative space-y-4', className)}
            {...props}
        >
            <div
                className="relative mx-auto overflow-visible"
                style={{
                    width: 'var(--carousel-card-w)',
                    height: 'var(--carousel-card-h)'
                }}
            >
                {images.map((image, index) => {
                    const distance = getDistance(index)
                    return (
                        <div
                            key={image.id}
                            className={getSlideClasses(distance)}
                            onClick={() => goToSlide(index)}
                            style={{
                                transform: `${getSlideTransform(distance)} scale(${getSlideScale(distance)})`,
                                opacity: getSlideOpacity(distance)
                            }}
                        >
                            <img
                                src={image.url}
                                alt={image.alt ?? 'Carousel image'}
                                className="size-full object-cover"
                                style={{
                                    borderRadius: 'var(--carousel-radius)'
                                }}
                                draggable={false}
                            />
                        </div>
                    )
                })}
            </div>

            <CarouselControls />
        </div>
    )
}
