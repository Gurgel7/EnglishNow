import { useState } from 'react';
import { X, ChevronRight, CheckCircle2, AlertCircle, Heart, Trophy, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';

interface LessonSessionProps {
  lessonId: string;
  onClose: () => void;
  onComplete: (xp: number) => void;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    text: 'Qual é a tradução correta para "Good morning"?',
    options: ['Bom dia', 'Boa tarde', 'Boa noite', 'Oi'],
    correctAnswer: 'Bom dia'
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    text: 'Como se diz "Olá" em inglês?',
    options: ['Hola', 'Hello', 'Salut', 'Ciao'],
    correctAnswer: 'Hello'
  },
  {
    id: 'q3',
    type: 'translation',
    text: 'Traduza: "The coffee is hot"',
    correctAnswer: 'O cafe esta quente'
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    text: 'Qual é o plural de "Child"?',
    options: ['Childs', 'Children', 'Childrens', 'Childes'],
    correctAnswer: 'Children'
  },
  {
    id: 'q5',
    type: 'translation',
    text: 'Traduza: "Eu gosto de maçãs"',
    correctAnswer: 'I like apples'
  },
  {
    id: 'q6',
    type: 'multiple-choice',
    text: 'Qual destas palavras significa "Céu"?',
    options: ['Earth', 'Sea', 'Sky', 'Cloud'],
    correctAnswer: 'Sky'
  }
];

export default function LessonSession({ lessonId, onClose, onComplete }: LessonSessionProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [hp, setHp] = useState(3);
  const [score, setScore] = useState(0);

  const question = MOCK_QUESTIONS[currentIdx];
  const progress = ((currentIdx) / MOCK_QUESTIONS.length) * 100;

  const handleCheck = () => {
    let isCorrect = false;
    
    if (question.type === 'multiple-choice') {
      isCorrect = selectedOption === question.correctAnswer;
    } else {
      isCorrect = textInput.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase().trim();
    }

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 10);
    } else {
      setFeedback('wrong');
      setHp(h => Math.max(0, h - 1));
    }
  };

  const handleNext = () => {
    if (currentIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setTextInput('');
      setFeedback(null);
    } else {
      onComplete(score + 20);
    }
  };

  if (hp === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-brand-bg text-center">
        <AlertCircle className="w-20 h-20 text-brand-danger mb-6" />
        <h2 className="text-3xl font-bold mb-2">Sem Vidas!</h2>
        <p className="text-slate-400 mb-8 max-w-sm">Dê uma pausa e tente novamente mais tarde. Revise seus erros para aprender melhor.</p>
        <button onClick={onClose} className="btn-secondary w-full max-w-xs">Voltar para a Trilha</button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-brand-bg relative overflow-hidden">
      {/* Dark gradient blur background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Header */}
      <div className="p-6 flex items-center gap-6 max-w-4xl mx-auto w-full z-10">
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 h-3 bg-brand-surface rounded-full overflow-hidden border border-brand-border shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-brand-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
          />
        </div>
        <div className="flex items-center gap-1.5 text-brand-danger font-bold">
          <Heart className="w-6 h-6 fill-brand-danger" />
          <span>{hp}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-2xl mx-auto w-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-8"
          >
            <h2 className="text-2xl font-bold text-center mb-12">{question.text}</h2>

            {question.type === 'multiple-choice' ? (
              <div className="grid gap-4">
                {question.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => !feedback && setSelectedOption(opt)}
                    className={`
                      relative p-4 rounded-2xl border-2 text-left font-bold transition-all group overflow-hidden
                      ${selectedOption === opt ? 'border-brand-primary bg-brand-primary/10 shadow-lg shadow-brand-primary/20' : 'border-brand-border bg-brand-surface hover:bg-brand-surface-light'}
                      ${feedback === 'correct' && opt === question.correctAnswer ? 'border-brand-success bg-brand-success/10' : ''}
                      ${feedback === 'wrong' && selectedOption === opt && opt !== question.correctAnswer ? 'border-brand-danger bg-brand-danger/10' : ''}
                    `}
                  >
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border mr-4 transition-colors ${selectedOption === opt ? 'bg-brand-primary border-brand-primary text-white' : 'border-white/20 text-slate-500'}`}>
                      {opt[0]}
                    </span>
                    {opt}
                    {selectedOption === opt && !feedback && (
                      <motion.div layoutId="active-indicator" className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-primary" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Digite a tradução aqui..."
                  className="w-full h-32 bg-brand-surface border-2 border-white/5 rounded-2xl p-6 text-white text-lg focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer / Feedback Bar */}
      <div className={`p-8 border-t border-brand-border z-20 transition-colors duration-500 ${
        feedback === 'correct' ? 'bg-brand-success/20 shadow-[0_-20px_40px_rgba(16,185,129,0.1)]' : 
        feedback === 'wrong' ? 'bg-brand-danger/20 shadow-[0_-20px_40px_rgba(239,68,68,0.1)]' : 'bg-brand-bg/80 backdrop-blur-md'
      }`}>
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-6">
          <div className="flex-1">
            {feedback === 'correct' && (
              <div className="flex items-center gap-3 text-brand-success animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
                <div>
                  <h4 className="font-bold text-lg">Trabalho Incrível!</h4>
                  <p className="text-xs opacity-80 decoration-none">Você está aprendendo rápido!</p>
                </div>
              </div>
            )}
            {feedback === 'wrong' && (
              <div className="flex items-center gap-3 text-brand-danger">
                <AlertCircle className="w-8 h-8" />
                <div>
                  <h4 className="font-bold text-lg">Quase lá...</h4>
                  <p className="text-xs opacity-80">A resposta correta era: <span className="font-bold">{question.correctAnswer}</span></p>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={feedback ? handleNext : handleCheck}
            disabled={!feedback && question.type === 'multiple-choice' && !selectedOption}
            className={`
              px-12 py-4 rounded-2xl font-bold shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
              ${feedback === 'correct' ? 'bg-brand-success text-white' : 
                feedback === 'wrong' ? 'bg-brand-danger text-white' : 'bg-brand-primary text-white'}
            `}
          >
            {feedback ? 'Continuar' : 'Verificar Resposta'}
          </button>
        </div>
      </div>
    </div>
  );
}
