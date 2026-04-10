import {
    type PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react'

import type { CarouselImage } from '../../types'

type CarouselContextType = {
    activeImage: CarouselImage
    goToPreviousSlide: () => void
    goToNextSlide: () => void
    total: number
    activeIndex: number
    getPrevImageByStep: (step: number) => CarouselImage
    getNextImageByStep: (step: number) => CarouselImage
}

export const CarouselContext = createContext<CarouselContextType | null>(null)

interface CarouselProps extends PropsWithChildren {
    images: CarouselImage[]
}

export const CarouselProvider = ({ images, children }: CarouselProps) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const total = images.length

    // we use useCallback to memoize the functions so that they don't change on every render,
    // which can help prevent unnecessary re renders of child components that consume the context
    const goToPreviousSlide = useCallback(() => {
        setActiveImageIndex((prevIndex) => {
            return prevIndex === 0 ? total - 1 : prevIndex - 1
        })
    }, [total, activeImageIndex])

    const goToNextSlide = useCallback(() => {
        setActiveImageIndex((prevIndex) => {
            return prevIndex === total - 1 ? 0 : prevIndex + 1
        })
    }, [total, activeImageIndex])

    const getPrevImageByStep = useCallback(
        (step: number) => {
            const prevIndex = activeImageIndex - step
            let finalIndex = prevIndex
            if (prevIndex < 0 || prevIndex >= total) {
                finalIndex = ((prevIndex % total) + total) % total // this ensures that the index wraps around correctly for both positive and negative values
            }
            return images[finalIndex]
        },
        [activeImageIndex, images, total]
    )

    const getNextImageByStep = useCallback(
        (step: number) => {
            const nextIndex = activeImageIndex + step
            let finalIndex = nextIndex
            if (nextIndex < 0 || nextIndex >= total) {
                finalIndex = ((nextIndex % total) + total) % total // this ensures that the index wraps around correctly for both positive and negative values
            }
            return images[finalIndex]
        },
        [activeImageIndex, images, total]
    )

    // we use useMemo to memoize the value object so that it only changes when one of its dependencies changes,
    // which can help prevent unnecessary re renders of child components that consume the context
    const value = useMemo(
        () => ({
            activeImage: images[activeImageIndex],
            goToPreviousSlide,
            goToNextSlide,
            total,
            activeIndex: activeImageIndex,
            getPrevImageByStep,
            getNextImageByStep
        }),
        [activeImageIndex, goToNextSlide, goToPreviousSlide, images, total]
    )

    return (
        <CarouselContext.Provider value={value}>
            {children}
        </CarouselContext.Provider>
    )
}

export const useCarousel = () => {
    const context = useContext(CarouselContext)

    if (!context) {
        throw new Error('useCarousel must be used within a CarouselProvider')
    }

    return context
}
