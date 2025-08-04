import { create } from "zustand";

interface ConnectionState {
  isCloudConnected: boolean;
  isWifiConnected: boolean;
  setCloudConnected: (connected: boolean) => void;
  setWifiConnected: (connected: boolean) => void;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  isCloudConnected: false,
  isWifiConnected: false,
  setCloudConnected: (connected) => set({ isCloudConnected: connected }),
  setWifiConnected: (connected) => set({ isWifiConnected: connected }),
}));
