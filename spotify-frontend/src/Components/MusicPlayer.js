import React, { useState, useRef, useEffect,useCallback,useMemo} from 'react';
import '../Styles/MusicPlayer.css';
import {FiSearch} from "react-icons/fi";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsChevronRight,
  BsChevronLeft,
  BsToggle2On,
  BsToggle2Off
} from 'react-icons/bs';
import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
  TbRepeatOff,
  TbRepeatOnce,
  TbRepeat
} from 'react-icons/tb';
import { FaVolumeUp, FaVolumeDown, FaVolumeMute,} from 'react-icons/fa';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // New state for volume
  const [repeatMode, setRepeatMode] = useState('no-repeat');
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const searchInputRef = useRef(null);

  
  /* Make sure the songs and the image of the song is in Public folder exactly named like below here */
    const songs = useMemo(() =>[
      { title: 'Adhaaru Adhaaru', src: '/Adhaaru.mp3', image: '/Adhaaru.jpg', artist: 'Vijay Prakash, Gana Bala' },
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
      
    ],[]);
  

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

    const handleAutoplayNextToggle = () => {
      setAutoplayNext(!autoplayNext);
    };

    const handleNextSong = useCallback(() => {
      if (isPlaying) {
        const currentIndex = songs.findIndex((song) => song.src === currentSong.src);
        const nextIndex = (currentIndex + 1) % songs.length;
        const nextSong = songs[nextIndex];
        setCurrentSong(nextSong);
        audioRef.current.src = nextSong.src;
        audioRef.current.play();
      } else {
        const currentIndex = songs.findIndex((song) => song.src === currentSong.src);
        const nextIndex = (currentIndex + 1) % songs.length;
        const nextSong = songs[nextIndex];
        setCurrentSong(nextSong);
        audioRef.current.src = nextSong.src;
      }
    }, [isPlaying, currentSong, songs]);
  
  const handlePreviousSong = () => {
    if (isPlaying) {
      if (audioRef.current.currentTime > 3) {
        audioRef.current.currentTime = 0;
      } else {
        const currentIndex = songs.findIndex((song) => song.src === currentSong.src);
        const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
        const previousSong = songs[previousIndex];
        setCurrentSong(previousSong);
        audioRef.current.src = previousSong.src;
      }
  
      audioRef.current.play();
    } else {
      if (audioRef.current.currentTime > 3) {
        audioRef.current.currentTime = 0;
      } else {
        const currentIndex = songs.findIndex((song) => song.src === currentSong.src);
        const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
        const previousSong = songs[previousIndex];
        setCurrentSong(previousSong);
        audioRef.current.src = previousSong.src;
      }
    }
  };
  
  const toggleRepeatMode = () => {
    if (repeatMode === 'no-repeat') {
      setRepeatMode('repeat');
    } else if (repeatMode === 'repeat') {
      setRepeatMode('repeat-one');
    } else {
      setRepeatMode('no-repeat');
    }
  };
  
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60).toString().padStart(2, '0');
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    };
  
    
    useEffect(() => {
      if (repeatMode === 'no-repeat') {
        audioRef.current.loop = false;
      } else if (repeatMode === 'repeat') {
        audioRef.current.loop = false;
      } else {
        audioRef.current.loop = true;
      }
    }, [repeatMode]);
    
    useEffect(() => {
      const audioElement = audioRef.current;
    
      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
      };
    
      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };
    
      const handleSongEnd = () => {
        if (autoplayNext) {
          handleNextSong();
        } else {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      };
    
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.addEventListener('ended', handleSongEnd);
    
      return () => {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioElement.removeEventListener('ended', handleSongEnd);
      };
    }, [autoplayNext, handleNextSong]);
    
    
  
    

 
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

  const handleSearchQueryChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);
  

useEffect(() => {
  // Filter songs based on the search query
  const filtered = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredSongs(filtered);
}, [searchQuery, songs]);



  useEffect(() => {
    function handleShowSearchBar() {
      setShowSearchBar(true);
      setSearchQuery('');
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 0);
    }

    window.addEventListener('showSearchBar', handleShowSearchBar);
  
    return () => {
      window.removeEventListener('showSearchBar', handleShowSearchBar);
    };
  }, []);

  useEffect(() => {
    function handleHideSearchBar() {
      setShowSearchBar(false);
      setSearchQuery('');
    }

    window.addEventListener('hideSearchBar', handleHideSearchBar);
  
    return () => {
      window.removeEventListener('hideSearchBar', handleHideSearchBar);
    };
  }, []);

  
  

  return (
    <div className="music-player">
      <div className="song-list-container">
        <div className="song-list">
          {(searchQuery ? filteredSongs : songs).map((song) => (
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
              
               <div className="autoplay-next">
                  <button
                    className={`autoplay-next-button ${autoplayNext ? 'active' : ''}`}
                    onClick={handleAutoplayNextToggle}
                  >
                    {autoplayNext?(
                    <i className="autoon"><span className='tooltip'>Auto Next Off</span><BsToggle2On/></i>):(
                      <i className='autooff'><span className='tooltip'>Auto Next On</span><BsToggle2Off/></i>)
                    }
                  </button>
                  </div>
              <div className="pb">
                <button className="previous-button" onClick={handlePreviousSong} disabled={!currentSong}>
                  <i className="iprevious"><span className='tooltip'>Previous</span>
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
                    <i className="ipause"><span className='tooltip'>Pause</span>
                      <BsFillPauseFill />
                    </i>
                  ) : (
                    <i className="iplay"><span className='tooltip'>Play</span>
                      <BsFillPlayFill />
                    </i>
                  )}
                </button>
              </div>
              <div className="nb">
                <button className="next-button" onClick={handleNextSong} disabled={!currentSong}>
                  <i className="inext"><span className='tooltip'>Next</span>
                    <TbPlayerSkipForwardFilled />
                  </i>
                </button>
              </div>
              <div className="repeat-mode">
                  <button
                    className={`repeat-button ${repeatMode}`}
                    onClick={toggleRepeatMode}
                  >
                    {repeatMode === 'no-repeat' && <i className="repeat-icon"><span className='tooltip'>Enable Repeat</span><TbRepeatOff/></i>}
                    {repeatMode === 'repeat' && <i className="repeat-icon"><span className='tooltip'>Enable Repeat One</span><TbRepeat/></i>}
                    {repeatMode === 'repeat-one' && <i className="repeat-icon"><span className='tooltip'>Disable Repeat</span><TbRepeatOnce/></i>}
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
          <button className="volume-button"><span className='tooltip'>Volu</span>
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
          <i className='ileft'><BsChevronLeft/></i>
        </div>
        <div className='right'>
          <i className='iright'><BsChevronRight/></i>
        </div>
      <div className='account'>
        <i className='iaccount'><PersonOutlineIcon/></i>
      </div>
      </div>
      <div className='searchBar'>
      
      {showSearchBar && 
      <div className="searchContainer">
      <span className="searchIcon">
            <FiSearch />
          </span>
          <input 
          autoFocus
           ref={searchInputRef}
           type="text" 
           placeholder="What do you want to listen to..."
           value={searchQuery}
           onChange={handleSearchQueryChange}/>
          
        </div>
      }
      
    </div>
    </div>
  );
};

export default MusicPlayer;
