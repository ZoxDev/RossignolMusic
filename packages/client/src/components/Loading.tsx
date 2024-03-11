type Loading = {
  message: string;
};

const Loading = (props: Loading) => {
  return (
    <>
      <h1>{props.message}</h1>
    </>
  );
};

export default Loading;
