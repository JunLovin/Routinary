import { useContext, useRef, type ReactNode } from 'react';
import { DropdownContext } from '../Dropdown';
import { gsap } from 'gsap';

interface DropdownItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  as?: React.ElementType;
  disabled?: boolean;
  to?: string;
}

export default function Item({
  children,
  as: Component = 'a',
  disabled,
  ...props
}: DropdownItemProps) {
  const context = useContext(DropdownContext);
  const itemRef = useRef<HTMLElement>(null);

  if (!context) {
    throw new Error('DropdownItem must be used within a Dropdown');
  }

  const { close } = context;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    props.onClick?.(e);
    close();
  };

  const handleMouseEnter = () => {
    if (!disabled && itemRef.current) {
      gsap.to(itemRef.current, {
        x: 4,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        x: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  return (
    <Component
      ref={itemRef}
      {...props}
      className={`block px-4 py-2.5 text-sm transition-colors ${
        disabled
          ? 'text-zinc-600 cursor-not-allowed opacity-50'
          : 'text-zinc-300 hover:text-white cursor-pointer'
      } ${props.className || ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-disabled={disabled}
    >
      {children}
    </Component>
  );
}
