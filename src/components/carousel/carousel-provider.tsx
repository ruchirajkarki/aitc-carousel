import {
    type PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'

import { SLIDE_AUTO_ADVANCE_INTERVAL } from '@/lib/constants'
import type { CarouselImage } from '../../types'

type CarouselContextType = {
    activeImage: CarouselImage
    images: CarouselImage[]
    total: number
    activeIndex: number
    goToPreviousSlide: () => void
    goToNextSlide: () => void
    goToSlide: (index: number) => void
    getPrevImageByStep: (step: number) => CarouselImage
    getNextImageByStep: (step: number) => CarouselImage
    resetAutoAdvanceTimer: () => void
}

export const CarouselContext = createContext<CarouselContextType | null>(null)

interface CarouselProps extends PropsWithChildren {
    images: CarouselImage[]
}

export const CarouselProvider = ({ images, children }: CarouselProps) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const total = images.length

    const resetAutoAdvanceTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        // Restart the interval after reset
        intervalRef.current = setInterval(() => {
            setActiveImageIndex((prevIndex) =>
                prevIndex === total - 1 ? 0 : prevIndex + 1
            )
        }, SLIDE_AUTO_ADVANCE_INTERVAL)
    }, [total])

    // we use useCallback to memoize the functions so that they don't change on every render,
    // which can help prevent unnecessary re renders of child components that consume the context
    const goToPreviousSlide = useCallback(() => {
        setActiveImageIndex((prevIndex) => {
            return prevIndex === 0 ? total - 1 : prevIndex - 1
        })
        resetAutoAdvanceTimer()
    }, [total, resetAutoAdvanceTimer])

    const goToNextSlide = useCallback(() => {
        setActiveImageIndex((prevIndex) => {
            return prevIndex === total - 1 ? 0 : prevIndex + 1
        })
        resetAutoAdvanceTimer()
    }, [total, resetAutoAdvanceTimer])

    const goToSlide = useCallback(
        (index: number) => {
            if (index < 0 || index >= total) {
                // if the index is out of bounds we will wrap around
                const finalIndex = ((index % total) + total) % total // this ensures that the index wraps around correctly for both positive and negative values
                setActiveImageIndex(finalIndex)
            } else {
                setActiveImageIndex(index)
            }
            resetAutoAdvanceTimer()
        },
        [total, resetAutoAdvanceTimer]
    )

    // auto switch slides every 5 seconds
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveImageIndex((prevIndex) =>
                prevIndex === total - 1 ? 0 : prevIndex + 1
            )
        }, SLIDE_AUTO_ADVANCE_INTERVAL)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [total])

    const getPrevImageByStep = useCallback(
        (step: number) => {
            let prevIndex = activeImageIndex - step
            if (prevIndex < 0 || prevIndex >= total) {
                prevIndex = ((prevIndex % total) + total) % total // this ensures that the index wraps around correctly for both positive and negative values
            }
            return images[prevIndex]
        },
        [activeImageIndex, images, total]
    )

    const getNextImageByStep = useCallback(
        (step: number) => {
            let nextIndex = activeImageIndex + step
            if (nextIndex < 0 || nextIndex >= total) {
                nextIndex = ((nextIndex % total) + total) % total // this ensures that the index wraps around correctly for both positive and negative values
            }
            return images[nextIndex]
        },
        [activeImageIndex, images, total]
    )

    // we use useMemo to memoize the value object so that it only changes when one of its dependencies changes,
    // which can help prevent unnecessary re renders of child components that consume the context
    const value = useMemo(
        () => ({
            activeImage: images[activeImageIndex],
            images,
            total,
            activeIndex: activeImageIndex,
            goToPreviousSlide,
            goToNextSlide,
            goToSlide,
            getPrevImageByStep,
            getNextImageByStep,
            resetAutoAdvanceTimer
        }),
        [
            activeImageIndex,
            goToNextSlide,
            goToPreviousSlide,
            images,
            total,
            resetAutoAdvanceTimer
        ]
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
