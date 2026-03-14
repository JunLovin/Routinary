import { useContext, useEffect, useRef, type ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { DropdownContext } from '../Dropdown';
import { gsap } from 'gsap';

interface DropdownContentProps {
  children: ReactNode;
  className?: string;
}

export default function Content(props: DropdownContentProps) {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('DropdownContent must be used within a Dropdown');
  }

  const {
    contentRef,
    contentStyles,
    isOpen,
    hoverMode,
    open,
    closeLater,
  } = context;

  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    if (isOpen) {
      gsap.set(element, {
        opacity: 0,
        scale: 0.95,
        y: -10,
      });

      animationRef.current = gsap.to(element, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    } else {
      animationRef.current = gsap.to(element, {
        opacity: 0,
        scale: 0.95,
        y: -10,
        duration: 0.15,
        ease: 'power2.in',
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isOpen, contentRef]);

  if (typeof document === 'undefined') {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  const interactionProps = hoverMode ? {
    onMouseEnter: open,
    onMouseLeave: closeLater,
  } : {};

  const content = (
    <div
      ref={contentRef as React.RefObject<HTMLDivElement | null>}
      className="fixed z-50"
      style={{
        ...contentStyles,
        transformOrigin: 'top center',
      }}
      {...interactionProps}
      role="menu"
    >
      <div className={`bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden ${props.className || ''}`}>
        {props.children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
}
