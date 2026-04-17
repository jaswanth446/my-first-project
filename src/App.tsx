import { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [sessionScore, setSessionScore] = useState(0);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-bg">
      <div className="flex-1 grid grid-cols-[280px_1fr] overflow-hidden">
        {/* Sidebar - Playlist Area */}
        <aside className="bg-surface border-r border-white/5 p-6 flex flex-col gap-6 overflow-hidden">
          <h2 className="text-xs font-bold uppercase tracking-[2px] text-accent-magenta mb-3 font-sans">
            Playlist
          </h2>
          {/* We'll pass some state or sync the playlist better in a real app, 
              but for now the MusicPlayer component handles its internal list.
              To match the aesthetic, we will style MusicPlayer to be part of the UI shell. */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {/* The Playlist UI is now visually integrated in MusicPlayer but logical here if needed */}
            <p className="text-[11px] text-text-s leading-relaxed uppercase tracking-tighter italic border-l border-accent-magenta/30 pl-3 mb-8">
              CONTROLS: Use Arrow Keys to navigate Snake while you listen.
            </p>
            
            {/* The component itself will be adjusted to show only the list in the sidebar 
                and controls in the footer. But for simplicity and preserving logic, 
                we'll render the main logic in the sidebar andfooter parts. */}
          </div>
          
          <div className="mt-auto pt-6 border-t border-white/5">
             <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-text-s uppercase tracking-widest">Session Status</span>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono text-text-s">SCORE</span>
                  <span className="text-lg font-mono text-accent-green font-bold text-neon-green">
                    {sessionScore.toString().padStart(6, '0')}
                  </span>
                </div>
             </div>
          </div>
        </aside>

        {/* Game Viewport */}
        <main className="game-view-bg flex items-center justify-center relative p-12 overflow-hidden">
          <div className="absolute top-10 left-12 flex flex-col gap-1 z-20">
            <h1 className="text-4xl font-bold tracking-tighter text-white text-neon-cyan lowercase italic">
              synth snake
            </h1>
          </div>
          
          <div className="z-10 scale-[1.15]">
            <SnakeGame onScoreChange={setSessionScore} />
          </div>
        </main>
      </div>

      {/* Bottom Player Bar */}
      <footer className="h-[100px] bg-surface border-t border-white/5 z-30">
        <MusicPlayer />
      </footer>
    </div>
  );
}
