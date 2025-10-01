'use server';

import { detectScam, type DetectScamOutput } from '@/ai/flows/detect-scams-with-guardian';
import { z } from 'zod';

const schema = z.object({
  transactionDetails: z.string().min(10, { message: 'Please provide more transaction details.' }),
});

type State = {
  result: DetectScamOutput | null;
  error: string | null;
  message: string | null;
};

export async function handleCheckTransaction(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = schema.safeParse({
    transactionDetails: formData.get('transactionDetails'),
  });

  if (!validatedFields.success) {
    return {
      result: null,
      error: validatedFields.error.flatten().fieldErrors.transactionDetails?.[0] ?? "Invalid input.",
      message: null,
    };
  }

  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await detectScam({ transactionDetails: validatedFields.data.transactionDetails });
    
    return {
      result,
      error: null,
      message: 'Transaction analyzed successfully.',
    };

  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return {
      result: null,
      error: `Analysis failed: ${errorMessage}`,
      message: null,
    };
  }
}
