import type { ComponentPropsWithoutRef } from 'react'

import { type IconsKey, icons } from '../assets/icons'
import { cn } from '../lib/utils'

interface IconProps extends Omit<
    ComponentPropsWithoutRef<'img'>,
    'src' | 'alt'
> {
    name: IconsKey
    alt?: string
}

export const Icon = ({ name, className, alt, ...props }: IconProps) => {
    return (
        <img
            src={icons[name]}
            alt={alt ?? `${name} icon`}
            className={cn('inline-block', className)}
            {...props}
        />
    )
}
