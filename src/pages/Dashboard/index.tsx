import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Tabs, Card, Button, Statistic, Row, Col, Table, Badge, Space, Dropdown, Menu, Progress, Alert, Empty, message, Modal } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined, SettingOutlined, DeleteOutlined, DownOutlined, EyeOutlined, EditOutlined, CloudUploadOutlined, CloudDownloadOutlined, DownloadOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useServerStore } from '../../stores/serverStore';
import { type GameServerInfo } from '../../api/pod';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.space.xl} ${theme.space.md};
`;

const DashboardHeader = styled.div`
  margin-bottom: ${theme.space.xl};
`;

const DashboardTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.space.md};
`;

const StatsContainer = styled.div`
  margin-bottom: ${theme.space.xl};
`;

const ServerCard = styled(Card)`
  height: 100%;
  transition: transform ${theme.transitions.fast} ease, box-shadow ${theme.transitions.fast} ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.md};
  }
`;

const ServerImage = styled.div<{ $imageUrl: string }>`
  height: 140px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: ${theme.radii.md} ${theme.radii.md} 0 0;
  position: relative;
`;

const ServerStatusBadge = styled.div<{ $status: string }>`
  position: absolute;
  top: ${theme.space.sm};
  right: ${theme.space.sm};
  padding: ${theme.space.xs} ${theme.space.sm};
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: white;
  background-color: ${props => 
    props.$status === 'Allocated' ? theme.colors.success :
    props.$status === 'Ready' ? theme.colors.accent :
    props.$status === 'Scheduled' ? theme.colors.accent :
    props.$status === 'Unhealthy' ? theme.colors.error :
    '#6B7280'};
`;

const ServerContent = styled.div`
  padding: ${theme.space.md};
`;

const ServerName = styled.h3`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.space.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ServerMeta = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.space.sm};
  display: flex;
  justify-content: space-between;
`;

const ServerActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.space.md};
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: ${theme.space['2xl']} 0;
`;

// 游戏库样式已移至样式文件

const GameLibraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.space.lg};
`;

const GameLibraryTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  margin: 0;
`;

const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.space.lg};
`;

const SearchInput = styled.input`
  padding: ${theme.space.sm} ${theme.space.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  width: 300px;
  font-size: ${theme.fontSizes.md};
  
  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`;

// 模拟用户已购买的游戏数据
interface UserGameData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  rating: number;
  tags: string[];
  releaseDate: string;
  purchaseDate: string;
  playTime: number;
  lastPlayed: string;
}

const userGames: UserGameData[] = [
  {
    id: '1',
    title: 'Minecraft',
    description: '探索无限世界，建造从简单的房子到宏伟的城堡的一切事物。',
    imageUrl: 'https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg',
    price: 99,
    rating: 4.8,
    tags: ['沙盒', '生存', '多人'],
    releaseDate: '2011-11-18',
    purchaseDate: '2023-01-15',
    playTime: 120,
    lastPlayed: '2023-05-20'
  },
  {
    id: '3',
    title: 'Stardew Valley',
    description: '继承你祖父的旧农场，开始你的新生活。学习如何生活在土地上，种植庄稼，饲养动物，与当地社区交往。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg',
    price: 60,
    discountPrice: 48,
    rating: 4.9,
    tags: ['模拟', '角色扮演', '农场'],
    releaseDate: '2016-02-26',
    purchaseDate: '2023-02-10',
    playTime: 85,
    lastPlayed: '2023-05-15'
  },
  {
    id: '7',
    title: 'Elden Ring',
    description: '一款由FromSoftware开发的动作角色扮演游戏，玩家将在一个广阔的世界中探索，与强大的敌人战斗。',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    price: 298,
    discountPrice: 238,
    rating: 4.8,
    tags: ['动作', '角色扮演', '开放世界'],
    releaseDate: '2022-02-25',
    purchaseDate: '2023-03-05',
    playTime: 60,
    lastPlayed: '2023-05-10'
  },
];


// 模拟部署中的服务器数据
interface DeployingServerData {
  id: string;
  name: string;
  game: string;
  gameId: string;
  imageUrl: string;
  progress: number;
  status: 'deploying' | 'failed';
  createdAt: string;
  plan: string;
}

