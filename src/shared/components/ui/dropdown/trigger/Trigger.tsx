import { useContext, useRef } from 'react';
import { DropdownContext, type DropdownContextType } from '../Dropdown';
import { gsap } from 'gsap';

interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Trigger(props: DropdownTriggerProps) {
  const context = useContext(DropdownContext) as DropdownContextType & { toggle: () => void; open: () => void; closeLater: () => void };
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (!context) {
    throw new Error('DropdownTrigger must be used within a Dropdown');
  }

  const {
    triggerRef,
    toggle,
    open,
    closeLater,
    hoverMode,
    disabled,
    isOpen,
  } = context;

  const handleClick = () => {
    if (buttonRef.current && !hoverMode) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
    toggle();
  };

  const interactionProps = hoverMode ? {
    onMouseEnter: open,
    onMouseLeave: closeLater,
  } : {
    onClick: handleClick,
  };

  return (
    <button
      ref={(el) => {
        buttonRef.current = el;
        (triggerRef as React.RefObject<HTMLButtonElement | null>).current = el;
      }}
      className={`transition-colors cursor-pointer ${isOpen ? 'text-orange-500' : 'text-zinc-400 hover:text-zinc-100'} ${props.className || ''}`}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      {...interactionProps}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
}
