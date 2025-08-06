// 模拟数据用于网站展示

export interface Game {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  screenshots: string[];
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  rating: number;
  tags: string[];
  releaseDate: string;
  developer: string;
  publisher: string;
  systemRequirements: {
    minimum: SystemRequirement;
    recommended: SystemRequirement;
  };
  features: string[];
  deploymentOptions: DeploymentOption[];
  gameVersions: GameVersion[];
}

export interface SystemRequirement {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
  network: string;
}

export interface DeploymentOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  specs: {
    cpu: string;
    memory: string;
    storage: string;
    bandwidth: string;
  };
}

export interface ServerInstance {
  id: string;
  gameId: string;
  gameTitle: string;
  version: string;
  status: 'running' | 'stopped' | 'deploying' | 'error';
  deploymentDate: string;
  lastActive: string;
  specs: {
    cpu: string;
    memory: string;
    storage: string;
    bandwidth: string;
  };
  cost: {
    hourly: number;
    monthly: number;
  };
  ipAddress: string;
  region: string;
  uptime: number; // 以小时为单位
}

export interface GameVersion {
  value: string;
  label: string;
  name: string;
}

// 模拟游戏数据
export const games: Game[] = [
  {
    id: 'game-001',
    title: '星际探险',
    description: '《星际探险》是一款开放世界太空探索游戏，玩家将扮演一名星际探险家，探索未知的星系、发现新的行星、与外星文明互动，并建立自己的太空殖民地。游戏采用最新的图形技术，呈现出令人惊叹的宇宙景观和行星环境。玩家可以驾驶各种太空飞船，进行资源采集、太空战斗和行星探索。游戏还包含丰富的剧情任务和随机事件，确保每次游戏体验都是独特的。',
    shortDescription: '探索浩瀚宇宙，发现未知文明，建立属于你的星际帝国。',
    coverImage: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=1470&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1537420327992-d6e192287183?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1445713305783-c9d632fca0b9?q=80&w=1374&auto=format&fit=crop'
    ],
    price: 299,
    discountPrice: 239,
    discountPercentage: 20,
    rating: 4.8,
    tags: ['太空', '探索', '开放世界', '科幻', '多人游戏'],
    releaseDate: '2023-05-15',
    developer: '星辰工作室',
    publisher: '银河游戏',
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
        storage: '50 GB 可用空间',
        network: '宽带互联网连接'
      },
      recommended: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i7-8700K / AMD Ryzen 7 3700X',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce RTX 2070 / AMD Radeon RX 5700 XT',
        storage: '50 GB SSD',
        network: '宽带互联网连接'
      }
    },
    features: [
      '开放世界探索',
      '多人在线模式',
      '飞船自定义',
      '行星殖民',
      '太空战斗',
      '资源采集与贸易',
      '外星文明互动'
    ],
    deploymentOptions: [
      {
        id: 'deploy-001',
        name: '标准版',
        description: '适合小型服务器或个人游戏，最多支持10名玩家同时在线',
        basePrice: 49.99,
        specs: {
          cpu: '4核',
          memory: '8GB',
          storage: '100GB SSD',
          bandwidth: '10Mbps'
        }
      },
      {
        id: 'deploy-002',
        name: '高级版',
        description: '适合中型服务器，最多支持50名玩家同时在线，提供更好的游戏体验',
        basePrice: 99.99,
        specs: {
          cpu: '8核',
          memory: '16GB',
          storage: '200GB SSD',
          bandwidth: '100Mbps'
        }
      },
      {
        id: 'deploy-003',
        name: '专业版',
        description: '适合大型服务器或专业游戏社区，最多支持200名玩家同时在线，提供最佳游戏体验',
        basePrice: 199.99,
        specs: {
          cpu: '16核',
          memory: '32GB',
          storage: '500GB SSD',
          bandwidth: '1Gbps'
        }
      }
    ],
    gameVersions: [
      { value: '1.21.7', label: 'xxxxxx 1.21.7', name: 'xxxxxx-1.21.7' },
      { value: '1.21.6', label: 'xxxxxx 1.21.6', name: 'xxxxxx-1.21.6' },
      { value: '1.21.5', label: 'xxxxxx 1.21.5', name: 'xxxxxx-1.21.5' },
      { value: '1.21.4', label: 'xxxxxx 1.21.4', name: 'xxxxxx-1.21.4' },
    ]
  },
  {
    id: 'game-002',
    title: '魔法王国',
    description: '《魔法王国》是一款奇幻角色扮演游戏，玩家将在一个充满魔法和神秘生物的世界中冒险。游戏拥有精美的画面和引人入胜的剧情，玩家可以选择不同的种族和职业，学习各种魔法技能，完成各种任务，与强大的敌人战斗。游戏还包含丰富的社交系统，玩家可以组队探险、交易物品、参加公会活动等。',
    shortDescription: '踏入魔法世界，成为传奇法师，与邪恶势力展开史诗级对决。',
    coverImage: 'https://images.unsplash.com/photo-1514994162322-3e95d282cd89?q=80&w=1470&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1384&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1498&auto=format&fit=crop'
    ],
    price: 199,
    rating: 4.5,
    tags: ['角色扮演', '奇幻', '魔法', '多人游戏', '开放世界'],
    releaseDate: '2023-02-28',
    developer: '奇幻工作室',
    publisher: '魔法游戏',
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i3-6100 / AMD Ryzen 3 1200',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 960 2GB / AMD Radeon R9 380 2GB',
        storage: '40 GB 可用空间',
        network: '宽带互联网连接'
      },
      recommended: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1660 / AMD Radeon RX 590',
        storage: '40 GB SSD',
        network: '宽带互联网连接'
      }
    },
    features: [
      '丰富的职业选择',
      '深度魔法系统',
      '开放世界探索',
      '多人在线模式',
      '公会系统',
      '装备制作',
      '宠物系统'
    ],
    deploymentOptions: [
      {
        id: 'deploy-004',
        name: '标准版',
        description: '适合小型服务器或个人游戏，最多支持20名玩家同时在线',
        basePrice: 39.99,
        specs: {
          cpu: '4核',
          memory: '8GB',
          storage: '80GB SSD',
          bandwidth: '10Mbps'
        }
      },
      {
        id: 'deploy-005',
        name: '高级版',
        description: '适合中型服务器，最多支持100名玩家同时在线，提供更好的游戏体验',
        basePrice: 79.99,
        specs: {
          cpu: '8核',
          memory: '16GB',
          storage: '160GB SSD',
          bandwidth: '100Mbps'
        }
      },
      {
        id: 'deploy-006',
        name: '专业版',
        description: '适合大型服务器或专业游戏社区，最多支持500名玩家同时在线，提供最佳游戏体验',
        basePrice: 159.99,
        specs: {
          cpu: '16核',
          memory: '32GB',
          storage: '320GB SSD',
          bandwidth: '1Gbps'
        }
      }
    ],
    gameVersions: [
      { value: '1.21.7', label: 'xxxxxx 1.21.7', name: 'xxxxxx-1.21.7' },
      { value: '1.21.6', label: 'xxxxxx 1.21.6', name: 'xxxxxx-1.21.6' },
      { value: '1.21.5', label: 'xxxxxx 1.21.5', name: 'xxxxxx-1.21.5' },
      { value: '1.21.4', label: 'xxxxxx 1.21.4', name: 'xxxxxx-1.21.4' },
    ]
  },
  {
    id: 'game-003',
    title: '赛车传奇',
    description: '《赛车传奇》是一款高度真实的赛车模拟游戏，玩家可以驾驶各种真实世界中的赛车，在全球各地的著名赛道上竞速。游戏采用先进的物理引擎，模拟真实的驾驶体验，包括天气变化、轮胎磨损、燃油消耗等因素。玩家可以参加各种比赛模式，包括单圈计时、锦标赛、耐力赛等，还可以自定义赛车的外观和性能。',
    shortDescription: '体验极速激情，驾驶梦想座驾，征服世界顶级赛道。',
    coverImage: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=1470&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1526550517342-e086b387edda?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1483&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop'
    ],
    price: 249,
    discountPrice: 199,
    discountPercentage: 20,
    rating: 4.7,
    tags: ['赛车', '模拟', '竞速', '多人游戏', '真实物理'],
    releaseDate: '2023-08-10',
    developer: '速度工作室',
    publisher: '赛车游戏',
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i5-4590 / AMD Ryzen 3 1300X',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 970 / AMD Radeon R9 290',
        storage: '60 GB 可用空间',
        network: '宽带互联网连接'
      },
      recommended: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i7-7700K / AMD Ryzen 5 3600X',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700',
        storage: '60 GB SSD',
        network: '宽带互联网连接'
      }
    },
    features: [
      '真实物理引擎',
      '全球著名赛道',
      '多种比赛模式',
      '车辆自定义',
      '动态天气系统',
      '多人在线比赛',
      '职业生涯模式'
    ],
    deploymentOptions: [
      {
        id: 'deploy-007',
        name: '标准版',
        description: '适合小型比赛或个人游戏，最多支持16名玩家同时在线',
        basePrice: 59.99,
        specs: {
          cpu: '4核',
          memory: '8GB',
          storage: '120GB SSD',
          bandwidth: '20Mbps'
        }
      },
      {
        id: 'deploy-008',
        name: '高级版',
        description: '适合中型比赛，最多支持32名玩家同时在线，提供更好的游戏体验',
        basePrice: 119.99,
        specs: {
          cpu: '8核',
          memory: '16GB',
          storage: '240GB SSD',
          bandwidth: '100Mbps'
        }
      },
      {
        id: 'deploy-009',
        name: '专业版',
        description: '适合大型比赛或电子竞技，最多支持64名玩家同时在线，提供最佳游戏体验',
        basePrice: 239.99,
        specs: {
          cpu: '16核',
          memory: '32GB',
          storage: '480GB SSD',
          bandwidth: '1Gbps'
        }
      }
    ],
    gameVersions: [
      { value: '1.21.7', label: 'xxxxxx 1.21.7', name: 'xxxxxx-1.21.7' },
      { value: '1.21.6', label: 'xxxxxx 1.21.6', name: 'xxxxxx-1.21.6' },
      { value: '1.21.5', label: 'xxxxxx 1.21.5', name: 'xxxxxx-1.21.5' },
      { value: '1.21.4', label: 'xxxxxx 1.21.4', name: 'xxxxxx-1.21.4' },
    ]
  },
  {
    id: 'game-004',
    title: '战术指挥官',
    description: '《战术指挥官》是一款实时战略游戏，玩家将扮演一名军事指挥官，指挥部队在各种战场上作战。游戏包含丰富的单位类型和战术选择，玩家需要考虑地形、天气、补给等因素，制定最佳的战略计划。游戏提供多种游戏模式，包括战役模式、挑战模式和多人对战模式，玩家可以与AI或其他玩家一较高下。',
    shortDescription: '指挥千军万马，运筹帷幄之中，决胜千里之外。',
    coverImage: 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=1471&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1508026990909-1a3f7f7ba33f?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1569017388730-020b5f80a004?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562751362-404243c2eea3?q=80&w=1374&auto=format&fit=crop'
    ],
    price: 179,
    rating: 4.6,
    tags: ['策略', '战争', '实时战略', '多人游戏', '军事'],
    releaseDate: '2023-03-20',
    developer: '战略工作室',
    publisher: '指挥游戏',
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i3-4160 / AMD Ryzen 3 1200',
        memory: '6 GB RAM',
        graphics: 'NVIDIA GeForce GTX 750 Ti / AMD Radeon R7 360',
        storage: '30 GB 可用空间',
        network: '宽带互联网连接'
      },
      recommended: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i5-6600 / AMD Ryzen 5 1600',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1050 Ti / AMD Radeon RX 570',
        storage: '30 GB SSD',
        network: '宽带互联网连接'
      }
    },
    features: [
      '丰富的单位类型',
      '多样化的地图和地形',
      '深度战术系统',
      '多人在线对战',
      '战役模式',
      '挑战模式',
      '单位升级系统'
    ],
    deploymentOptions: [
      {
        id: 'deploy-010',
        name: '标准版',
        description: '适合小型对战或个人游戏，最多支持8名玩家同时在线',
        basePrice: 29.99,
        specs: {
          cpu: '2核',
          memory: '4GB',
          storage: '60GB SSD',
          bandwidth: '5Mbps'
        }
      },
      {
        id: 'deploy-011',
        name: '高级版',
        description: '适合中型对战，最多支持16名玩家同时在线，提供更好的游戏体验',
        basePrice: 59.99,
        specs: {
          cpu: '4核',
          memory: '8GB',
          storage: '120GB SSD',
          bandwidth: '20Mbps'
        }
      },
      {
        id: 'deploy-012',
        name: '专业版',
        description: '适合大型对战或电子竞技，最多支持32名玩家同时在线，提供最佳游戏体验',
        basePrice: 119.99,
        specs: {
          cpu: '8核',
          memory: '16GB',
          storage: '240GB SSD',
          bandwidth: '100Mbps'
        }
      }
    ],
    gameVersions: [
      { value: '1.21.7', label: 'xxxxxx 1.21.7', name: 'xxxxxx-1.21.7' },
      { value: '1.21.6', label: 'xxxxxx 1.21.6', name: 'xxxxxx-1.21.6' },
      { value: '1.21.5', label: 'xxxxxx 1.21.5', name: 'xxxxxx-1.21.5' },
      { value: '1.21.4', label: 'xxxxxx 1.21.4', name: 'xxxxxx-1.21.4' },
    ]
  },
  {
    id: 'game-005',
    title: '城市建设者',
    description: '《城市建设者》是一款城市模拟游戏，玩家将扮演一名城市规划师，从一片空地开始，建设和管理一座繁荣的城市。游戏包含丰富的建筑类型和城市服务，玩家需要平衡预算、满足市民需求、解决交通问题、应对自然灾害等挑战。游戏采用先进的模拟系统，市民的行为和城市的发展都会受到玩家决策的影响。',
    shortDescription: '规划完美城市，管理基础设施，创造繁荣都市。',
    coverImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1544&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1455&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1444&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1470&auto=format&fit=crop'
    ],
    price: 149,
    discountPrice: 119,
    discountPercentage: 20,
    rating: 4.5,
    tags: ['模拟', '建设', '管理', '沙盒', '策略'],
    releaseDate: '2023-06-05',
    developer: '建设工作室',
    publisher: '城市游戏',
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i3-3220 / AMD Ryzen 3 1200',
        memory: '4 GB RAM',
        graphics: 'NVIDIA GeForce GTX 660 / AMD Radeon R7 370',
        storage: '20 GB 可用空间',
        network: '宽带互联网连接'
      },
      recommended: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i5-4670 / AMD Ryzen 5 1500X',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1060 / AMD Radeon RX 580',
        storage: '20 GB SSD',
        network: '宽带互联网连接'
      }
    },
    features: [
      '详细的城市规划',
      '复杂的经济系统',
      '真实的交通模拟',
      '自然灾害',
      '政策系统',
      '区域特色',
      '地形编辑'
    ],
    deploymentOptions: [
      {
        id: 'deploy-013',
        name: '标准版',
        description: '适合小型城市或个人游戏，最多支持5000名市民',
        basePrice: 19.99,
        specs: {
          cpu: '2核',
          memory: '4GB',
          storage: '40GB SSD',
          bandwidth: '5Mbps'
        }
      },
      {
        id: 'deploy-014',
        name: '高级版',
        description: '适合中型城市，最多支持50000名市民，提供更好的游戏体验',
        basePrice: 39.99,
        specs: {
          cpu: '4核',
          memory: '8GB',
          storage: '80GB SSD',
          bandwidth: '10Mbps'
        }
      },
      {
        id: 'deploy-015',
        name: '专业版',
        description: '适合大型城市，最多支持500000名市民，提供最佳游戏体验',
        basePrice: 79.99,
        specs: {
          cpu: '8核',
          memory: '16GB',
          storage: '160GB SSD',
          bandwidth: '50Mbps'
        }
      }
    ],
    gameVersions: [
      { value: '1.21.7', label: 'xxxxxx 1.21.7', name: 'xxxxxx-1.21.7' },
      { value: '1.21.6', label: 'xxxxxx 1.21.6', name: 'xxxxxx-1.21.6' },
      { value: '1.21.5', label: 'xxxxxx 1.21.5', name: 'xxxxxx-1.21.5' },
      { value: '1.21.4', label: 'xxxxxx 1.21.4', name: 'xxxxxx-1.21.4' },
    ]
  },
  {
    id: 'game-006',
    title: '生存冒险',
    description: '《生存冒险》是一款开放世界生存游戏，玩家将在一个充满危险的世界中求生存。游戏开始时，玩家只有最基本的装备，需要收集资源、制作工具、建造庇护所、寻找食物和水源，同时应对野生动物、恶劣天气和其他威胁。游戏采用程序生成的世界，每次游戏都会有不同的地形和资源分布，提供无尽的探索可能。',
    shortDescription: '在荒野中求生存，收集资源，建造庇护所，对抗自然威胁。',
    coverImage: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=1374&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475066392170-59d55d96fe51?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=1470&auto=format&fit=crop'
    ],
    price: 129,
    rating: 4.4,
    tags: ['生存', '开放世界', '冒险', '制作', '多人游戏'],
    releaseDate: '2023-01-10',
    developer: '生存工作室',
    publisher: '冒险游戏',
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i3-2100 / AMD Ryzen 3 1200',
        memory: '4 GB RAM',
        graphics: 'NVIDIA GeForce GTX 650 / AMD Radeon HD 7770',
        storage: '15 GB 可用空间',
        network: '宽带互联网连接'
      },
      recommended: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i5-4460 / AMD Ryzen 5 1400',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 970 / AMD Radeon R9 290',
        storage: '15 GB SSD',
        network: '宽带互联网连接'
      }
    },
    features: [
      '开放世界探索',
      '资源收集与制作',
      '建造系统',
      '动态天气',
      '野生动物',
      '多人合作模式',
      '程序生成的世界'
    ],
    deploymentOptions: [
      {
        id: 'deploy-016',
        name: '标准版',
        description: '适合小型服务器或个人游戏，最多支持10名玩家同时在线',
        basePrice: 19.99,
        specs: {
          cpu: '2核',
          memory: '4GB',
          storage: '30GB SSD',
          bandwidth: '5Mbps'
        }
      },
      {
        id: 'deploy-017',
        name: '高级版',
        description: '适合中型服务器，最多支持30名玩家同时在线，提供更好的游戏体验',
        basePrice: 39.99,
        specs: {
          cpu: '4核',
          memory: '8GB',
          storage: '60GB SSD',
          bandwidth: '20Mbps'
        }
      },
      {
        id: 'deploy-018',
        name: '专业版',
        description: '适合大型服务器，最多支持100名玩家同时在线，提供最佳游戏体验',
        basePrice: 79.99,
        specs: {
          cpu: '8核',
          memory: '16GB',
          storage: '120GB SSD',
          bandwidth: '100Mbps'
        }
      }
    ],
    gameVersions: [
      { value: '1.21.7', label: 'xxxxxx 1.21.7', name: 'xxxxxx-1.21.7' },
      { value: '1.21.6', label: 'xxxxxx 1.21.6', name: 'xxxxxx-1.21.6' },
      { value: '1.21.5', label: 'xxxxxx 1.21.5', name: 'xxxxxx-1.21.5' },
      { value: '1.21.4', label: 'xxxxxx 1.21.4', name: 'xxxxxx-1.21.4' },
    ]
  },
  {
    id: 'game-007',
    title: 'Minecraft',
    description: 'Minecraft是一款沙盒游戏，玩家可以在游戏中构建、破坏和互动。游戏开始时，玩家只有最基本的装备，需要收集资源、制作工具、建造庇护所、寻找食物和水源，同时应对野生动物、恶劣天气和其他威胁。游戏采用程序生成的世界，每次游戏都会有不同的地形和资源分布，提供无尽的探索可能。',
    shortDescription: '探索无限世界，建造从简单的房子到宏伟的城堡的一切事物。',
    coverImage: 'https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg',
    screenshots: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475066392170-59d55d96fe51?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=1470&auto=format&fit=crop'
    ],
    price: 129,
    rating: 4.4,
    tags: ['沙盒', '冒险', '多人'],
    releaseDate: '2023-01-10',
    developer: '生存工作室',
    publisher: '冒险游戏',
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i3-2100 / AMD Ryzen 3 1200',
        memory: '4 GB RAM',
        graphics: 'NVIDIA GeForce GTX 650 / AMD Radeon HD 7770',
        storage: '15 GB 可用空间',
        network: '宽带互联网连接'
      },
      recommended: {
        os: 'Windows 10 64位',
        processor: 'Intel Core i5-4460 / AMD Ryzen 5 1400',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 970 / AMD Radeon R9 290',
        storage: '15 GB SSD',
        network: '宽带互联网连接'
      }
    },
    features: [
      '开放世界探索',
      '资源收集与制作',
      '建造系统',
      '动态天气',
      '野生动物',
      '多人合作模式',
      '程序生成的世界'
    ],
    deploymentOptions: [
      {
        id: 'deploy-017',
        name: '标准版',
        description: '适合小型服务器或个人游戏，最多支持10名玩家同时在线',
        basePrice: 19.99,
        specs: {
          cpu: '2核',
          memory: '4GB',
          storage: '30GB SSD',
          bandwidth: '5Mbps'
        }
      },
      {
        id: 'deploy-018',
        name: '高级版',
        description: '适合中型服务器，最多支持30名玩家同时在线，提供更好的游戏体验',
        basePrice: 39.99,
        specs: {
          cpu: '4核',
          memory: '8GB',
          storage: '60GB SSD',
          bandwidth: '20Mbps'
        }
      },
      {
        id: 'deploy-019',
        name: '专业版',
        description: '适合大型服务器，最多支持100名玩家同时在线，提供最佳游戏体验',
        basePrice: 79.99,
        specs: {
          cpu: '8核',
          memory: '16GB',
          storage: '120GB SSD',
          bandwidth: '100Mbps'
        }
      }
    ],
    gameVersions: [
      { value: '1.21.7', label: 'Vanilla 1.21.7', name: 'minecraft-java-1.21.7' },
      { value: '1.21.6', label: 'Vanilla 1.21.6', name: 'minecraft-java-1.21.6' },
      { value: '1.21.5', label: 'Vanilla 1.21.5', name: 'minecraft-java-1.21.5' },
      { value: '1.21.4', label: 'Vanilla 1.21.4', name: 'minecraft-java-1.21.4' },
    ]
  }
];

