import useTags from '../hooks/useTags';
import useTracks from '../hooks/useTracks';
import useRandom from '../hooks/useRandom';
import { useState } from 'react';

const firstPage = Math.floor(Math.random() * 2000);

const RossignolView = () => {
  const [randomTagsPage, setRandomTagsPage] = useState(firstPage);
  const [randomTracksPage, setRandomTracksPage] = useState(0);

  // When random page change do a new query with the page
  const tags = useTags(randomTagsPage);
  const tag = useRandom(tags.data?.toptags.tag);
  const tracks = useTracks(tag?.name, randomTracksPage);
  const track = useRandom(tracks.data?.tracks.track);

  // Click action
  const handleGetRandomTrack = () => {
    setRandomTagsPage(Math.floor(Math.random() * 2000));
    // setRandomTracksPage(
    //   Math.floor(Math.random() * parseInt(tracks.data?.tracks['@attr'].totalPages ?? '10')),
    // );
  };

  if (!tracks.isFetching && tracks.data?.tracks.track.length === 0) {
    setRandomTracksPage(
      Math.floor(Math.random() * parseInt(tracks.data.tracks['@attr'].totalPages)),
    );
  }

  return (
    <>
      <button onClick={handleGetRandomTrack}>TEST BTN SEE LOG</button>
      <div>{tags.isLoading ? <h1>Loading...</h1> : <h1>{tag.name}</h1>}</div>
      <div>
        Artist : {track?.artist.name} Name {track?.name}:
      </div>
    </>
  );
};

export default RossignolView;
