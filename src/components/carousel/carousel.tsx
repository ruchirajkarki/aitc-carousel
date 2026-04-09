import type { ComponentProps } from 'react'
import { cn } from '../../lib/utils'
import type { CarouselImage } from '../../types'
import { CarouselControls } from './carousel-control'

interface CarouselProps extends ComponentProps<'div'> {
    images: CarouselImage[]
}

export const Carousel = ({ images, className, ...props }: CarouselProps) => {
    const activeImage = images[0]

    return (
        <div className={cn('carousel mx-auto w-fit space-y-4', className)} {...props}>
            <div
                className='overflow-hidden'
                style={{
                    width: 'var(--carousel-card-w)',
                    height: 'var(--carousel-card-h)',
                    borderRadius: 'var(--carousel-radius)'
                }}
            >
                {activeImage && (
                    <img
                        src={activeImage.url}
                        alt={activeImage.alt ?? 'Carousel image'}
                        className='h-full w-full object-cover'
                    />
                )}
            </div>
            <CarouselControls />
        </div>
    )
}