// 模拟服务器实例数据
export const serverInstances: ServerInstance[] = [
  {
    id: 'server-001',
    gameId: 'game-001',
    gameTitle: '星际探险',
    version: '1.2.5',
    status: 'running',
    deploymentDate: '2023-09-15',
    lastActive: '2023-11-20',
    specs: {
      cpu: '8核',
      memory: '16GB',
      storage: '200GB SSD',
      bandwidth: '100Mbps'
    },
    cost: {
      hourly: 1.25,
      monthly: 899
    },
    ipAddress: '192.168.1.100',
    region: '亚太地区 (香港)',
    uptime: 1584 // 66天
  },
  {
    id: 'server-002',
    gameId: 'game-002',
    gameTitle: '魔法王国',
    version: '2.0.1',
    status: 'running',
    deploymentDate: '2023-10-05',
    lastActive: '2023-11-19',
    specs: {
      cpu: '4核',
      memory: '8GB',
      storage: '80GB SSD',
      bandwidth: '10Mbps'
    },
    cost: {
      hourly: 0.55,
      monthly: 399
    },
    ipAddress: '192.168.1.101',
    region: '亚太地区 (东京)',
    uptime: 1104 // 46天
  },
  {
    id: 'server-003',
    gameId: 'game-003',
    gameTitle: '赛车传奇',
    version: '1.5.0',
    status: 'stopped',
    deploymentDate: '2023-08-20',
    lastActive: '2023-11-15',
    specs: {
      cpu: '8核',
      memory: '16GB',
      storage: '240GB SSD',
      bandwidth: '100Mbps'
    },
    cost: {
      hourly: 1.65,
      monthly: 1199
    },
    ipAddress: '192.168.1.102',
    region: '美国西部 (硅谷)',
    uptime: 0 // 已停止
  },
  {
    id: 'server-004',
    gameId: 'game-004',
    gameTitle: '战术指挥官',
    version: '1.1.2',
    status: 'deploying',
    deploymentDate: '2023-11-19',
    lastActive: '2023-11-19',
    specs: {
      cpu: '4核',
      memory: '8GB',
      storage: '120GB SSD',
      bandwidth: '20Mbps'
    },
    cost: {
      hourly: 0.85,
      monthly: 599
    },
    ipAddress: '192.168.1.103',
    region: '欧洲 (法兰克福)',
    uptime: 0 // 部署中
  },
  {
    id: 'server-005',
    gameId: 'game-005',
    gameTitle: '城市建设者',
    version: '2.3.0',
    status: 'error',
    deploymentDate: '2023-11-18',
    lastActive: '2023-11-18',
    specs: {
      cpu: '4核',
      memory: '8GB',
      storage: '80GB SSD',
      bandwidth: '10Mbps'
    },
    cost: {
      hourly: 0.55,
      monthly: 399
    },
    ipAddress: '192.168.1.104',
    region: '亚太地区 (新加坡)',
    uptime: 0 // 错误状态
  }
];

