import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Category, Game, loadGame } from '../../api/games';
import { toast } from 'react-toastify';
import SelectCategories from './modals/SelectCategories';


export interface Team {
  name: string;
  players: Player[];
}

export interface Player {
  name: string;
}

const GamePage: React.FC = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // state
  const [teams, setTeams] = useState<Team[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  // modals
  const [isSelectCategoriesModal, setIsSelectCategoriesModal] = useState(false);
  const [isAddTeamModal, setIsAddTeamModal]     = useState(false);
  const [isAddPlayerModal, setIsAddPlayerModal] = useState(false);

  const handleLoadGame = async () => {
    try {
      setIsLoading(true);
      const data = await loadGame(Number(id));
      setGame(data.game);
      setCategories(data.categories);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load game');
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    handleLoadGame()
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!game) return <div>Game not found</div>;

  return (
    <div className="max-w-xl mx-auto p-2 space-y-6">
      {/* Заголовок игры */}
      <h1 className="text-3xl font-bold text-center text-gray-900">{game.name}</h1>

      <div className='flex justify-between items-center'>
        <p>Categories: {selectedCategories.length}</p>
        <button
          className="w-full h-12 bg-blue-600 text-white text-base font-medium rounded-xl hover:bg-blue-700 transition-colors">
          <p>Select categories</p>
        </button>
      </div>


      <button className="w-full h-12 bg-blue-600 text-white text-base font-medium rounded-xl hover:bg-blue-700 transition-colors">
        Начать игру
      </button>

      {/* modals */}
      <SelectCategories
        isOpen={isSelectCategoriesModal}
        onClose={() => setIsSelectCategoriesModal(false)}
        categories={categories}
        onSelect={setSelectedCategories}
      />
    </div>
  );
}

export default GamePage;