const deployingServers: DeployingServerData[] = [
  {
    id: 'dep-001',
    name: 'Valheim服务器',
    game: 'Valheim',
    gameId: '4',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/892970/header.jpg',
    progress: 75,
    status: 'deploying',
    createdAt: '2023-08-10',
    plan: '标准版',
  },
];

// 模拟账单数据
interface BillingData {
  id: string;
  serverId: string;
  serverName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
  period: string;
}

const billingData: BillingData[] = [
  {
    id: 'bill-001',
    serverId: 'srv-001',
    serverName: '我的世界生存服务器',
    amount: 40,
    status: 'paid',
    date: '2023-07-01',
    dueDate: '2023-07-15',
    period: '2023-07',
  },
  {
    id: 'bill-002',
    serverId: 'srv-002',
    serverName: '创造模式服务器',
    amount: 20,
    status: 'paid',
    date: '2023-07-01',
    dueDate: '2023-07-15',
    period: '2023-07',
  },
  {
    id: 'bill-003',
    serverId: 'srv-003',
    serverName: 'Terraria多人服务器',
    amount: 20,
    status: 'pending',
    date: '2023-08-01',
    dueDate: '2023-08-15',
    period: '2023-08',
  },
];

const DashboardPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUnmountedRef = useRef(false);
  const [now, setNow] = useState(Date.now());
  const [deleteGSVisible, setDeleteGSVisible] = useState(false);
  const [deleteGSId, setDeleteGSId] = useState('');

  const {
    servers,
    error,
    allocatedGameServers,
    fetchServers,
    startServer,
    stopServer,
    destroyServer,
    clearError
  } = useServerStore();
  
  // useEffect(() => {
  //   fetchServers('Allocated');
  // }, [fetchServers]);

  const fetchData = async () => {
    if (isUnmountedRef.current) return;
    fetchServers('Allocated');
    setNow(Date.now());
    timeoutRef.current = setTimeout(fetchData, 60000);
  };

  useEffect(() => {
    isUnmountedRef.current = false;
    fetchData(); // 初次调用
    return () => {
      isUnmountedRef.current = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log('清除 timeout');
      }
    };
  }, []);
  
  useEffect(() => {
    if (error) {
      message.error(error);
      clearError();
    }
  }, [error, clearError]);
  
  const handleServerAction = async (action: string, serverId: string) => {
    try {
      switch (action) {
        case 'start':
          await startServer(serverId);
          message.success('服务器启动成功');
          break;
        case 'stop':
          await stopServer(serverId);
          message.success('服务器停止成功');
          break;
        case 'destroy':
          console.log('准备弹出确认框');
          setDeleteGSVisible(true);
          setDeleteGSId(serverId);
            // Modal.confirm({
            //   title: '确认删除服务器',
            //   content: '删除后数据将无法恢复，确定要删除这个服务器吗？',
            //   icon: <ExclamationCircleOutlined />,
            //   okText: '确认删除',
            //   okType: 'danger',
            //   cancelText: '取消',
            //   onOk: async () => {
            //     await destroyServer(serverId);
            //     message.success('服务器删除成功');
            //   },
            // });
          break;
        default:
          console.log(`执行操作: ${action}，服务器ID: ${serverId}`);
      }
    } catch (err) {
      message.error(`操作失败: ${err}`);
    }
  };
  
  const handleCancelDeployment = (deploymentId: string) => {
    console.log(`取消部署: ${deploymentId}`);
    // 这里可以实现取消部署的逻辑
  };
  
  // const filteredServers = allocatedGameServers.filter(server => 
  //   server.name.toLowerCase().includes(searchText.toLowerCase()) ||
  //   server.gameName.toLowerCase().includes(searchText.toLowerCase())
  // );


  function formatDuration(start: string, end?: string): string {
    const startTime = new Date(start).getTime();
    const endTime = end ? new Date(end).getTime() : now;

    let diff = Math.max(0, endTime - startTime); // 毫秒差

    const totalMinutes = Math.floor(diff / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(days)}天:${pad(hours)}时:${pad(minutes)}分`;
  }
  
  const serverColumns: ColumnsType<GameServerInfo> = [
    {
      title: '服务器',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <div>{text}</div>
            <div style={{ fontSize: '12px', color: theme.colors.text.secondary }}>{record.name}</div>
          </div>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        let text = '';
        
        switch(status) {
          case 'Allocated':
            color = 'success';
            text = '运行中';
            break;
          case 'Ready':
            color = 'default';
            text = '已准备';
            break;
          case 'Scheduled':
            color = 'processing';
            text = '部署中';
            break;
          case 'Unhealthy':
            color = 'error';
            text = '不健康';
            break;
          default:
            color = 'default';
            text = '未知';
        }
        
        return <Badge status={color as any} text={text} />;
      },
    },
    {
      title: '最大玩家数',
      dataIndex: ['config', 'maxPlayers'],
      key: 'maxPlayers',
      render: (maxPlayers) => maxPlayers || '-',
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '配置',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: '运行时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render(startTime) {
        return formatDuration(startTime);
      },
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      render: (ip, record) => `${ip}:${record.port}`,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        const menu = (
          <Menu
            items={[
              {
                key: '1',
                label: '查看控制台',
                icon: <EyeOutlined />,
                onClick: () => handleServerAction('console', record.name),
              },
              {
                key: '2',
                label: '编辑设置',
                icon: <EditOutlined />,
                onClick: () => handleServerAction('edit', record.name),
              },
              {
                key: '3',
                label: '备份服务器',
                icon: <CloudUploadOutlined />,
                onClick: () => handleServerAction('backup', record.name),
              },
              {
                key: '4',
                label: '恢复备份',
                icon: <CloudDownloadOutlined />,
                onClick: () => handleServerAction('restore', record.name),
              },
              {
                type: 'divider',
              },
              {
                key: '5',
                label: '删除服务器',
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => handleServerAction('destroy', record.name),
              },
            ]}
          />
        );
        
        return (
          <Space size="middle">
            {record.status === 'Allocated' ? (
              <Button 
                icon={<PauseCircleOutlined />} 
                onClick={() => handleServerAction('stop', record.name)}
              >
                停止
              </Button>
            ) : record.status === 'Ready' ? (
              <Button 
                type="primary" 
                icon={<PlayCircleOutlined />} 
                onClick={() => handleServerAction('start', record.name)}
              >
                启动
              </Button>
            ) : record.status === 'Unhealthy' ? (
              <Button 
                icon={<ReloadOutlined />} 
                onClick={() => handleServerAction('restart', record.name)}
              >
                重启
              </Button>
            ) : (
              <Button disabled>
                {record.status === 'Scheduled' ? '部署中' : '停止中'}
              </Button>
            )}
            
            <Dropdown overlay={menu}>
              <Button>
                更多 <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];
  
  // const deployingColumns: ColumnsType<DeployingServerData> = [
  //   {
  //     title: '服务器',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: (text, record) => (
  //       <div style={{ display: 'flex', alignItems: 'center' }}>
  //         <img 
  //           src={record.imageUrl} 
  //           alt={record.game} 
  //           style={{ width: 40, height: 25, objectFit: 'cover', marginRight: 10, borderRadius: 4 }} 
  //         />
  //         <div>
  //           <div>{text}</div>
  //           <div style={{ fontSize: '12px', color: theme.colors.text.secondary }}>{record.game}</div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: '状态',
  //     dataIndex: 'status',
  //     key: 'status',
  //     render: (status) => {
  //       return status === 'deploying' ? 
  //         <Badge status="processing" text="部署中" /> : 
  //         <Badge status="error" text="部署失败" />;
  //     },
  //   },
  //   {
  //     title: '进度',
  //     dataIndex: 'progress',
  //     key: 'progress',
  //     render: (progress) => <Progress percent={progress} size="small" />,
  //   },
  //   {
  //     title: '配置',
  //     dataIndex: 'plan',
  //     key: 'plan',
  //   },
  //   {
  //     title: '创建时间',
  //     dataIndex: 'createdAt',
  //     key: 'createdAt',
  //   },
  //   {
  //     title: '操作',
  //     key: 'action',
  //     render: (_, record) => (
  //       <Button 
  //         danger 
  //         onClick={() => handleCancelDeployment(record.id)}
  //         disabled={record.progress > 90}
  //       >
  //         取消部署
  //       </Button>
  //     ),
  //   },
  // ];
  
  const billingColumns: ColumnsType<BillingData> = [
    {
      title: '账单ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '服务器',
      dataIndex: 'serverName',
      key: 'serverName',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        let text = '';
        
        switch(status) {
          case 'paid':
            color = 'success';
            text = '已支付';
            break;
          case 'pending':
            color = 'processing';
            text = '待支付';
            break;
          case 'overdue':
            color = 'error';
            text = '已逾期';
            break;
          default:
            color = 'default';
            text = '未知';
        }
        
        return <Badge status={color as any} text={text} />;
      },
    },
    {
      title: '账单日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '到期日',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: '账单周期',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <Button type="primary">支付</Button>
          )}
          <Button>查看详情</Button>
        </Space>
      ),
    },
  ];
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '我的服务器',
      children: (
        <>
          <StatsContainer>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic title="总服务器数" value={servers.length} />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic 
                    title="在线服务器" 
                    value={allocatedGameServers.filter(s => s.status === 'Allocated').length} 
                    valueStyle={{ color: theme.colors.success }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic 
                    title="在线玩家" 
                    value={servers.reduce((acc, server) => acc + (server.config.maxPlayers || 0), 0)} 
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic 
                    title="部署中"
                    value={allocatedGameServers.filter(s => s.status === 'Scheduled').length}
                    valueStyle={{ color: theme.colors.primary }}
                  />
                </Card>
              </Col>
            </Row>
          </StatsContainer>
          
          <TableActions>
            <SearchInput 
              placeholder="搜索服务器..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="primary">
              <Link to="/games">部署新服务器</Link>
            </Button>
          </TableActions>
          
          {allocatedGameServers.length > 0 ? (
            <Table 
              columns={serverColumns} 
              dataSource={allocatedGameServers.map(server => ({ ...server, key: server.name }))} 
              pagination={false}
            />
          ) : (
            <EmptyStateContainer>
              <Empty 
                description={
                  <span>
                    没有找到匹配的服务器
                    {searchText && ` - "${searchText}"`}
                  </span>
                }
              />
            </EmptyStateContainer>
          )}
          
          {/* {deployingServers.length > 0 && (
            <>
              <h2 style={{ margin: '30px 0 20px' }}>部署中的服务器</h2>
              <Table 
                columns={deployingColumns} 
                dataSource={deployingServers.map(server => ({ ...server, key: server.id }))} 
                pagination={false}
              />
            </>
          )} */}
        </>
      ),
    },
    {
      key: '2',
      label: '服务器卡片视图',
      children: (
        <>
          <TableActions>
            <SearchInput 
              placeholder="搜索服务器..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="primary">
              <Link to="/games">部署新服务器</Link>
            </Button>
          </TableActions>
          
          {allocatedGameServers.length > 0 ? (
            <Row gutter={[16, 16]}>
              {allocatedGameServers.map(server => (
                <Col xs={24} sm={12} md={8} lg={6} key={server.name}>
                  <ServerCard hoverable>
                    <ServerImage $imageUrl="https://via.placeholder.com/300x140">
                      <ServerStatusBadge $status={server.status}>
                        {server.status === 'Allocated' ? '运行中' : 
                         server.status === 'Ready' ? '已停止' : 
                         server.status === 'Scheduled' ? '部署中' : 
                         server.status === 'Unhealthy' ? '错误' : '未知'}
                      </ServerStatusBadge>
                    </ServerImage>
                    <ServerContent>
                      <ServerName>{server.name}</ServerName>
                      <ServerMeta>
                        <span>{server.name}</span>
                        <span>版本信息</span>
                      </ServerMeta>
                      {/* <div>
                        <Tag color="blue">{server.config.plan}</Tag>
                        <Tag>{`最大 ${server.config.maxPlayers} 玩家`}</Tag>
                      </div> */}
                      <ServerActions>
                        {server.status === 'Allocated' ? (
                          <Button 
                            icon={<PauseCircleOutlined />} 
                            onClick={() => handleServerAction('stop', server.name)}
                          >
                            停止
                          </Button>
                        ) : server.status === 'Ready' ? (
                          <Button 
                            type="primary" 
                            icon={<PlayCircleOutlined />} 
                            onClick={() => handleServerAction('start', server.name)}
                          >
                            启动
                          </Button>
                        ) : (
                          <Button disabled>
                            {server.status === 'Scheduled' ? '部署中' : 
                             server.status === 'Unhealthy' ? '错误' : '重启'}
                          </Button>
                        )}
                        <Button icon={<SettingOutlined />}>
                          <Link to={`/dashboard/server/${server.name}`}>管理</Link>
                        </Button>
                      </ServerActions>
                    </ServerContent>
                  </ServerCard>
                </Col>
              ))}
              
              {deployingServers.map(server => (
                <Col xs={24} sm={12} md={8} lg={6} key={server.name}>
                  <ServerCard hoverable>
                    <ServerImage $imageUrl={server.imageUrl}>
                      <ServerStatusBadge $status="Scheduled">
                        部署中
                      </ServerStatusBadge>
                    </ServerImage>
                    <ServerContent>
                      <ServerName>{server.name}</ServerName>
                      <ServerMeta>
                        <span>{server.game}</span>
                        <span>{server.plan}</span>
                      </ServerMeta>
                      <Progress percent={server.progress} status="active" />
                      <ServerActions>
                        <Button 
                          danger 
                          onClick={() => handleCancelDeployment(server.id)}
                          disabled={server.progress > 90}
                        >
                          取消部署
                        </Button>
                        <span></span>
                      </ServerActions>
                    </ServerContent>
                  </ServerCard>
                </Col>
              ))}
            </Row>
          ) : (
            <EmptyStateContainer>
              <Empty 
                description={
                  <span>
                    没有找到匹配的服务器
                    {searchText && ` - "${searchText}"`}
                  </span>
                }
              />
            </EmptyStateContainer>
          )}
        </>
      ),
    },
    {
      key: '3',
      label: '游戏库',
      children: (
        <>
          <GameLibraryHeader>
            <GameLibraryTitle>我的游戏</GameLibraryTitle>
            <Button type="primary" icon={<DownloadOutlined />}>
              <Link to="/games">获取更多游戏</Link>
            </Button>
          </GameLibraryHeader>
          
          {userGames.length > 0 ? (
            <Row gutter={[24, 24]}>
              {userGames.map(game => (
                <Col xs={24} sm={12} md={8} lg={6} key={game.id}>
                  <Card
                    hoverable
                    cover={<img alt={game.title} src={game.imageUrl} />}
                  >
                    <Card.Meta 
                      title={game.title}
                      description={
                        <>
                          <div>{game.tags.join(' · ')}</div>
                          <div>游戏时间: {game.playTime}小时</div>
                          <div>最后游玩: {game.lastPlayed}</div>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <EmptyStateContainer>
              <Empty 
                description="您的游戏库中还没有游戏"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
              <Button type="primary" style={{ marginTop: theme.space.md }}>
                <Link to="/games">浏览游戏</Link>
              </Button>
            </EmptyStateContainer>
          )}
        </>
      ),
    },
    {
      key: '4',
      label: '账单',
      children: (
        <>
          <Alert
            message="账单提醒"
            description="您有1个待支付账单，请及时支付以确保服务器正常运行。"
            type="info"
            showIcon
            style={{ marginBottom: theme.space.xl }}
          />
          
          <Table 
            columns={billingColumns} 
            dataSource={billingData.map(bill => ({ ...bill, key: bill.id }))} 
            pagination={false}
          />
        </>
      ),
    },
  ];
  
  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>控制台</DashboardTitle>
      </DashboardHeader>
      
      <Tabs defaultActiveKey="1" items={items} />
      {/* 状态控制的测试 Modal */}
      <Modal
        title="确认删除服务器"
        open={deleteGSVisible}
        okText='确认删除'
        okType='danger'
        cancelText='取消'
        onOk={async () => {
          await destroyServer(deleteGSId);
          setDeleteGSVisible(false);
          setDeleteGSId('');
          console.log(deleteGSId+' 服务器删除成功!');
          message.success(deleteGSId+' 服务器删除成功!');
        }}
        onCancel={() => {
          setDeleteGSVisible(false);
          setDeleteGSId('');
          console.log('State Modal cancelled');
        }}
        centered
        // zIndex={1000}
      >
        <p>警告:</p>
        <div style={{ marginBottom: '16px' }} />
        <p>&nbsp;&nbsp;确定删除服务器：{deleteGSId}？</p>
        <p>&nbsp;&nbsp;删除后将无法恢复，请谨慎操作。</p>
      </Modal>
    </DashboardContainer>
  );
};

export default DashboardPage;