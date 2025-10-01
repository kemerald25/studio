import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import GuardianCheckForm from "@/components/guardian-check-form";

export default function GuardianPage() {
    return (
        <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Shield className="w-10 h-10 text-secondary" />
                <div>
                    <h1 className="text-4xl font-headline font-bold text-white">AI Guardian</h1>
                    <p className="text-slate-400">Your personal web3 security expert. Analyze transactions for scams.</p>
                </div>
            </div>

            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="font-headline text-white">Transaction Analysis</CardTitle>
                    <CardDescription>
                        Paste in the transaction details to check for potential risks. The AI will analyze it for common scam patterns.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <GuardianCheckForm />
                </CardContent>
            </Card>
        </div>
    );
}
