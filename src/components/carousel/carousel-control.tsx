import { cn } from '../../lib/utils'
import { Icon } from '../icon'
import { useCarousel } from './carousel-provider'

export const CarouselControls = () => {
    const {
        goToNextSlide,
        goToPreviousSlide,
        goToSlide,
        images,
        activeImage,
        resetAutoAdvanceTimer
    } = useCarousel()
    return (
        <div
            className="flex items-center justify-center gap-(--carousel-dot-gap)"
            style={{ padding: 'var(--carousel-dot-wrapper-p)' }}
        >
            <button
                type="button"
                aria-label="Previous slide"
                className="group grid size-(--carousel-hit) place-items-center rounded-full"
                onClick={() => {
                    goToPreviousSlide()
                    resetAutoAdvanceTimer()
                }}
            >
                <Icon
                    name="arrow"
                    className="size-(--carousel-arrow-size) transition-colors duration-300 group-hover:text-(--carousel-arrow-hover) group-focus-visible:text-(--carousel-arrow-hover) motion-reduce:transition-none"
                    style={{
                        color: 'var(--carousel-arrow)',
                        transitionDuration: 'var(--carousel-duration)'
                    }}
                    aria-hidden="true"
                />
            </button>

            {images.map((image, index) => (
                <button
                    key={image.id}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    className={cn(
                        'size-(--carousel-dot-size) scale-90 rounded-full bg-(--carousel-dot) opacity-60 transition-all duration-900 ease-out hover:opacity-100 focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:transform-none',
                        image.id === activeImage.id &&
                            'scale-(--carousel-dot-active-scale) opacity-100 bg-(--carousel-dot-active) motion-reduce:scale-100'
                    )}
                    onClick={() => {
                        goToSlide(index)
                        resetAutoAdvanceTimer()
                    }}
                />
            ))}

            <button
                type="button"
                aria-label="Next slide"
                className="group grid size-(--carousel-hit) place-items-center rounded-full"
                onClick={() => {
                    goToNextSlide()
                    resetAutoAdvanceTimer()
                }}
            >
                <Icon
                    name="arrow"
                    className="size-(--carousel-arrow-size) rotate-180 transition-colors duration-300 group-hover:text-(--carousel-arrow-hover) group-focus-visible:text-(--carousel-arrow-hover) motion-reduce:transition-none"
                    style={{
                        color: 'var(--carousel-arrow)',
                        transitionDuration: 'var(--carousel-duration)'
                    }}
                    aria-hidden="true"
                />
            </button>
        </div>
    )
}
