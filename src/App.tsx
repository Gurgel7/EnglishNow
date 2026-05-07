/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Trophy, 
  MessageSquare, 
  User, 
  Flame, 
  Heart, 
  Shield, 
  Settings,
  BookOpen,
  Layout,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { View, UserStats } from './types';
import PathView from './components/PathView';
import LeaderboardView from './components/LeaderboardView';
import TutorView from './components/TutorView';
import ProfileView from './components/ProfileView';
import LessonSession from './components/LessonSession';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('path');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userStats, setUserStats] = useState<UserStats>({
    xp: 450,
    streak: 12,
    hearts: 5,
    gems: 120,
    level: 4
  });

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const startLesson = (id: string) => {
    setActiveLessonId(id);
    setCurrentView('lesson');
  };

  const completeLesson = (xpGained: number) => {
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + xpGained,
      level: Math.floor((prev.xp + xpGained) / 500) + 1
    }));
    setCurrentView('path');
    setActiveLessonId(null);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-brand-bg font-sans">
      {/* Mobile Drawer Overlay */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-brand-surface rounded-lg border border-white/10"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-brand-bg border-r border-brand-border transition-transform duration-300 ease-in-out lg:translate-x-0
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 shadow-lg flex items-center justify-center">
                {/* USA Flag Inspired Background */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-1/2 bg-blue-700 flex items-center justify-center">
                    <span className="text-xs text-white opacity-40">★</span>
                  </div>
                  <div className="h-1/2 flex flex-col">
                    <div className="h-1/3 bg-red-600" />
                    <div className="h-1/3 bg-white" />
                    <div className="h-1/3 bg-red-600" />
                  </div>
                </div>
                <span className="relative font-display font-black text-white text-2xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">E</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white font-display">EnglishNow</h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem 
              active={currentView === 'path'} 
              icon={<Home className="w-6 h-6" />} 
              label="Trilha" 
              onClick={() => setCurrentView('path')} 
            />
            <NavItem 
              active={currentView === 'leaderboard'} 
              icon={<Trophy className="w-6 h-6" />} 
              label="Ranking" 
              onClick={() => setCurrentView('leaderboard')} 
            />
            <NavItem 
              active={currentView === 'tutor'} 
              icon={<MessageSquare className="w-6 h-6" />} 
              label="Tutor IA" 
              onClick={() => setCurrentView('tutor')} 
            />
            <NavItem 
              active={currentView === 'profile'} 
              icon={<User className="w-6 h-6" />} 
              label="Perfil" 
              onClick={() => setCurrentView('profile')} 
            />
          </nav>

          <div className="mt-auto space-y-6">
            {/* Word of the Day */}
            <div className="p-4 bg-brand-bg border border-brand-border rounded-3xl group cursor-pointer hover:border-brand-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Palavra do Dia</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-brand-accent transition-colors">Resilient</h4>
                  <p className="text-[10px] text-slate-500 italic">/rɪˈzɪl.jənt/</p>
                </div>
                <button className="p-2 bg-brand-surface rounded-lg text-slate-400 group-hover:text-white transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Capaz de se recuperar rapidamente de dificuldades; resiliente.
              </p>
            </div>

            <div className="p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-3xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">IA Online</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">Pergunte-me qualquer coisa sobre gramática!</p>
            </div>
            
            <div className="pt-6 border-t border-brand-border">
              <NavItem 
                active={false} 
                icon={<Settings className="w-6 h-6" />} 
                label="Configurações" 
                onClick={() => {}} 
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col h-full overflow-hidden">
        {/* Top Header Stats */}
        {currentView !== 'lesson' && (
          <header className="h-20 flex items-center justify-between px-10 border-b border-brand-border z-10 bg-brand-bg/80 backdrop-blur-sm">
            <div className="flex items-center gap-8 text-slate-400">
              <StatItem icon={<Flame className="text-orange-500 fill-orange-500" />} value={userStats.streak} label="Ofensiva" />
              <StatItem icon={<Heart className="text-brand-danger fill-brand-danger" />} value={userStats.hearts} label="Vidas" />
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:block bg-brand-surface px-4 py-2 rounded-full border border-brand-border text-sm font-medium">
                Nível {userStats.level}: <span className="text-white font-bold ml-1">Rotinas Diárias</span>
              </div>
              
              <button className="flex items-center gap-2 bg-brand-surface hover:bg-slate-800 border border-brand-border px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95">
                <User className="w-4 h-4 text-brand-primary" />
                <span>Entrar</span>
              </button>
            </div>
          </header>
        )}

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <AnimatePresence mode="wait">
            {currentView === 'path' && (
              <motion.div
                key="path"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 max-w-4xl mx-auto"
              >
                <PathView onStartLesson={startLesson} />
              </motion.div>
            )}
            {currentView === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 max-w-2xl mx-auto"
              >
                <LeaderboardView />
              </motion.div>
            )}
            {currentView === 'tutor' && (
              <motion.div
                key="tutor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <TutorView />
              </motion.div>
            )}
            {currentView === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 max-w-4xl mx-auto"
              >
                <ProfileView stats={userStats} />
              </motion.div>
            )}
            {currentView === 'lesson' && activeLessonId && (
              <motion.div
                key="lesson"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.05, opacity: 0 }}
                className="fixed inset-0 z-50 bg-brand-bg flex flex-col"
              >
                <LessonSession 
                  lessonId={activeLessonId} 
                  onClose={() => setCurrentView('path')} 
                  onComplete={completeLesson}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`nav-item w-full ${active ? 'nav-item-active' : ''}`}
    >
      <span className="w-6 h-6">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function StatItem({ icon, value, label }: { icon: React.ReactNode, value: string | number, label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5">{icon}</span>
        <span className="text-xl font-bold text-white">{value}</span>
      </div>
      {label && <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</span>}
    </div>
  );
}

