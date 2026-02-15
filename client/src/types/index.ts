export interface IDancer {
  _id: string;
  name: string;
}

export interface ILGBalance {
  _id: string;
  dancerId: string;
  totalEarnings: number;
  totalDistributions: number;
  currentBalance: number;
}

export interface IAttendance {
  date: Date;
  dancerId: string[];
}

export interface IDancerHistory {
  _id: string;
  name: string;
  lgbalance: number;
  history: {
    type: "distribution" | "attendance";
    date: string;
    amount?: number;
  }[];
}
