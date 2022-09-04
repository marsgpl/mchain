import React from 'react'
import { cn } from 'lib/cn'
import s from './index.module.css'

export type ButtonColor = 'primary'

export interface ButtonProps {
    text?: string
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
    color?: ButtonColor
    wide?: boolean
}

function getColorClass(color?: ButtonColor): string {
    switch (color) {
        default: return s.ColorPrimary
    }
}

export function Button({
    text,
    type,
    onClick,
    className,
    color,
    wide,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(
                s.Root,
                wide && s.Wide,
                getColorClass(color),
                className,
            )}
        >
            {text || ''}
        </button>
    )
}
