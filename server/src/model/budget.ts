export type CreateBudgetRequest = {
  monthlySalary: number;
  needsPercentage?: number;
  wantsPercentage?: number;
  savingsPercentage?: number;
  userId: string;
};

export type UpdateBudgetRequest = {
  id: string;
  data: {
    monthlySalary?: number;
    needsPercentage?: number;
    wantsPercentage?: number;
    savingsPercentage?: number;
  };
};
