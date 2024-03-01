import useGetRandomTag from '../hooks/useGetRandomTag';
import useGetRandomTrackList from '../hooks/useGetRandomTrackList';

const RossignolView = () => {
  const { tagName, refetchRandomTag } = useGetRandomTag();
  const { refetchTrackList, trackList } = useGetRandomTrackList(tagName);

  const handleClick = async () => {
    await refetchRandomTag().then(() => refetchTrackList());

    console.log(trackList);
  };

  return (
    <>
      <button onClick={handleClick}>TEST BTN SEE LOG</button>
      <h1></h1>
    </>
  );
};

export default RossignolView;
