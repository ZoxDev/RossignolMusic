import useTags from '../hooks/useTags';
import useTracks from '../hooks/useTracks';
import useRandom from '../hooks/useRandom';
import useSearchSong from '../hooks/useSearchSong';
import useTrackList from '../hooks/useTrackList';

import { useState } from 'react';

import Player from '../components/Player';
import Loading from '../components/Loading';

const MAX_TAG_PAGE = 2000;
const randomInitialPage = Math.floor(Math.random() * MAX_TAG_PAGE);

const RossignolView = () => {
  const [randomTagsPage, setRandomTagsPage] = useState(randomInitialPage);
  const [randomTracksPage, setRandomTracksPage] = useState(0);
  const tags = useTags(randomTagsPage);
  const tag = useRandom(tags.data?.toptags.tag);
  const tracks = useTracks(tag?.name, randomTracksPage);
  const track = useRandom(tracks.data?.tracks.track);
  const song = useSearchSong(track);
  const { trackList, handleDeleteTrack, handleAddTrack } = useTrackList(song.data);

  const handleGetRandomTrack = () => {
    setRandomTagsPage(Math.floor(Math.random() * MAX_TAG_PAGE));
    setRandomTracksPage(
      Math.floor(Math.random() * parseInt(tracks.data?.tracks['@attr'].totalPages ?? '50')),
    );
    handleAddTrack();
  };

  const handleSimilarTrack = () => {
    setRandomTracksPage(
      Math.floor(Math.random() * parseInt(tracks.data?.tracks['@attr'].totalPages ?? '50')),
    );
    handleAddTrack();
  };

  // re-search a track if no one return
  if (!tracks.isFetching && tracks.data?.tracks.track.length === 0) {
    setRandomTracksPage(
      Math.floor(Math.random() * parseInt(tracks.data.tracks['@attr'].totalPages)),
    );
    handleAddTrack();
  }

  // Loading systeme
  if (tags.isFetching) return <Loading message="Loading genres..." />;
  if (tracks.isFetching) return <Loading message="Research tracks..." />;
  if (song.isFetching) return <Loading message="Getting track information..." />;

  return (
    <>
    <button>GET TRACK</button>
      <div>
        <Player
          song={trackList[trackList.length - 1]}
          handlePrev={handleDeleteTrack}
          handleNext={handleGetRandomTrack}
        />
      </div>
      <button onClick={handleGetRandomTrack}>RANDOM TRACK</button>
      <button onClick={handleSimilarTrack}>SIMILAR TRACK</button>
    </>
  );
};

export default RossignolView;
