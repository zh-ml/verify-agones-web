import type { GameData } from '../components/GameCard';

// 将mockData中的游戏数据转换为GameData类型
const convertToGameData = (games: any[]): GameData[] => {
  return games.map(game => ({
    id: game.id,
    title: game.title,
    description: game.shortDescription || game.description.substring(0, 100) + '...',
    imageUrl: game.coverImage,
    price: game.price,
    discountPrice: game.discountPrice,
    rating: game.rating,
    tags: game.tags,
    releaseDate: game.releaseDate
  }));
};

export { convertToGameData };