'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { scaleOnHover } from '@/lib/animations';

const ctaButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap transition-colors select-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground rounded-lg',
        secondary: 'bg-secondary text-secondary-foreground rounded-2xl',
        dark: 'bg-foreground text-primary-foreground rounded-2xl',
        submit: 'bg-primary text-primary-foreground rounded-full',
      },
      size: {
        sm: 'h-[40px] px-4 text-nav',
        default: 'h-[50px] px-6 text-button',
        lg: 'h-[60px] px-8 text-button',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface CTAButtonProps extends VariantProps<typeof ctaButtonVariants> {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function CTAButton({
  variant = 'primary',
  size = 'default',
  href,
  children,
  className,
  onClick,
  type = 'button',
}: CTAButtonProps) {
  const classes = cn(ctaButtonVariants({ variant, size }), className);

  if (href && href.startsWith('/')) {
    return (
      <motion.div whileHover={scaleOnHover} className="inline-flex">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={scaleOnHover}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      whileHover={scaleOnHover}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
