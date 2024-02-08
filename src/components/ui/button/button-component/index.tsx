import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import ButtonLoader from '../button-loader'
import clsx from 'clsx'
import WithLoading from '@/lib/helpers/withLoading'

const buttonVariants = cva('', {
    variants: {
        variant: {
            default: 'bg-[#393939] text-white py-[9px] px-4 rounded focus:outline-none focus:shadow-outline text-[16px] em:text-[18px] lg:text-[22px] font-semibold hover:shadow-xl',
        },
        size: {
            default: '',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={clsx(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)
Button.displayName = 'Button'
export { buttonVariants , Button as ButtonComponent}
export default WithLoading(ButtonLoader, Button)
