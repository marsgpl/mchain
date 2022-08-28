import { Icon, IconId } from 'components/Icon'
import { cn } from 'lib/cn'

import s from './index.module.css'

export interface InputLineProps {
    className?: string
    leftIcon?: IconId
    rightIcon?: IconId
    onRightIconClick?: React.MouseEventHandler<HTMLDivElement>
    inputHtmlProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

export function InputLine({
    className,
    leftIcon,
    rightIcon,
    onRightIconClick,
    inputHtmlProps,
}: InputLineProps) {
    return (
        <label className={cn(
            s.Root,
            className,
            leftIcon && s.WithLeftIcon,
            rightIcon && s.WithRightIcon,
        )}>
            {leftIcon ? (
                <div className={cn(s.Icon, s.LeftIcon)}>
                    <Icon id={leftIcon} />
                </div>
            ) : null}

            <input {...inputHtmlProps} className={cn(s.Input, inputHtmlProps?.className)} />

            {rightIcon ? (
                <div
                    className={cn(s.Icon, s.RightIcon)}
                    onClick={onRightIconClick}
                >
                    <Icon id={rightIcon} />
                </div>
            ) : null}
        </label>
    )
}
