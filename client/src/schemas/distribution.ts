import { z } from "zod";

export const DistributionSchema = z.object({
  dancerId: z.string(),
  amount: z.coerce.number(),
  distributionDate: z.date(),
});

export type TDistribution = z.infer<typeof DistributionSchema>;