// 获取游戏详情
export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

// 获取相关游戏推荐
export const getRelatedGames = (gameId: string, limit: number = 3): Game[] => {
  const currentGame = getGameById(gameId);
  if (!currentGame) return [];
  
  // 根据标签相似度推荐游戏
  return games
    .filter(game => game.id !== gameId)
    .sort((a, b) => {
      const aCommonTags = a.tags.filter(tag => currentGame.tags.includes(tag)).length;
      const bCommonTags = b.tags.filter(tag => currentGame.tags.includes(tag)).length;
      return bCommonTags - aCommonTags;
    })
    .slice(0, limit);
};

// 获取服务器实例
export const getServerInstanceById = (id: string): ServerInstance | undefined => {
  return serverInstances.find(server => server.id === id);
};

// 获取用户的服务器实例
export const getUserServerInstances = (): ServerInstance[] => {
  return serverInstances;
};

// 获取热门游戏
export const getPopularGames = (limit: number = 3): Game[] => {
  return [...games].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

// 获取新游戏
export const getNewGames = (limit: number = 3): Game[] => {
  return [...games].sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateB.getTime() - dateA.getTime();
  }).slice(0, limit);
};

// 获取打折游戏
export const getDiscountedGames = (limit: number = 3): Game[] => {
  return games.filter(game => game.discountPrice).slice(0, limit);
};