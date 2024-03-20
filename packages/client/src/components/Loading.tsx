import '../styles/Loading.styles.css';

type Loading = {
  message: string;
};

const Loading = (props: Loading) => {
  return (
    <>
      <span className="loading_container">
        <h1 className=" quicksand-normal">{props.message}</h1>
      </span>
    </>
  );
};

export default Loading;
