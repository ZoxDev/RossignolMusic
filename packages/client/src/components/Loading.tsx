import '../styles/Loading.styles.css';

type LoadingProps = {
  message: string;
};

const Loading = ({ message }: LoadingProps) => (
  <span className="loading_container rounded-md bg-gray-900 border-2 border-gray-800 border-opacity-30">
    <h1 className="text-bold ">{message}</h1>
  </span>
);

export default Loading;
