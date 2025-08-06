import React, { useState } from 'react';
import { Row, Col, Select, Pagination, Empty, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import GameCard from '../../components/GameCard';
import { games as mockGames } from '../../utils/mockData';
import { convertToGameData } from '../../utils/common';
import {
  GamesContainer,
  PageHeader,
  PageTitle,
  FilterContainer,
  StyledSearch,
  FilterSelect,
  PaginationContainer,
  EmptyContainer,
  LoadingContainer
} from './styles';

const { Option } = Select;

const GamesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterTag, setFilterTag] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);
  const pageSize = 12;

  // 转换游戏数据
  const gameData = convertToGameData(mockGames);
  
  // 过滤和排序游戏
  const filteredGames = gameData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === 'all' || game.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });
  
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    } else if (sortBy === 'price-low') {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      return priceA - priceB;
    } else if (sortBy === 'price-high') {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      return priceB - priceA;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });
  
  // 分页
  const paginatedGames = sortedGames.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
  // 获取所有标签
  const allTags = Array.from(new Set(gameData.flatMap(game => game.tags)));
  

  
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  
  const handleSortChange = (value: unknown) => {
    setSortBy(value as string);
    setCurrentPage(1);
  };
  
  const handleTagChange = (value: unknown) => {
    setFilterTag(value as string);
    setCurrentPage(1);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <GamesContainer>
      <PageHeader>
        <PageTitle>游戏库</PageTitle>
      </PageHeader>
      
      <FilterContainer>
        <StyledSearch 
          placeholder="搜索游戏" 
          allowClear 
          enterButton={<SearchOutlined />} 
          size="large" 
          onSearch={handleSearch}
        />
        
        <FilterSelect
          placeholder="排序方式"
          size="large"
          defaultValue="newest"
          onChange={handleSortChange}
        >
          <Option value="newest">最新发布</Option>
          <Option value="price-low">价格从低到高</Option>
          <Option value="price-high">价格从高到低</Option>
          <Option value="rating">评分最高</Option>
        </FilterSelect>
        
        <FilterSelect
          placeholder="游戏类型"
          size="large"
          defaultValue="all"
          onChange={handleTagChange}
        >
          <Option value="all">全部类型</Option>
          {allTags.map(tag => (
            <Option key={tag} value={tag}>{tag}</Option>
          ))}
        </FilterSelect>
      </FilterContainer>
      
      {loading ? (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      ) : paginatedGames.length > 0 ? (
        <>
          <Row gutter={[24, 24]}>
            {paginatedGames.map(game => (
              <Col xs={24} sm={12} md={8} lg={6} key={game.id}>
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
          
          <PaginationContainer>
            <Pagination 
              current={currentPage} 
              total={filteredGames.length} 
              pageSize={pageSize} 
              onChange={handlePageChange} 
              showSizeChanger={false}
            />
          </PaginationContainer>
        </>
      ) : (
        <EmptyContainer>
          <Empty description="没有找到符合条件的游戏" />
        </EmptyContainer>
      )}
    </GamesContainer>
  );
};

export default GamesPage;