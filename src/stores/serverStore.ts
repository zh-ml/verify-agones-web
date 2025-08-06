import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as podApi from '../api/pod';
import type { GameServerInfo } from "../api/pod";

// 服务器状态类型
export interface ServerInstance {
  id: string;
  name: string;
  gameId: string;
  gameName: string;
  status: 'running' | 'stopped' | 'deploying' | 'destroying' | 'error';
  config: {
    plan: string;
    cpu: string;
    memory: string;
    storage: string;
    maxPlayers: number;
  };
  createdAt: string;
  lastActivity: string;
  ipAddress?: string;
  port?: number;
}

// 部署配置类型
export interface DeploymentConfig {
  gameId: string;
  serverName: string;
  plan: number;
  maxPlayers: number;
  serverDescription?: string;
  version: string;
  gameMode: string;
  difficulty: string;
  customConfig?: {
    cpu: number;
    memory: number;
    storage: number;
    bandwidth: number;
    backups: boolean;
    ddosProtection: boolean;
    managedService: boolean;
  };
}

// Store 状态类型
interface ServerStore {
  // 状态
  servers: ServerInstance[];
  allocatedGameServers: GameServerInfo[];
  loading: boolean;
  error: string | null;
  // Actions
  fetchServers: (status: string) => Promise<void>;
  deployServer: (name: string, version: string, cpuResource: string, memoryResource: string, label: string) => Promise<string>;
  destroyServer: (name: string) => Promise<void>;
  startServer: (serverId: string) => Promise<void>;
  stopServer: (serverId: string) => Promise<void>;
  clearError: () => void;
}

// 创建 Zustand store
export const useServerStore = create<ServerStore>()(devtools(
  (set) => ({
    // 初始状态
    servers: [],
    loading: false,
    error: null,
    allocatedGameServers: [],
    
    // 获取已部署的服务器列表
    fetchServers: async (status: string) => {
      set({ loading: false, error: null });
      try {
        const gameServers = await podApi.listGameServers({ status });
        set({ allocatedGameServers: gameServers || [], loading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '获取服务器列表失败';
        set({ error: errorMessage, loading: false });
        console.error('获取服务器列表失败:', error);
      }
    },
    
    // 部署新服务器
    deployServer: async (name: string, version: string, cpuResource: string, memoryResource: string, label: string) => {
      set({ loading: true, error: null });
      try {
        podApi.deployGameServer({ name, version, cpuResource, memoryResource, label });
        set({ loading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '部署服务器失败';
        set({ error: errorMessage, loading: false });
        console.error('部署服务器失败:', error);
        throw error;
      }
    },
    
    // 销毁服务器
    destroyServer: async (name: string) => {
      set({ loading: true, error: null });
      try {
        await podApi.deleteAllocatedGameServer(name);
        // 从本地状态中移除服务器
        set((state) => ({
          allocatedGameServers: state.allocatedGameServers?.filter((gs) => gs.name !== name) || [],
          loading: false
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '销毁服务器失败';
        set({ error: errorMessage, loading: false });
        console.error('销毁服务器失败:', error);
        throw error;
      }
    },
    // 清除错误
    clearError: () => {
      set({ error: null });
    },
  }),
  {
    name: 'server-store', // devtools 中显示的名称
  }
));