export interface ReportTemplate {
  name: string;
  primaryColor: string;
  playerCount: number;
  description: string;
}

export const reportTemplates: ReportTemplate[] = [
  {
    name: "Basketball Scout Report",
    primaryColor: "#8B1F41",
    playerCount: 5,
    description: "Template for basketball team scouting (5 players)"
  },
  {
    name: "Football Scout Report",
    primaryColor: "#004C54",
    playerCount: 11,
    description: "Template for football team scouting (11 players)"
  },
  {
    name: "Baseball Scout Report",
    primaryColor: "#002D72",
    playerCount: 9,
    description: "Template for baseball team scouting (9 players)"
  }
];