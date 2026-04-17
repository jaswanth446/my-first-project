import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track } from '../types';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Drift',
    artist: 'Cyber Synth',
    cover: 'https://picsum.photos/seed/neon1/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Midnight Pulse',
    artist: 'Lunar Echo',
    cover: 'https://picsum.photos/seed/neon2/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Digital Horizon',
    artist: 'Vector Wave',
    cover: 'https://picsum.photos/seed/neon3/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const skipBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const onEnded = () => {
    skipForward();
  };

  return (
    <div className="w-full h-full flex items-center justify-between px-10 relative overflow-hidden">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />

      {/* Now Playing Info (Left) */}
      <div className="flex items-center gap-6 min-w-[300px]">
        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gradient-to-br from-accent-cyan to-accent-magenta p-0.5">
           <AnimatePresence mode="wait">
              <motion.img
                key={currentTrack.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-full h-full object-cover rounded-[3px]"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
        </div>
        <div className="flex flex-col">
          <h4 className="font-sans font-medium text-sm text-text-p truncate max-w-[180px]">
            {currentTrack.title}
          </h4>
          <p className="text-text-s text-xs mt-1">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Controls (Center) */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-10">
          <button onClick={skipBack} className="text-text-s hover:text-text-p transition-colors p-2">
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center bg-text-p text-bg rounded-full hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          <button onClick={skipForward} className="text-text-s hover:text-text-p transition-colors p-2">
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-[480px] h-1.5 bg-white/10 rounded-full relative overflow-hidden group/progress">
          <motion.div
            className="absolute left-0 top-0 h-full bg-accent-cyan neon-glow-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats/Meta (Right) */}
      <div className="flex items-center gap-10 min-w-[300px] justify-end">
        <div className="flex flex-col items-end">
           <span className="text-[10px] text-text-s font-bold uppercase tracking-widest">Track</span>
           <span className="text-xs text-accent-cyan font-mono">{currentTrackIndex + 1} // {DUMMY_TRACKS.length}</span>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[10px] text-text-s font-bold uppercase tracking-widest">BPM</span>
           <span className="text-xs text-text-p font-mono italic">124</span>
        </div>
        <div className="flex items-center gap-3 text-text-s ml-4">
           <Volume2 size={16} />
           <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-text-s" />
           </div>
        </div>
      </div>
    </div>
  );
}
