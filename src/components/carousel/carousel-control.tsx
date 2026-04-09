import { Icon } from '../icon'

export const CarouselControls = () => {
    return (
        <div className='flex items-center justify-center gap-(--carousel-dot-gap)'>
            <button
                type='button'
                aria-label='Previous slide'
                className='group grid size-(--carousel-hit) place-items-center rounded-full cursor-pointer'
            >
                <Icon
                    name='arrow'
                    className='size-(--carousel-arrow-size) opacity-70 transition-opacity duration-300 group-hover:opacity-100'
                    style={{ transitionDuration: 'var(--carousel-duration)' }}
                />
            </button>

            <button
                type='button'
                aria-label='Next slide'
                className='group grid size-(--carousel-hit) place-items-center rounded-full cursor-pointer'
            >
                <Icon
                    name='arrow'
                    className='size-(--carousel-arrow-size) rotate-180 opacity-70 transition-opacity duration-300 group-hover:opacity-100'
                    style={{ transitionDuration: 'var(--carousel-duration)' }}
                />
            </button>
        </div>
    )
}