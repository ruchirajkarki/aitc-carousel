import type { ComponentProps } from 'react'

import { cn } from '../lib/utils'

interface HeaderProps extends ComponentProps<'header'> {
    /**
     * Heading text to be displayed in the header. Optional.
     * @default "Simple Image Carousel"
     */
    heading?: string

    /**
     * Subheading text to be displayed below the main heading. Optional.
     * @default predesigned from figma:
     * https://www.figma.com/design/cRU4R1JpyFW29kClgedf78/Carousel--Community-?node-id=3-100&t=WwWjw1BbyzsPjYhx-4
     */
    subHeading?: string
}

function Subheading({ subHeading }: { readonly subHeading?: string }) {
    if (subHeading) {
        return <p className="text-xl text-gray-500">{subHeading}</p>
    }

    return (
        <div className="text-center">
            <p>
                5 x Image items <span className="font-bold">❖ Carousel</span>
            </p>
            <p>Interactive Components & Variants</p>
        </div>
    )
}

export const Header = ({
    heading = 'Simple Image Carousel',
    subHeading,
    className,
    ...props
}: HeaderProps) => {
    return (
        <header
            className={cn('text-center mb-8 flex flex-col gap-6', className)}
            {...props}
        >
            {heading && <h1 className="text-6xl font-bold">{heading}</h1>}
            <Subheading subHeading={subHeading} />
        </header>
    )
}
