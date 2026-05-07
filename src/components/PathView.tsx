import React from 'react';
import { Book, Star, Coffee, Zap, MessageCircle, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { Lesson } from '../types';

interface PathViewProps {
  onStartLesson: (id: string) => void;
}

const LESSONS: Lesson[] = [
  { id: '1', title: 'Básico 1', description: 'Apresente-se', status: 'completed', type: 'grammar', icon: 'Book' },
  { id: '2', title: 'Frases', description: 'Saudações comuns', status: 'unlocked', type: 'vocabulary', icon: 'MessageCircle' },
  { id: '3', title: 'Comida', description: 'Pedindo em um café', status: 'unlocked', type: 'vocabulary', icon: 'Coffee' },
  { id: '4', title: 'Animais', description: 'Pets comuns', status: 'locked', type: 'vocabulary', icon: 'Star' },
  { id: '5', title: 'Plurais', description: 'Mais de um', status: 'locked', type: 'grammar', icon: 'Zap' },
  { id: '6', title: 'Viagem', description: 'No aeroporto', status: 'locked', type: 'vocabulary', icon: 'Book' },
  { id: '7', title: 'Família', description: 'Membros da família', status: 'locked', type: 'vocabulary', icon: 'MessageCircle' },
  { id: '8', title: 'Cores', description: 'O mundo colorido', status: 'locked', type: 'vocabulary', icon: 'Star' },
  { id: '9', title: 'Verbos 1', description: 'Ações diárias', status: 'locked', type: 'grammar', icon: 'Zap' },
  { id: '10', title: 'Checkpoint', description: 'Teste seus conhecimentos', status: 'locked', type: 'grammar', icon: 'Trophy' },
];

export default function PathView({ onStartLesson }: PathViewProps) {
  return (
    <div className="relative flex flex-col items-center gap-12 pb-24">
      <div className="path-line" />
      
      {LESSONS.map((lesson, index) => (
        <LessonNode 
          key={lesson.id} 
          lesson={lesson} 
          index={index} 
          onClick={() => lesson.status !== 'locked' && onStartLesson(lesson.id)}
        />
      ))}
    </div>
  );
}

function LessonNode({ lesson, index, onClick }: { lesson: Lesson, index: number, onClick: () => void, key?: string }) {
  // Pattern: Center, Left, Right, Center, Repeat
  const pattern = index % 4;
  const offsetClass = 
    pattern === 1 ? 'mr-32' : 
    pattern === 3 ? 'ml-32' : 
    '';
  
  const Icon = {
    Book,
    Star,
    Coffee,
    Zap,
    MessageCircle,
    Trophy
  }[lesson.icon as keyof typeof Book] || Book;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative z-10 flex flex-col items-center ${offsetClass}`}
    >
      {lesson.status === 'unlocked' && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-slate-950 px-4 py-2 rounded-xl text-[10px] font-bold whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white animate-bounce">
          START LESSON
        </div>
      )}

      <button
        onClick={onClick}
        disabled={lesson.status === 'locked'}
        className={`
          transition-all duration-300 relative flex items-center justify-center
          ${lesson.status === 'completed' ? 
            'w-20 h-20 bg-brand-success rounded-full shadow-lg shadow-brand-success/20 border-4 border-brand-success/50' : 
            lesson.status === 'unlocked' ? 
            'w-24 h-24 bg-brand-primary rounded-full shadow-xl shadow-brand-primary/30 border-8 border-brand-bg outline outline-4 outline-brand-primary' : 
            'w-20 h-20 bg-brand-surface-light rounded-full border-4 border-slate-700 opacity-60 cursor-not-allowed'}
        `}
      >
        <Icon className={`
          ${lesson.status === 'unlocked' ? 'w-10 h-10' : 'w-8 h-8'} 
          ${lesson.status === 'locked' ? 'text-slate-500' : 'text-white'}
        `} />
        
        {lesson.status === 'completed' && (
          <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1.5 border-2 border-brand-bg shadow-sm">
            <Star className="w-4 h-4 text-brand-bg fill-brand-bg" />
          </div>
        )}
      </button>
      
      <div className="mt-4 text-center">
        <h3 className={`font-bold tracking-tight ${lesson.status === 'locked' ? 'text-slate-600' : 'text-white'}`}>
          {lesson.title}
        </h3>
        <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${lesson.status === 'locked' ? 'text-slate-700' : 'text-slate-500'}`}>
          {lesson.description}
        </p>
      </div>
    </motion.div>
  );
}
