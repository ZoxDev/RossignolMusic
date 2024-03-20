import '../styles/Button.styles.css';

type PropsButton = {
  clickFunction: () => void;
  text: string;
  imgName?: string;
  imgSize?: number;
  imgAlt?: string;
};

const Button = (props: PropsButton) => {
  return (
    <button className="button_container quicksand-normal" onClick={props.clickFunction}>
      <p>{props.text}</p>
      <img
        alt={props.imgAlt}
        style={{ width: `${props.imgSize}`, height: `${props.imgSize}` }}
        src={`../../public/${props.imgName}`}
      />
    </button>
  );
};

export default Button;
