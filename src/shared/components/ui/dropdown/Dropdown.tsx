import { createContext, useCallback, useEffect, useRef, useState, type SetStateAction } from 'react';
import Content from './content/Content';
import Trigger from './trigger/Trigger';
import Item from './item/Item';

interface DropdownProps {
  disabled?: boolean;
  hoverMode?: boolean;
  horizontalPosition?: 'auto' | 'left' | 'right';
  verticalPosition?: 'auto' | 'above' | 'below';
  matchTriggerWidth?: boolean;
  preventScroll?: boolean;
  initiallyOpened?: boolean;
  className?: string;

  onOpen?: () => void;
  onClose?: () => void;
  children:
    | React.ReactNode
    | ((renderProps: {
      trigger: typeof Trigger;
      content: typeof Content;
      isOpen: boolean;
      disabled?: boolean;
    }) => React.ReactNode);
}

export interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
  contentStyles: React.CSSProperties;
  hoverMode: boolean;

  toggle: () => void;
  open: () => void;
  close: () => void;
  closeLater: () => void;
  disabled: boolean;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

export default function Dropdown({
  disabled = false,
  hoverMode = false,
  horizontalPosition = 'auto',
  verticalPosition = 'auto',
  matchTriggerWidth = false,
  preventScroll = false,
  initiallyOpened = false,
  onOpen = () => {},
  onClose = () => {},
  className = '',
  children,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpened);
  const [contentStyles, setContentStyles] = useState<React.CSSProperties>({});
  
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<any>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let top: number | undefined;
    let left: number | undefined;
    let right: number | undefined;

    if (verticalPosition === "above") {
      top = triggerRect.top - contentRect.height;
    } else if (verticalPosition === "below") {
      top = triggerRect.bottom;
    } else {
      const spaceBelow = viewport.height - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      if (spaceBelow >= contentRect.height || spaceBelow >= spaceAbove) {
        top = triggerRect.bottom;
      } else {
        top = triggerRect.top - contentRect.height;
      }
    }

    if (horizontalPosition === "left") {
      left = triggerRect.left;
    } else if (horizontalPosition === "right") {
      right = viewport.width - triggerRect.right;
    } else {
      const spaceRight = viewport.width - triggerRect.left;
      const spaceLeft = triggerRect.right;

      if (spaceRight >= contentRect.width || spaceRight >= spaceLeft) {
        left = triggerRect.left;
      } else {
        right = viewport.width - triggerRect.right;
      }
    }

    const newStyles: React.CSSProperties = { 
      top, 
      left, 
      right,
      ...(matchTriggerWidth ? { width: `${triggerRect.width}px` } : {})
    };

    setContentStyles(newStyles);
  }, [horizontalPosition, verticalPosition, matchTriggerWidth]);

  const open = useCallback(() => {
    if (disabled) return;

    if (hoverMode && closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
      return;
    }

    setIsOpen(true);
  }, [disabled, hoverMode]);

  const close = useCallback(() => {
    if (disabled) return;
    setIsOpen(false);
  }, [disabled]);

  const closeLater = useCallback(() => {
    if (!hoverMode || disabled) return;

    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      close();
    }, 200);
  }, [hoverMode, disabled, close]);

  const toggle = useCallback(() => {
    if (disabled) return;
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, disabled, close, open]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: any) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || contentRef.current?.contains(target)) {
        return;
      }
      close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen, onOpen, onClose]);

  // Prevent scroll when open
  useEffect(() => {
    if (!isOpen || !preventScroll) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, preventScroll]);

  useEffect(() => {
    if (!isOpen) return;

    calculatePosition();

    const handleResize = () => calculatePosition();
    const handleScroll = () => calculatePosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, calculatePosition]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const contextValue: DropdownContextType = {
    isOpen,
    setIsOpen,
    close,
    triggerRef,
    contentRef,
    contentStyles,
    hoverMode,
    toggle,
    open,
    closeLater,
    disabled
  };

  const renderChildren = () => {
    if (typeof children === "function") {
      return children({
        trigger: Trigger,
        content: Content,
        isOpen,
        disabled,
      });
    }

    return children;
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={`relative inline-block ${className}`}>
        {renderChildren()}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Item = Item;
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
