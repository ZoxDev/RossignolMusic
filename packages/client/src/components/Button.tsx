import { ComponentProps, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import '../styles/Button.styles.css';

type ButtonProps = PropsWithChildren<{
  onClick: () => void;
  keyCodeClick?: KeyboardEvent['code'];
  isUnstyled?: boolean;
}> &
  ComponentProps<'button'>;

const Button = ({ onClick, keyCodeClick, isUnstyled = false, children, ...rest }: ButtonProps) => {
  const button = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code !== keyCodeClick) return;

      button.current?.click();
    },
    [keyCodeClick],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const styleString = isUnstyled
    ? ''
    : 'button_container text-bold rounded-md bg-gray-900 border-2 border-gray-800 border-opacity-30';

  return (
    <button ref={button} className={styleString} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
