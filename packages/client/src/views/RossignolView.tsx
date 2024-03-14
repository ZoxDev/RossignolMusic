import useTags from '../hooks/useTags';
import useTracks from '../hooks/useTracks';
import useRandom from '../hooks/useRandom';
import useSearchSong from '../hooks/useSearchSong';
import useList from '../hooks/useList';

import { useState } from 'react';

import Player from '../components/Player';
import Loading from '../components/Loading';
import Button from '../components/Button';

const MAX_TAG_PAGE = 2000;
const randomInitialPage = Math.floor(Math.random() * MAX_TAG_PAGE);

const RossignolView = () => {
  const [randomTagsPage, setRandomTagsPage] = useState(randomInitialPage);
  const [randomTracksPage, setRandomTracksPage] = useState(0);
  const [option, setOption] = useState('random');
  const tags = useTags(randomTagsPage);
  const tag = useRandom(tags.data?.toptags.tag);
  const {
    list: tagList,
    handleDeleteFromList: handleDeleteTag,
    handleAddToList: handleAddTag,
  } = useList(tag);
  const tracks = useTracks(tagList[tagList.length - 1]?.name, randomTracksPage);
  const track = useRandom(tracks.data?.tracks.track);
  const song = useSearchSong(track);
  const {
    list: trackList,
    handleDeleteFromList: handleDeleteTrack,
    handleAddToList: handleAddTrack,
  } = useList(song.data);

  const handlePlayTrack = () => {
    switch (option) {
      case 'random':
        setRandomTagsPage(Math.floor(Math.random() * MAX_TAG_PAGE));
        setRandomTracksPage(
          Math.floor(Math.random() * parseInt(tracks.data?.tracks['@attr'].totalPages ?? '50')),
        );
        handleAddTag();
        handleAddTrack();
        break;
      case 'similar':
        setRandomTracksPage(
          Math.floor(Math.random() * parseInt(tracks.data?.tracks['@attr'].totalPages ?? '50')),
        );
        handleAddTrack();
        break;
      default:
        throw new Error('seems like there is no option peek');
    }
  };

  const handlePrevTrack = () => {
    handleDeleteTag();
    handleDeleteTrack();
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
      <Button text="GET TRACK" clickFunction={handlePlayTrack} />
      <Player
        song={trackList[trackList.length - 1]}
        handlePrev={handlePrevTrack}
        handleNext={handlePlayTrack}
      />
      <Button text="RANDOM TRACK" clickFunction={() => setOption('random')} />
      <Button text="SIMILAR TRACK" clickFunction={() => setOption('similar')} />
    </>
  );
};

export default RossignolView;
