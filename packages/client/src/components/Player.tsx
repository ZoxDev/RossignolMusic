import { songInfo } from '../hooks/useSearchSong';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { Slider } from '@mui/material';
import Loading from './Loading';
import Button from './Button';
import '../styles/Player.styles.css';
import { useMediaQuery } from '@mui/material';

const BASE_URL = `https://www.youtube.com/watch?v=`;

type playerProps = {
  handlePrev: () => void;
  handleNext: () => void;
  song?: songInfo;
};

const Player = (props: playerProps) => {
  const storedIsPlaying = localStorage.getItem('isPlaying');
  const storedVolume = localStorage.getItem('volume');

  const smallScreen = useMediaQuery('(max-width:680px)');

  const [isPlaying, setIsPlaying] = useState(() => {
    return storedIsPlaying ? JSON.parse(storedIsPlaying) : false;
  });
  const [volume, setVolume] = useState(() => {
    return storedVolume ? parseFloat(storedVolume) : 1;
  });

  const handleVolumeChange = (volume: number | number[]) => {
    if (typeof volume !== 'number') throw new Error("Can't get an array of numbers");
    setVolume(volume);
    localStorage.setItem('volume', volume.toString());
  };

  const handleTogglePlay = () => {
    // SPAM SPACE BUG
    setIsPlaying(!isPlaying);
    localStorage.setItem('isPlaying', JSON.stringify(!isPlaying));
  };

  if (props.song === undefined)
    return <Loading message="Click or press enter for getting a song..." />;

  return (
    <>
      <ReactPlayer
        url={`${BASE_URL}${props.song.videoId}`}
        playing={isPlaying}
        volume={volume}
        onEnded={props.handleNext}
        // Use media query and adapt the size
        width={smallScreen ? '' : '640px'}
      />

      <div className="player_button_container">
        <Button
          clickFunction={props.handlePrev}
          text="PREV"
          imgName="prev.svg"
          imgAlt="prev song icon"
          keyCode="ArrowLeft"
        />
        <Button
          clickFunction={handleTogglePlay}
          text={isPlaying ? 'PAUSE' : 'PLAY'}
          imgName={isPlaying ? 'pause.svg' : 'play.svg'}
          imgAlt={isPlaying ? 'pausing icon' : 'playing icon'}
          keyCode="Space"
        />
        <Button
          clickFunction={props.handleNext}
          text="NEXT"
          keyCode="ArrowRight"
          imgName="next.svg"
          imgAlt="next song icon"
        />
        <Button
          clickFunction={() => navigator.clipboard.writeText(`/${props.song?.videoId}`)}
          text="COPYLINK"
          keyCode="KeyC"
          imgName="link.svg"
          imgAlt="copy link icon"
        />
      </div>

      <div className="player_volume_slider">
        <img
          style={
            smallScreen ? { width: '20px', height: '20px' } : { width: '24px', height: '24px' }
          }
          src="../../public/volume.svg"
        />
        <Slider
          aria-label="volume"
          max={1}
          sx={{ color: 'black', height: '1px' }}
          step={0.01}
          onChange={(_, value) => handleVolumeChange(value)}
          value={volume}
        />
      </div>
    </>
  );
};

export default Player;
