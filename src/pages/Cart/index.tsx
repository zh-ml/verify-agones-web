import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useCart } from '../../contexts/CartContext';
import { Button, Table, InputNumber, Empty, Card, Row, Col, Divider, Modal, message } from 'antd';
import { DeleteOutlined, ShoppingOutlined, RocketOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.space.xl};
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.space.lg};
  color: ${theme.colors.text.primary};
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.space.xl} 0;
`;

const GameImage = styled.img`
  width: 80px;
  height: 45px;
  object-fit: cover;
  border-radius: ${theme.radii.md};
`;

const GameTitle = styled.div`
  font-weight: 600;
  margin-left: ${theme.space.md};
`;

const PriceText = styled.span`
  color: ${theme.colors.primary};
  font-weight: 600;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${theme.colors.text.secondary};
  margin-left: ${theme.space.sm};
  font-size: ${theme.fontSizes.sm};
`;

const SummaryCard = styled(Card)`
  position: sticky;
  top: 100px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.space.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TotalRow = styled(SummaryRow)`
  font-weight: 600;
  font-size: ${theme.fontSizes.lg};
  margin-top: ${theme.space.md};
  padding-top: ${theme.space.md};
  border-top: 1px solid ${theme.colors.border};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.md};
  margin-top: ${theme.space.lg};
`;

