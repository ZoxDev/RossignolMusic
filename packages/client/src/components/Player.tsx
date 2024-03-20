import { songInfo } from '../hooks/useSearchSong';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { Slider } from '@mui/material';
import Loading from './Loading';
import Button from './Button';
import '../styles/Player.styles.css';

const BASE_URL = `https://www.youtube.com/watch?v=`;

type playerProps = {
  handlePrev: () => void;
  handleNext: () => void;
  song?: songInfo;
};

const Player = (props: playerProps) => {
  const storedIsPlaying = localStorage.getItem('isPlaying');
  const storedVolume = localStorage.getItem('volume');

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
    setIsPlaying(!isPlaying);
    localStorage.setItem('isPlaying', JSON.stringify(!isPlaying));
  };

  if (props.song === undefined)
    return <Loading message="Click or press enter for getting a track..." />;

  return (
    <>
      <div className="player_reactplayer_container">
        <ReactPlayer
          url={`${BASE_URL}${props.song.videoId}`}
          playing={isPlaying}
          volume={volume}
          onEnded={props.handleNext}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="player_button_container">
        <Button
          clickFunction={handleTogglePlay}
          text={isPlaying ? 'PAUSE' : 'PLAY'}
          imgName={isPlaying ? 'pause.svg' : 'play.svg'}
          imgAlt={isPlaying ? 'pausing icon' : 'playing icon'}
          imgSize={30}
          keyCode="Space"
        />
        <Button
          clickFunction={props.handlePrev}
          text="PREV"
          imgName="prev.svg"
          imgAlt="prev song icon"
          imgSize={30}
          keyCode="ArrowLeft"
        />
        <Button
          clickFunction={props.handleNext}
          text="NEXT"
          keyCode="ArrowRight"
          imgName="next.svg"
          imgAlt="next song icon"
          imgSize={30}
        />
        <Button
          clickFunction={() => navigator.clipboard.writeText(`${BASE_URL}${props.song?.videoId}`)}
          text="COPYLINK"
          keyCode="KeyC"
          imgName="link.svg"
          imgAlt="copy link icon"
          imgSize={30}
        />
      </div>

      <div className="player_volume_slider">
        <img style={{ width: '24px', height: '24px' }} src="../../public/volume.svg" />
        <Slider
          aria-label="volume"
          max={1}
          sx={{ color: 'black' }}
          step={0.01}
          onChange={(_, value) => handleVolumeChange(value)}
          value={volume}
        />
      </div>
    </>
  );
};

export default Player;
