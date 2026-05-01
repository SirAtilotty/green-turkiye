interface GameOverProps {
  reason: string;
  daysSurvived: number;
  onRestart: () => void;
}

export function GameOver({ reason, daysSurvived, onRestart }: GameOverProps) {
  const isVictory = reason.includes("Başardın"); // Simple check based on localized string

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in">
        <h2 className={`text-4xl font-black mb-4 ${isVictory ? 'text-green-400' : 'text-red-400'}`}>
          {isVictory ? 'TEBRİKLER!' : 'OYUN BİTTİ'}
        </h2>

        <div className={`p-4 rounded-xl mb-6 border ${isVictory ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className="text-xl text-white font-bold">{reason}</p>
        </div>

        <p className="text-slate-300 mb-8">
          <span className="font-bold text-white">{daysSurvived} gün</span> boyunca yönetimde kaldın.
        </p>

        <button
          onClick={onRestart}
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl w-full"
        >
          Tekrar Oyna
        </button>
      </div>
    </div>
  );
}