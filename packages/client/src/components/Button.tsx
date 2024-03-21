import '../styles/Button.styles.css';

type PropsButton = {
  clickFunction: () => void;
  text: string;
  imgName?: string;
  imgAlt?: string;
  keyCode?: string;
};

const Button = (props: PropsButton) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === props.keyCode) {
      props.clickFunction();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return (
    <button className="button_container quicksand-normal" onClick={props.clickFunction}>
      <p>{props.text}</p>
      {props.imgName ? (
        <img className="button_icon" alt={props.imgAlt} src={`../../public/${props.imgName}`} />
      ) : (
        ''
      )}
    </button>
  );
};

export default Button;
