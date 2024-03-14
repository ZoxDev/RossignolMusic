import '../styles/Button.styles.css';

type PropsButton = {
  clickFunction: () => void;
  text: string;
  svg?: React.ReactElement;
};

const Button = (props: PropsButton) => {
  return (
    <button onClick={props.clickFunction}>
      {props.text}
      {props.svg}
    </button>
  );
};

export default Button;
