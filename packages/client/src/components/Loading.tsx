import '../styles/Loading.styles.css';

type Loading = {
  message: string;
};

const Loading = (props: Loading) => {
  return (
    <>
      <span className="loading_container rounded-md bg-gray-900 border-2 border-gray-800 border-opacity-30">
        <h1 className="text-bold ">{props.message}</h1>
      </span>
    </>
  );
};

export default Loading;
