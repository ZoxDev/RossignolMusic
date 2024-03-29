import { useState } from 'react';
import { songInfo } from '../hooks/useSearchSong';

import { Slider } from '@mui/material';

import ReactPlayer from 'react-player';
import Button from './Button';
import Loading from './Loading';

const BASE_URL = `https://www.youtube.com/watch?v=`;

type playerProps = {
  handlePrev: () => void;
  handleNext: () => void;
  song?: songInfo;
};

const Player = (props: playerProps) => {
  const storedIsPlaying = localStorage.getItem('isPlaying');
  const storedVolume = localStorage.getItem('volume');

  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    return storedIsPlaying ? JSON.parse(storedIsPlaying) : false;
  });
  const [isReplay, setIsReplay] = useState(false);
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

  if (props.song === undefined) {
    props.handleNext();
    return <Loading message="Waiting for song to be displayed" />;
  }

  return (
    <>
      <div className="relative w-player flex flex-col rounded-md bg-gray-900 border-2 border-gray-800 border-opacity-30">
        <div className="px-10 pt-10 pb-4 flex items-center z-50">
          <div
            data-amplitude-song-info="cover_art_url"
            className="w-24 h-24 md:w-44 md:h-44 xl:w-52 xl:h-52 rounded-md border-2 border-gray-700 border-opacity-30"
          >
            <ReactPlayer
              url={`${BASE_URL}${props.song.videoId}`}
              playing={isPlaying}
              volume={volume}
              onEnded={props.handleNext}
              width={'100%'}
              height={'100%'}
              loop={isReplay}
            />
          </div>
          <div className="h-24 md:h-44 xl:h-52 flex flex-col justify-evenly ml-10">
            <p className="text-bold">{props.song.artist}</p>
            <p className="text-normal">{props.song.title}</p>
          </div>
        </div>
        <div className="w-full flex flex-row gap-5 px-10 pb-6 z-50">
          <svg
            width="25"
            height="25"
            viewBox="0 0 30 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 1.15448C18 0.950218 17.9531 0.749599 17.8641 0.5731C17.775 0.396602 17.647 0.250543 17.493 0.149832C17.3391 0.0491211 17.1648 -0.00263678 16.9879 -0.000159192C16.811 0.00231839 16.6378 0.0589427 16.486 0.163935L6.724 6.92229H3C2.20435 6.92229 1.44129 7.28719 0.87868 7.93671C0.31607 8.58623 0 9.46718 0 10.3857L0 19.6147C0 21.5311 1.344 23.0781 3 23.0781H6.724L16.484 29.8342C16.6358 29.9398 16.8092 29.9969 16.9864 29.9996C17.1636 30.0024 17.3383 29.9508 17.4925 29.85C17.6468 29.7492 17.7751 29.6029 17.8642 29.4261C17.9534 29.2493 18.0003 29.0483 18 28.8436V1.15448ZM28 2.30897V27.7076H30V2.30897H28ZM24 6.92691V23.0897H26V6.92691H24ZM20 11.5448V18.4718H22V11.5448H20Z"
              fill="#94A3B8"
            />
          </svg>

          <Slider
            aria-label="volume"
            max={1}
            sx={{ color: 'white', height: '4px' }}
            step={0.01}
            onChange={(_, value) => handleVolumeChange(value)}
            value={volume}
          />
        </div>
        <div className="bg-gray-950 bg-opacity-20 px-10 rounded-b-xl flex items-center justify-between z-50">
          <Button clickFunction={() => setIsReplay(!isReplay)} styled={false} keyCode="KeyL">
            <svg
              width="26"
              height="24"
              viewBox="0 0 26 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7071 15.7071C18.0976 15.3166 18.0976 14.6834 17.7071 14.2929C17.3166 13.9024 16.6834 13.9024 16.2929 14.2929L17.7071 15.7071ZM13 19L12.2929 18.2929C11.9024 18.6834 11.9024 19.3166 12.2929 19.7071L13 19ZM16.2929 23.7071C16.6834 24.0976 17.3166 24.0976 17.7071 23.7071C18.0976 23.3166 18.0976 22.6834 17.7071 22.2929L16.2929 23.7071ZM19.9359 18.7035L19.8503 17.7072L19.9359 18.7035ZM8.95082 19.9005C9.50243 19.9277 9.97163 19.5025 9.99879 18.9509C10.026 18.3993 9.6008 17.9301 9.04918 17.9029L8.95082 19.9005ZM6.06408 18.7035L5.97851 19.6998L6.06408 18.7035ZM1.07501 13.4958L0.075929 13.5387L1.07501 13.4958ZM1.07501 6.50423L0.0759292 6.46127L1.07501 6.50423ZM6.06409 1.29649L6.14965 2.29282L6.06409 1.29649ZM19.9359 1.29649L19.8503 2.29283L19.9359 1.29649ZM24.925 6.50423L23.9259 6.54718L24.925 6.50423ZM24.925 13.4958L25.9241 13.5387V13.5387L24.925 13.4958ZM16.2929 14.2929L12.2929 18.2929L13.7071 19.7071L17.7071 15.7071L16.2929 14.2929ZM12.2929 19.7071L16.2929 23.7071L17.7071 22.2929L13.7071 18.2929L12.2929 19.7071ZM19.8503 17.7072C17.5929 17.901 15.3081 18 13 18V20C15.3653 20 17.7072 19.8986 20.0215 19.6998L19.8503 17.7072ZM9.04918 17.9029C8.07792 17.8551 7.1113 17.7898 6.14964 17.7072L5.97851 19.6998C6.96438 19.7845 7.95525 19.8515 8.95082 19.9005L9.04918 17.9029ZM2.07408 13.4528C2.02486 12.3081 2 11.157 2 10H0C0 11.1856 0.0254804 12.3654 0.075929 13.5387L2.07408 13.4528ZM2 10C2 8.84302 2.02486 7.69192 2.07408 6.54718L0.0759292 6.46127C0.0254806 7.63461 0 8.81436 0 10H2ZM6.14965 2.29282C8.4071 2.09896 10.6919 2 13 2V0C10.6347 0 8.29281 0.101411 5.97853 0.30016L6.14965 2.29282ZM13 2C15.3081 2 17.5929 2.09896 19.8503 2.29283L20.0215 0.30016C17.7072 0.101411 15.3653 0 13 0V2ZM23.9259 6.54718C23.9751 7.69192 24 8.84302 24 10H26C26 8.81436 25.9745 7.63461 25.9241 6.46127L23.9259 6.54718ZM24 10C24 11.157 23.9751 12.3081 23.9259 13.4528L25.9241 13.5387C25.9745 12.3654 26 11.1856 26 10H24ZM19.8503 2.29283C22.092 2.48534 23.8293 4.29889 23.9259 6.54718L25.9241 6.46127C25.7842 3.20897 23.2653 0.578736 20.0215 0.30016L19.8503 2.29283ZM6.14964 17.7072C3.90797 17.5147 2.17075 15.7011 2.07408 13.4528L0.075929 13.5387C0.215764 16.791 2.7347 19.4213 5.97851 19.6998L6.14964 17.7072ZM2.07408 6.54718C2.17075 4.29889 3.90798 2.48534 6.14965 2.29282L5.97853 0.30016C2.73471 0.578735 0.215764 3.20897 0.0759292 6.46127L2.07408 6.54718ZM20.0215 19.6998C23.2653 19.4213 25.7842 16.791 25.9241 13.5387L23.9259 13.4528C23.8292 15.7011 22.092 17.5147 19.8503 17.7072L20.0215 19.6998Z"
                fill={isReplay ? '#38BDF8' : '#94A3B8'}
              ></path>
            </svg>
          </Button>
          <Button clickFunction={props.handlePrev} styled={false} keyCode="ArrowLeft">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 7C26 5.76393 24.5889 5.05836 23.6 5.8L11.6 14.8C10.8 15.4 10.8 16.6 11.6 17.2L23.6 26.2C24.5889 26.9416 26 26.2361 26 25V7Z"
                fill="#94A3B8"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M6 5L6 27"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <div className="cursor-pointer bg-white bg-opacity-5 w-24 h-24 rounded-full border-4 border-gray-800 border-opacity-75 flex items-center justify-center">
            <Button clickFunction={handleTogglePlay} keyCode="Space" styled={false}>
              {isPlaying ? (
                <svg
                  id="pause-icon"
                  width="24"
                  height="36"
                  viewBox="0 0 24 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="6"
                    height="36"
                    rx="3"
                    className="fill-slate-500 dark:fill-slate-400"
                  />
                  <rect
                    x="18"
                    width="6"
                    height="36"
                    rx="3"
                    className="fill-slate-500 dark:fill-slate-400"
                  />
                </svg>
              ) : (
                <svg
                  id="play-icon"
                  className="ml-[10px]"
                  width="31"
                  height="37"
                  viewBox="0 0 31 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.6901 16.6608L4.00209 0.747111C2.12875 -0.476923 0.599998 0.421814 0.599998 2.75545V33.643C0.599998 35.9728 2.12747 36.8805 4.00209 35.6514L29.6901 19.7402C29.6901 19.7402 30.6043 19.0973 30.6043 18.2012C30.6043 17.3024 29.6901 16.6608 29.6901 16.6608Z"
                    className="fill-slate-500 dark:fill-slate-400"
                  />
                </svg>
              )}
            </Button>
          </div>
          <Button clickFunction={props.handleNext} keyCode="ArrowRight" styled={false}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7C6 5.76393 7.41115 5.05836 8.4 5.8L20.4 14.8C21.2 15.4 21.2 16.6 20.4 17.2L8.4 26.2C7.41115 26.9416 6 26.2361 6 25V7Z"
                fill="#94A3B8"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M26 5L26 27"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button
            clickFunction={() => navigator.clipboard.writeText(`${BASE_URL}${props.song?.videoId}`)}
            keyCode="KeyC"
            styled={false}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.2454 4.6136C22.2463 2.50643 25.1736 2.46253 26.7935 4.16875C28.4176 5.87791 28.3744 8.96843 26.3707 11.0756L22.99 14.6359C22.7996 14.8431 22.6945 15.1205 22.6972 15.4083C22.7 15.696 22.8104 15.9712 23.0047 16.1744C23.199 16.3776 23.4617 16.4926 23.7361 16.4947C24.0105 16.4968 24.2747 16.3857 24.4718 16.1855L27.8539 12.6253C30.5203 9.81715 30.8552 5.33502 28.2767 2.6191C25.6954 -0.0982777 21.43 0.255845 18.7608 3.06395L11.9992 10.1859C9.33285 12.994 8.99798 17.4761 11.5765 20.1906C11.6728 20.2956 11.7881 20.3795 11.9156 20.4373C12.0431 20.4951 12.1804 20.5257 12.3193 20.5273C12.4582 20.5289 12.5961 20.5015 12.7248 20.4466C12.8535 20.3918 12.9705 20.3106 13.069 20.2078C13.1675 20.105 13.2454 19.9826 13.2984 19.8479C13.3513 19.7132 13.3781 19.5687 13.3772 19.423C13.3764 19.2773 13.3478 19.1333 13.2933 18.9992C13.2388 18.8652 13.1594 18.7439 13.0597 18.6424C11.4356 16.9333 11.4802 13.8427 13.4824 11.7356L20.2454 4.6136Z"
                fill="#94A3B8"
              />
              <path
                d="M18.5097 11.3246C18.3135 11.1184 18.0473 11.0022 17.7696 11.0018C17.4918 11.0014 17.2253 11.1167 17.0286 11.3224C16.8319 11.5281 16.7212 11.8073 16.7208 12.0986C16.7204 12.3899 16.8303 12.6695 17.0265 12.8757C18.6506 14.5849 18.6073 17.674 16.6037 19.7826L9.84073 26.9031C7.83849 29.0103 4.91117 29.0542 3.29124 27.3479C1.66712 25.6388 1.71177 22.5483 3.71401 20.4411L7.09619 16.8808C7.19321 16.7787 7.2701 16.6575 7.32247 16.5242C7.37484 16.3909 7.40166 16.2481 7.4014 16.1039C7.40114 15.9598 7.37381 15.8171 7.32096 15.684C7.26812 15.5509 7.19079 15.43 7.0934 15.3283C6.99602 15.2265 6.88047 15.1459 6.75337 15.091C6.62626 15.036 6.49009 15.0079 6.35262 15.0082C6.21516 15.0085 6.07908 15.0371 5.95218 15.0925C5.82527 15.148 5.71002 15.2291 5.613 15.3312L2.23081 18.8914C-0.435586 21.701 -0.770456 26.1817 1.80804 28.8976C4.38933 31.6164 8.65473 31.2609 11.3239 28.4527L18.0869 21.3308C20.7533 18.5241 21.0882 14.0391 18.5097 11.3246Z"
                fill="#94A3B8"
              />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Player;
