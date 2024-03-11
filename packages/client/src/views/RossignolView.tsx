import useTags from '../hooks/useTags';
import useTracks from '../hooks/useTracks';
import useRandom from '../hooks/useRandom';
import { useState } from 'react';
import useSearchSong from '../hooks/useSearchSong';
import Player from '../components/Player';

const MAX_TAG_PAGE = 2000;
const randomInitialPage = Math.floor(Math.random() * MAX_TAG_PAGE);

const RossignolView = () => {
  const [randomTagsPage, setRandomTagsPage] = useState(randomInitialPage);
  const [randomTracksPage, setRandomTracksPage] = useState(0);
  const tags = useTags(randomTagsPage);
  const tag = useRandom(tags.data?.toptags.tag);
  const tracks = useTracks(tag?.name, randomTracksPage);
  const track = useRandom(tracks.data?.tracks.track);
  const songQuery = useSearchSong(track);

  // Click action
  const handleGetRandomTrack = () => {
    setRandomTagsPage(Math.floor(Math.random() * MAX_TAG_PAGE));
    setRandomTracksPage(
      Math.floor(Math.random() * parseInt(tracks.data?.tracks['@attr'].totalPages ?? '10')),
    );
    console.log({ randomTracksPage });
  };

  if (!tracks.isFetching && tracks.data?.tracks.track.length === 0) {
    setRandomTracksPage(
      Math.floor(Math.random() * parseInt(tracks.data.tracks['@attr'].totalPages)),
    );
  }

  return (
    <>
      <button onClick={handleGetRandomTrack}>RANDOM TRACK</button>
      <button>RANDOM SIMILAR TRACK</button>
      <div>
        {tags.isLoading || tracks.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {songQuery.isLoading || songQuery.isError ? (
              <h1>Loading...</h1>
            ) : (
              <Player song={songQuery.data} handleNext={handleGetRandomTrack} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default RossignolView;
