import useGetTags from '../hooks/useGetTags';
import useGetRandomTrackList from '../hooks/useGetRandomTrackList';
import { useState } from 'react';

const RossignolView = () => {
  // State
  const [randomPage, setRandomPage] = useState(0);

  // When random page change do a new query with the page
  const { dataGetTags, pendingGetTags } = useGetTags(randomPage);

  const handleGetRandomPage = async () => {
    setRandomPage(Math.floor(Math.random() * 2000));
    console.log(dataGetTags);
  };

  return (
    <>
      <button onClick={handleGetRandomPage}>TEST BTN SEE LOG</button>
      <div>
        {pendingGetTags ? <h1>Loading...</h1> : <h1>{dataGetTags?.toptags.tag[0].name}</h1>}
      </div>
    </>
  );
};

export default RossignolView;
