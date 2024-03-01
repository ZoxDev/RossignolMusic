import useTags from '../hooks/useTags';
import useTracksLastFm from '../hooks/useTracksLastFm';
import { useState } from 'react';

const RossignolView = () => {
  // State
  const [randomPage, setRandomPage] = useState<number | undefined>(undefined);

  // When random page change do a new query with the page
  const tagQuery = useTags(randomPage);

  const tracks = useTracksLastFm(tagQuery.data?.toptags.tag[0].name, 0);

  const handleGetRandomPage = async () => {
    setRandomPage(Math.floor(Math.random() * 2000));
  };

  return (
    <>
      <button onClick={handleGetRandomPage}>TEST BTN SEE LOG</button>
      <div>
        {tagQuery.isLoading ? <h1>Loading...</h1> : <h1>{tagQuery.data?.toptags.tag[0].name}</h1>}
      </div>
      <div>
        {tracks.isLoading ? (
          <h1>Loading ...</h1>
        ) : (
          <h1>
            {tracks.data?.tracks.track[0].artist.name} {tracks.data?.tracks.track[0].name}
          </h1>
        )}
      </div>
    </>
  );
};

export default RossignolView;