interface DataType {
  key: string;
  game: {
    id: string;
    title: string;
    imageUrl: string;
  };
  price: {
    current: number;
    original?: number;
  };
  quantity: number;
}

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // 表格列定义
  const columns: ColumnsType<DataType> = [
    {
      title: '游戏',
      dataIndex: 'game',
      key: 'game',
      render: (game) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <GameImage src={game.imageUrl} alt={game.title} />
          <GameTitle>{game.title}</GameTitle>
        </div>
      ),
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <div>
          <PriceText>¥{price.current}</PriceText>
          {price.original && <OriginalPrice>¥{price.original}</OriginalPrice>}
        </div>
      ),
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          max={10}
          value={record.quantity}
          onChange={(value) => updateQuantity(record.game.id, value || 1)}
        />
      ),
    },
    {
      title: '小计',
      key: 'subtotal',
      render: (_, record) => (
        <PriceText>¥{(record.price.current * record.quantity).toFixed(2)}</PriceText>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeFromCart(record.game.id)}
        >
          删除
        </Button>
      ),
    },
  ];
  
  // 将购物车项转换为表格数据
  const data: DataType[] = cartItems.map(item => ({
    key: item.id,
    game: {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
    },
    price: {
      current: item.discountPrice || item.price,
      original: item.discountPrice ? item.price : undefined,
    },
    quantity: item.quantity,
  }));
  
  // 处理结算
  const handleCheckout = () => {
    setCheckoutModalVisible(true);
  };
  
  // 确认结算，跳转到部署页面
  const confirmCheckout = () => {
    setLoading(true);
    
    // 模拟支付处理
    setTimeout(() => {
      setLoading(false);
      setCheckoutModalVisible(false);
      
      // 如果只有一个游戏，直接跳转到部署页面
      if (cartItems.length === 1) {
        const gameId = cartItems[0].id;
        clearCart();
        // 传递fromPayment状态，表示从购物车支付成功后跳转
        navigate(`/deployment/${gameId}`, { state: { fromPayment: true } });
      } else {
        // 如果有多个游戏，显示提示并清空购物车
        message.success('支付成功！请前往控制台查看您的游戏');
        clearCart();
        navigate('/dashboard');
      }
    }, 1500);
  };
  
  // 如果购物车为空，显示空状态
  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <PageTitle>购物车</PageTitle>
        <EmptyCartContainer>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="您的购物车是空的"
          />
          <Button 
            type="primary" 
            icon={<ShoppingOutlined />} 
            size="large"
            style={{ marginTop: theme.space.lg }}
            onClick={() => navigate('/games')}
          >
            去选购游戏
          </Button>
        </EmptyCartContainer>
      </CartContainer>
    );
  }
  
  return (
    <CartContainer>
      <PageTitle>购物车</PageTitle>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Table 
            columns={columns} 
            dataSource={data} 
            pagination={false}
            rowKey="key"
          />
          
          <div style={{ marginTop: theme.space.md, textAlign: 'right' }}>
            <Button onClick={clearCart}>清空购物车</Button>
          </div>
        </Col>
        
        <Col xs={24} lg={8}>
          <SummaryCard title="订单摘要">
            <SummaryRow>
              <span>商品总价</span>
              <span>¥{totalPrice.toFixed(2)}</span>
            </SummaryRow>
            
            <Divider style={{ margin: `${theme.space.md} 0` }} />
            
            <TotalRow>
              <span>应付总额</span>
              <PriceText>¥{totalPrice.toFixed(2)}</PriceText>
            </TotalRow>
            
            <ActionButtons>
              <Button 
                type="primary" 
                size="large" 
                block 
                icon={<RocketOutlined />}
                onClick={handleCheckout}
              >
                结算
              </Button>
              
              <Button 
                size="large" 
                block
                onClick={() => navigate('/games')}
              >
                继续购物
              </Button>
            </ActionButtons>
          </SummaryCard>
        </Col>
      </Row>
      
      <Modal
        title="确认支付"
        open={checkoutModalVisible}
        onCancel={() => setCheckoutModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setCheckoutModalVisible(false)}>
            取消
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={loading} 
            onClick={confirmCheckout}
          >
            确认支付
          </Button>,
        ]}
      >
        <div style={{ marginBottom: '16px' }}>
          <h4>游戏费用</h4>
          <ul style={{ marginBottom: '16px' }}>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.title} x {item.quantity} - ¥{((item.discountPrice || item.price) * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ marginBottom: '16px' }}>
           <h4>服务器配置费用（可选方案）</h4>
           <div style={{ marginBottom: '16px' }}>
             <p style={{ fontWeight: '500', marginBottom: '8px' }}>基础方案：</p>
             <ul style={{ marginLeft: '16px', marginBottom: '12px' }}>
               <li>CPU (2核) + 内存 (4GB) - ¥40/月</li>
               <li>存储 (20GB) - ¥10/月</li>
               <li>带宽 (10Mbps) - ¥2/月</li>
             </ul>
             <p style={{ fontWeight: '500', marginBottom: '8px' }}>标准方案：</p>
             <ul style={{ marginLeft: '16px', marginBottom: '12px' }}>
               <li>CPU (4核) + 内存 (8GB) - ¥80/月</li>
               <li>存储 (50GB) - ¥25/月</li>
               <li>带宽 (20Mbps) - ¥4/月</li>
             </ul>
             <p style={{ fontWeight: '500', marginBottom: '8px' }}>高级方案：</p>
             <ul style={{ marginLeft: '16px', marginBottom: '12px' }}>
               <li>CPU (8核) + 内存 (16GB) - ¥160/月</li>
               <li>存储 (100GB) - ¥50/月</li>
               <li>带宽 (50Mbps) - ¥10/月</li>
             </ul>
           </div>
           <p style={{ color: '#666', fontSize: '12px', margin: '8px 0' }}>
             * 以上为预设方案，您可以在部署时选择或自定义配置，价格将根据实际配置计算
           </p>
         </div>
        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
           <p><strong>游戏总费用：<PriceText>¥{totalPrice.toFixed(2)}</PriceText></strong></p>
           <p><strong>预估月度服务器费用：<PriceText>¥52 - ¥220/月</PriceText></strong></p>
           <p style={{ color: '#666', fontSize: '12px' }}>支付成功后，您可以立即部署游戏服务器并选择配置方案。</p>
         </div>
      </Modal>
    </CartContainer>
  );
};

export default CartPage;