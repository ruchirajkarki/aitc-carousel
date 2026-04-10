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

    // we use useMemo to memoize the value object so that it only changes when one of its dependencies changes,
    // which can help prevent unnecessary re renders of child components that consume the context
    const value = useMemo(
        () => ({
            activeImage: images[activeImageIndex],
            goToPreviousSlide,
            goToNextSlide,
            total,
            activeIndex: activeImageIndex
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
