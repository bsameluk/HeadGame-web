import { useState } from "react";
import { createGame } from "../../api/games";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateGame: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const [numOfWords, setNumOfWords] = useState(0);
  const [secondsPerRound, setSecondsPerRound] = useState(60);

  const navigate = useNavigate();

  const handleCreateGame = async () => {
    if (!gameName) {
      toast.error('Game name is required');
      return;
    }
    if (numOfWords === 0) {
      toast.error('Number of words is required');
      return;
    }
    if (secondsPerRound === 0) {
      toast.error('Seconds per round is required');
      return;
    }

    try {
      const response = await createGame({
        name: gameName,
        number_of_words: numOfWords,
        seconds_per_round: secondsPerRound,
      });
      navigate(`/game/${response.id}`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Create details</h2>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Game name</label>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <NumOfWords
          value={numOfWords}
          onChange={setNumOfWords}
        />

        <SecondsPerRound
          value={secondsPerRound}
          onChange={setSecondsPerRound}
        />

        <button
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={handleCreateGame}
        >
          Create game
        </button>
      </div>
    </div>
  );
};

const NumOfWords: React.FC<{ value: number; onChange: (value: number) => void }> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-600">
        Number of words
      </label>

      <div className="grid grid-cols-3 gap-2">
        {[40, 50, 60].map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors
              ${value === num
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium text-gray-600">Custom value:</label>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

const SecondsPerRound: React.FC<{ value: number; onChange: (value: number) => void }> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-600">
        Seconds per round: {value}
      </label>

      <div className="space-y-2">
        <input
          type="range"
          min="20"
          max="100"
          step="10"
          value={value || 60}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>20 sec</span>
          <span>60 sec</span>
          <span>100 sec</span>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;
