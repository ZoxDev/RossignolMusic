import '../styles/Button.styles.css';

type PropsButton = {
  clickFunction: () => void;
  text: string;
  svg?: React.ReactElement;
};

const Button = (props: PropsButton) => {
  return (
    <button className="button_container quicksand-normal" onClick={props.clickFunction}>
      <p>{props.text}</p>
      {props.svg}
    </button>
  );
};

export default Button;
