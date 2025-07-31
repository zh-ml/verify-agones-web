import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Tag, Rate, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../contexts/CartContext';

// 游戏数据接口
export interface GameData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  rating: number;
  tags: string[];
  releaseDate: string;
}

const CardContainer = styled(Link)`
  display: block;
  background-color: ${theme.colors.card};
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: transform ${theme.transitions.normal} ease, box-shadow ${theme.transitions.normal} ease;
  height: 100%;
  color: ${theme.colors.text.primary};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
    color: ${theme.colors.text.primary};
  }
`;

const GameImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: ${theme.space.sm};
  right: ${theme.space.sm};
  background-color: ${theme.colors.accent};
  color: white;
  font-weight: 600;
  padding: ${theme.space.xs} ${theme.space.sm};
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
`;

const CardContent = styled.div`
  padding: ${theme.space.md};
`;

const GameTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.space.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GameDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.space.sm};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 40px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space.xs};
  margin-bottom: ${theme.space.sm};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${theme.space.md};
`;

const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${theme.space.xs};
`;

const CurrentPrice = styled.span`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  text-decoration: line-through;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space.xs};
  margin-bottom: ${theme.space.sm};
`;

const RatingText = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
`;

interface GameCardProps {
  game: GameData;
  onAddToCart?: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onAddToCart }) => {
  const hasDiscount = game.discountPrice !== undefined && game.discountPrice < game.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((game.price - (game.discountPrice || 0)) / game.price) * 100) 
    : 0;
  
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // 只传递CartGame所需的属性
    addToCart({
      id: game.id,
      title: game.title,
      description: game.description,
      imageUrl: game.imageUrl,
      price: game.price,
      discountPrice: game.discountPrice
    });
    message.success(`已添加 ${game.title} 到购物车`);
    if (onAddToCart) {
      onAddToCart(game.id);
    }
  };
  
  return (
    <CardContainer to={`/games/${game.id}`}>
      <GameImage $imageUrl={game.imageUrl}>
        {hasDiscount && (
          <DiscountBadge>-{discountPercentage}%</DiscountBadge>
        )}
      </GameImage>
      <CardContent>
        <GameTitle>{game.title}</GameTitle>
        
        <RatingContainer>
          <Rate disabled defaultValue={game.rating} allowHalf style={{ fontSize: '14px' }} />
          <RatingText>({game.rating})</RatingText>
        </RatingContainer>
        
        <TagsContainer>
          {game.tags.slice(0, 3).map((tag, index) => (
            <Tag key={index} color={index === 0 ? theme.colors.primary : index === 1 ? theme.colors.secondary : theme.colors.accent}>
              {tag}
            </Tag>
          ))}
        </TagsContainer>
        
        <GameDescription>{game.description}</GameDescription>
        
        <PriceContainer>
          <Price>
            <CurrentPrice>¥{hasDiscount ? game.discountPrice : game.price}</CurrentPrice>
            {hasDiscount && <OriginalPrice>¥{game.price}</OriginalPrice>}
          </Price>
          
          <Button 
            type="primary" 
            shape="circle" 
            icon={<ShoppingCartOutlined />} 
            onClick={handleAddToCart}
          />
        </PriceContainer>
      </CardContent>
    </CardContainer>
  );
};

export default GameCard;