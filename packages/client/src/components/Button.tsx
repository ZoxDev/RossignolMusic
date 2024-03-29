import '../styles/Button.styles.css';

type PropsButton = {
  clickFunction: () => void;
  text?: string;
  imgName?: string;
  imgAlt?: string;
  keyCode?: string;
  styled: boolean;
  children?: string | JSX.Element;
};

const Button = (props: PropsButton) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === props.keyCode) {
      props.clickFunction();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return (
    <>
      {props.styled ? (
        <button
          className="button_container text-bold rounded-md bg-gray-900 border-2 border-gray-800 border-opacity-30"
          onClick={props.clickFunction}
        >
          <p>{props.text}</p>
          {props.imgName ? (
            <img className="button_icon" alt={props.imgAlt} src={`/${props.imgName}`} />
          ) : (
            ''
          )}
        </button>
      ) : (
        <button onClick={props.clickFunction}>{props.children}</button>
      )}
    </>
  );
};

export default Button;
