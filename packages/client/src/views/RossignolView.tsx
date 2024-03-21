import useTags from '../hooks/useTags';
import useTracks from '../hooks/useTracks';
import useRandom from '../hooks/useRandom';
import useSearchSong from '../hooks/useSearchSong';
import useList from '../hooks/useList';

import { useState } from 'react';

import Player from '../components/Player';
import Loading from '../components/Loading';
import Button from '../components/Button';

import '../styles/Rossigol_view.styles.css';

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
  if (tracks.isFetching) return <Loading message="Research songs..." />;
  if (song.isFetching)
    return <Loading message="Getting song information... (It can takes few minutes)" />;

  return (
    <>
      <section className="rossignol_view">
        <Button
          text="GET SONG"
          clickFunction={handlePlayTrack}
          imgName="enter.svg"
          imgAlt="enter key"
          keyCode="Enter"
        />
        <Player
          song={trackList[trackList.length - 1]}
          handlePrev={handlePrevTrack}
          handleNext={handlePlayTrack}
        />
        <div className="rossignol_view_option_container">
          <Button
            text="RANDOM TRACK"
            clickFunction={() => setOption('random')}
            imgName={option === 'random' ? 'valid.svg' : 'nonvalid.svg'}
            imgAlt={option === 'random' ? 'option random checked' : 'option random unchecked'}
            keyCode="KeyR"
          />
          <Button
            text="SIMILAR TRACK"
            clickFunction={() => setOption('similar')}
            imgName={option === 'similar' ? 'valid.svg' : 'nonvalid.svg'}
            imgAlt={option === 'similar' ? 'option similar checked' : 'option similar unchecked'}
            keyCode="KeyS"
          />
        </div>
      </section>
    </>
  );
};

export default RossignolView;
