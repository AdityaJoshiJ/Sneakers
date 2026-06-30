'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  triggerIcon: React.ReactNode;
  desktopTriggerLabel: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  triggerIcon,
  desktopTriggerLabel,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        listboxRef.current &&
        !listboxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Focus active option when list opens or index changes on desktop
  useEffect(() => {
    if (isOpen && activeIndex >= 0 && optionRefs.current[activeIndex]) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  const toggleDropdown = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      const idx = options.findIndex((opt) => opt.value === value);
      setActiveIndex(idx >= 0 ? idx : 0);
    } else {
      triggerRef.current?.focus();
    }
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  // Keyboard navigation inside list
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      setActiveIndex((prev) => (prev + 1) % options.length);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
      e.preventDefault();
    } else if (e.key === 'Tab') {
      if (isOpen) {
        if (e.shiftKey) {
          if (document.activeElement === optionRefs.current[0]) {
            optionRefs.current[options.length - 1]?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === optionRefs.current[options.length - 1]) {
            optionRefs.current[0]?.focus();
            e.preventDefault();
          }
        }
      }
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        onClick={toggleDropdown}
      >
        <span className={styles.triggerIcon}>{triggerIcon}</span>
        <span className={styles.triggerLabel}>{desktopTriggerLabel}</span>
      </button>

      {isOpen && (
        <>
          {/* Mobile Backdrop overlay */}
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />

          {/* Listbox overlay container */}
          <div
            ref={listboxRef}
            className={styles.listboxContainer}
            role="listbox"
            aria-label={label}
            onKeyDown={handleKeyDown}
          >
            {/* Mobile bottom-sheet header drag handle indicator */}
            <div className={styles.dragHandle} />

            <div className={styles.optionsList}>
              {options.map((option, index) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    ref={(el) => {
                      optionRefs.current[index] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`${styles.option} ${isSelected ? styles.selected : ''} ${
                      index === activeIndex ? styles.focused : ''
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    <span className={styles.optionText}>{option.label}</span>
                    {isSelected && (
                      <span className={styles.checkmark}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={styles.checkmarkIcon}
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
