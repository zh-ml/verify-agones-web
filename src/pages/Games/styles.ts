import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Input, Select } from 'antd';

const { Search } = Input;

export const GamesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.space.xl} ${theme.space.md};
`;

export const PageHeader = styled.div`
  margin-bottom: ${theme.space.xl};
`;

export const PageTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.space.md};
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: ${theme.space.md};
  margin-bottom: ${theme.space.xl};
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const StyledSearch = styled(Search)`
  max-width: 400px;
  width: 100%;
`;

export const FilterSelect = styled(Select)`
  min-width: 150px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.space.xl};
  margin-bottom: ${theme.space.xl};
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;