'use server';
/**
 * @fileOverview An AI-powered scam detection system for the Guardian.
 *
 * - detectScam - A function that analyzes transaction details to identify potential scams.
 * - DetectScamInput - The input type for the detectScam function.
 * - DetectScamOutput - The return type for the detectScam function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectScamInputSchema = z.object({
  transactionDetails: z.string().describe('Details of the transaction, including recipient address, amount, and any available context.'),
});
export type DetectScamInput = z.infer<typeof DetectScamInputSchema>;

const DetectScamOutputSchema = z.object({
  isScam: z.boolean().describe('Whether the transaction is identified as a potential scam.'),
  reason: z.string().describe('The AI-generated reason for the scam determination.'),
});
export type DetectScamOutput = z.infer<typeof DetectScamOutputSchema>;

export async function detectScam(input: DetectScamInput): Promise<DetectScamOutput> {
  return detectScamFlow(input);
}

const detectScamPrompt = ai.definePrompt({
  name: 'detectScamPrompt',
  input: {schema: DetectScamInputSchema},
  output: {schema: DetectScamOutputSchema},
  prompt: `You are an AI-powered scam detection system for the Guardian. Your task is to analyze transaction details and determine if the transaction is a potential scam.

Transaction Details: {{{transactionDetails}}}

Based on the transaction details, provide a boolean value for isScam and a detailed reasoning for your determination in the reason field. Consider factors such as unusual patterns, known scam addresses, and suspicious activities. Be concise and accurate in your assessment.`,
});

const detectScamFlow = ai.defineFlow(
  {
    name: 'detectScamFlow',
    inputSchema: DetectScamInputSchema,
    outputSchema: DetectScamOutputSchema,
  },
  async input => {
    const {output} = await detectScamPrompt(input);
    return output!;
  }
);
