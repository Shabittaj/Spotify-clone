import React, { useState, useRef, useEffect } from 'react';
import '../Styles/MusicPlayer.css';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { TbPlayerSkipForwardFilled, TbPlayerSkipBackFilled } from 'react-icons/tb';
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import axios from 'axios';

// axios.get('http://localhost:8080/album/')
//   .then(response => {
//     const [album, setData] = useState();
//     // console.log(response.data.songs);
//     setData(response.data.songs); // Destructuring assignment to extract the "data" property
//     console.log("album: " + album); // Access the response data stored in the "data" constant
//   })
//   .catch((error) => {
//     console.error('Error fetching songs:', error);
//   });

// const [songs, setSongs] = useState([]);

// useEffect(() => {
//   fetchSongs();
// }, []);

// const fetchSongs = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/album/');
//     setSongs(response.data);
//   } catch (error) {
//     console.error('Error fetching songs:', error);
//   }
// };


const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // New state for volume

  /* Make sure the songs and the image of the song is in Public folder exactly named like below here. Or you can rename here. Also you can add more songs here */
  const songs = [
    { title: 'Tum Hi Ho', src: '/TumHiHo.mp3', image: '/tumhiho.jpeg', artist: 'Arijit Singh' },
    { title: 'Kolaveri Di', src: '/kolaveri.mp3', image: '/kolaveri.png', artist: 'Dhanush' },
    { title: 'Perfect', src: '/Perfect.mp3', image: '/Perfect.jpg', artist: 'Ed Sheeran' },
    { title: 'See You Again', src: '/See you Again.mp3', image: '/See you Again.jpg', artist: 'Wiz Kalifa' },
    { title: 'Naa Ready', src: '/Naa ready.mp3', image: '/Naa ready.jpg', artist: 'Vijay, Asal Kolaaru' },
    { title: 'The Batman', src: '/batman.mp3', image: '/batman.jpg', artist: 'Michael Giacchino' },
    { title: 'Ammadi Aathadi', src: '/ammadi aathadi.mp3', image: '/ammadi aathadi.jpg', artist: 'T. Ranjendar, STR, Suchitra' },
    { title: 'Arima Arima', src: '/arima arima.mp3', image: '/arima arima.jpg', artist: 'Hariharan, Sadhana Sargam' },
    { title: 'Namma Satham', src: '/Namma satham.mp3', image: '/Namma satham.jpg', artist: 'A.R. Rahman, Yogi Sekar' },
    { title: 'Azhagiye', src: '/azhagiye.mp3', image: '/azhagiye.jpg', artist: 'Arjun Chandy, Haricharan, Jonita Gandhi' },
    { title: 'Aye Sinamika', src: '/aye sinamika.mp3', image: '/aye sinamika.jpg', artist: 'A.R. Rahman, Karthik' },
    { title: 'Agar Tum Sath Ho', src: '/agar tum.flac', image: '/agar tum.jpg', artist: 'Alka Yagnik & Arjith Singh' },
    { title: 'Amma Nah Nah', src: '/amma nah nah.mp3', image: '/amma nah nah.jpg', artist: 'Santhosh Narayanan' },
    { title: 'Channa Mereya', src: '/channa meraya.mp3', image: '/channa meraya.jpg', artist: 'Arjith Singh' },
    { title: 'Beast Mode', src: '/beast mode.mp3', image: '/beast mode.jpg', artist: 'Anirudh Ravichander' },
    { title: 'Arabic Kuthu', src: '/arabic kuthu.flac', image: '/arabic kuthu.jpg', artist: 'Anirudh Ravichander, Jonita Gandhi' },

  ];

  const handlePlayPause = (song) => {
    if (currentSong && currentSong.src === song.src) {
      if (isPlaying) {
        setIsPlaying(false);
        audioRef.current.pause();
      } else {
        setIsPlaying(true);
        audioRef.current.play();
      }
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      audioRef.current.src = song.src;
      audioRef.current.play();
    }
  };

  const handleNextSong = () => {
    const currentIndex = songs.findIndex((song) => song.src === currentSong.src);
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    setCurrentSong(nextSong);
    audioRef.current.src = nextSong.src;
    audioRef.current.play();
  };

  const handlePreviousSong = () => {
    if (audioRef.current.currentTime > 3) {
      // Replay the currently playing song from the beginning
      audioRef.current.currentTime = 0;
    } else {
      const currentIndex = songs.findIndex((song) => song.src === currentSong.src);
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
      const previousSong = songs[previousIndex];
      setCurrentSong(previousSong);
      audioRef.current.src = previousSong.src;
    }

    audioRef.current.play();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {

    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const getVolumeIcon = () => {
    if (volume === 0) {
      return <FaVolumeMute className="volume-icon" />;
    } else if (volume <= 0.5) {
      return <FaVolumeDown className="volume-icon" />;
    } else {
      return <FaVolumeUp className="volume-icon" />;
    }
  };

  return (
    <div className="music-player">
      <div className="song-list-container">
        <div className="song-list">
          {songs.map((song) => (
            <div
              key={song.src}
              className={`song ${currentSong && currentSong.src === song.src && isPlaying ? 'active' : ''}`}
              onClick={() => handlePlayPause(song)}
            >
              <img className="song-image" src={song.image} alt="Song" />
              <div className="song-details">
                <div className="song-title">{song.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <div className="playercontrols">
          <div className="playpausenextback">
            <div className="controls">
              <div className="pb">
                <button className="previous-button" onClick={handlePreviousSong} disabled={!currentSong}>
                  <i className="iprevious">
                    <TbPlayerSkipBackFilled />
                  </i>
                </button>
              </div>
              <div className="pp">
                <button
                  className={`play-pause-button ${currentSong && isPlaying ? 'playing' : ''}`}
                  onClick={() => handlePlayPause(currentSong)}
                  disabled={!currentSong}
                >
                  {isPlaying ? (
                    <i className="ipause">
                      <BsFillPauseFill />
                    </i>
                  ) : (
                    <i className="iplay">
                      <BsFillPlayFill />
                    </i>
                  )}
                </button>
              </div>
              <div className="nb">
                <button className="next-button" onClick={handleNextSong} disabled={!currentSong}>
                  <i className="inext">
                    <TbPlayerSkipForwardFilled />
                  </i>
                </button>
              </div>
            </div>
          </div>
          <div className="time-line">
            <div className="time-duration">
              <span className="current-time">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="timeline"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  setCurrentTime(parseInt(e.target.value));
                  audioRef.current.currentTime = e.target.value;
                }}
              />
              <span className="duration">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        <div className="si">
          <div className="current-song">
            {currentSong && (
              <div className="csong-icon">
                <div className="cicon">
                  <img className="csong-image" src={currentSong.image} alt="Current Song" />
                </div>
                <div className="ctitle">
                  <span className="csong-title">{currentSong.title}</span>
                </div>
                <div className="current-song-artist">
                  {currentSong.artist}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="vol">
        <div className="volume-control">

          <button className="volume-button">

            {getVolumeIcon()}

          </button>

          <input
            type="range"
            className="volume-slider"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <audio ref={audioRef} />
      <div className='header'>
        <div className='left'>
          <i className='ileft'><BsChevronLeft /></i>
        </div>
        <div className='right'>
          <i className='iright'><BsChevronRight /></i>
        </div>
        <div className='account'>
          <i className='iaccount'><PersonOutlineIcon /></i>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
