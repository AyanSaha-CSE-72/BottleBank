"use server";

import { validateBottleDeposit } from "@/ai/flows/validate-bottle-deposit";
import type { ValidateBottleDepositInput, ValidateBottleDepositOutput } from "@/ai/flows/validate-bottle-deposit";

export async function handleDeposit(input: ValidateBottleDepositInput): Promise<ValidateBottleDepositOutput> {
  const result = await validateBottleDeposit(input);
  return result;
}
