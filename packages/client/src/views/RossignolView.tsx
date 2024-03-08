import useTags from '../hooks/useTags';
import useTracks from '../hooks/useTracks';
import useRandom from '../hooks/useRandom';
import { useState } from 'react';
import useSearchSong from '../hooks/useSearchSong';
import Player from '../components/Player';
import useTrackList from '../hooks/useTrackList';

const firstPage = Math.floor(Math.random() * 2000);

const RossignolView = () => {
  const [randomTagsPage, setRandomTagsPage] = useState(firstPage);
  const [randomTracksPage, setRandomTracksPage] = useState(0);
  const tags = useTags(randomTagsPage);
  const tag = useRandom(tags.data?.toptags.tag);
  const tracks = useTracks(tag?.name, randomTracksPage);
  const track = useRandom(tracks.data?.tracks.track);
  const songInfo = useSearchSong(track);
  const { handleDeleteTrack, trackList } = useTrackList({
    videoId: songInfo?.data?.videoId,
  });

  // Click action
  const handleGetRandomTrack = () => {
    setRandomTagsPage(Math.floor(Math.random() * 2000));
    setRandomTracksPage(
      Math.floor(Math.random() * parseInt(tracks.data?.tracks['@attr'].totalPages ?? '10')),
    );
  };

  if (!tracks.isFetching && tracks.data?.tracks.track.length === 0) {
    setRandomTracksPage(
      Math.floor(Math.random() * parseInt(tracks.data.tracks['@attr'].totalPages)),
    );
  }

  return (
    <>
      <button onClick={handleGetRandomTrack}>TEST BTN SEE LOG</button>
      <div>{tags.isLoading ? <h1>Loading...</h1> : <h1>{tag?.name}</h1>}</div>
      <div>
        Artist : {track?.artist.name} <br />
        Name {track?.name}:
      </div>
      <Player
        song={{ videoId: trackList[trackList.length - 1] }}
        handleNext={handleGetRandomTrack}
      />
    </>
  );
};

export default RossignolView;
