import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Game, loadGames } from '../../api/games';
import { toast } from 'react-toastify';

function GamesList() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadGames = async () => {
    try {
      setIsLoading(true);
      const data = await loadGames();
      setGames(data);
    } catch (err) {
      toast.error('Failed to load games');
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    handleLoadGames()
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <h2>Games list</h2>
        <Link to='/create-game'>Create game</Link>
      </div>
      <div className=''>
        {games.map((game) => (
          <Link to={`/game/${game.id}`} key={game.id}>
            <h2>#{game.id} {game.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GamesList;
