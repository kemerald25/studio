'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Book, CheckCircle, XCircle } from 'lucide-react';

const quizQuestions = [
  {
    question: "You receive a DM with a 'surprise' link to mint a free, limited-edition NFT from a famous project. What's the safest action?",
    options: [
      "Click it immediately before they're all gone!",
      "Ask for their private key to verify their identity.",
      "Ignore the DM. Go to the project's official Twitter/Discord and find their official link.",
      "Connect your wallet to the site, but don't approve any transactions."
    ],
    correctAnswer: "Ignore the DM. Go to the project's official Twitter/Discord and find their official link.",
    explanation: "Scammers often create a sense of urgency (FOMO). Always verify links through official, public channels. Never click unsolicited links, even just to 'check'."
  },
  {
    question: "What is a 'seed phrase' or 'recovery phrase'?",
    options: [
      "A password for your wallet that you can share with support staff.",
      "A list of random words that is a master key to all your crypto funds.",
      "A code to get discounts on transaction fees.",
      "A phrase you can change daily for better security."
    ],
    correctAnswer: "A list of random words that is a master key to all your crypto funds.",
    explanation: "Your seed phrase is the most critical piece of information. Anyone who has it can control your wallet. Never share it with anyone, for any reason. Store it offline and securely."
  }
];

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prev) => (prev + 1) % quizQuestions.length);
  };
  
  const handleSubmit = () => {
    if (selectedAnswer) {
        setShowResult(true);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Book className="w-10 h-10 text-secondary" />
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Security Quiz</h1>
          <p className="text-slate-400">Test your crypto knowledge and boost your Trust Score.</p>
        </div>
      </div>

      <Card className="glassmorphism max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-white">Question {currentQuestionIndex + 1}</CardTitle>
          <CardDescription>{currentQuestion.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer ?? ""} onValueChange={setSelectedAnswer} className="space-y-4" disabled={showResult}>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-slate-300">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4">
          {showResult ? (
            <Card className={isCorrect ? "bg-success/10 border-success" : "bg-destructive/10 border-destructive"}>
              <CardHeader className="flex-row items-center gap-2">
                {isCorrect ? <CheckCircle className="text-success" /> : <XCircle className="text-destructive" />}
                <CardTitle className={isCorrect ? "text-success" : "text-destructive"}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">{currentQuestion.explanation}</p>
              </CardContent>
            </Card>
          ) : null}
          {showResult ? (
            <Button onClick={handleNext} className="w-full">Next Question</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full">Submit</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
