/// <reference types="vite/client" />

declare module 'scoreboard/Dashboard' {
  import type { ComponentType } from 'react';
  export interface DashboardProps {
    matchId: string;
    onPauseChange?: (paused: boolean) => void;
  }
  export const Dashboard: ComponentType<DashboardProps>;
  export default Dashboard;
}
