export type BatResult = "homeRun" | "strike" | null;

export type RealBatResult = "homeRun" | "strike";

export type PitchSelect = "fastball" | "curveball" | "changeup";

export const batResultMap: Record<RealBatResult, string> = {
  homeRun: "Home Run!",
  strike: "Strike!"
};

export interface PitchConfig {
  speed: number;
  break: number;
  name: string;
  trajectory?: string;
}
