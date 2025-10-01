'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleCheckTransaction } from '@/app/guardian/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  result: null,
  error: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto font-headline">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Check Transaction'
      )}
    </Button>
  );
}

export default function GuardianCheckForm() {
  const [state, formAction] = useFormState(handleCheckTransaction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <Textarea
        name="transactionDetails"
        placeholder="e.g., Sending 0.5 ETH to 0x123... for a 'guaranteed' airdrop. Received a DM on Twitter..."
        rows={6}
        className="bg-background font-code"
      />
      <div className="flex justify-end">
        <SubmitButton />
      </div>
      
      {state.result && (
        <Card className={`transition-all duration-500 ${state.result.isScam ? 'border-destructive bg-destructive/10' : 'border-success bg-success/10'}`}>
          <CardHeader className="flex-row items-center gap-4 space-y-0">
             {state.result.isScam ? 
                <AlertCircle className="w-8 h-8 text-destructive" /> : 
                <CheckCircle className="w-8 h-8 text-success" />
             }
            <div>
              <CardTitle className={`font-headline ${state.result.isScam ? 'text-destructive' : 'text-success'}`}>
                {state.result.isScam ? 'Potential Scam Detected' : 'Looks Safe'}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">{state.result.reason}</p>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
