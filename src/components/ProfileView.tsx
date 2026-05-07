import React from 'react';
import { User, Shield, Zap, BadgeCheck, Camera, Edit2 } from 'lucide-react';
import { UserStats } from '../types';

export default function ProfileView({ stats }: { stats: UserStats }) {
  return (
    <div className="space-y-8">
      {/* Header Profile */}
      <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full" />
        
        <div className="relative group">
          <div className="w-32 h-32 rounded-3xl bg-brand-primary flex items-center justify-center font-display font-bold text-4xl text-white shadow-xl shadow-brand-primary/20 transition-transform group-hover:scale-105">
            YOU
          </div>
          <button className="absolute -bottom-2 -right-2 p-2 bg-brand-surface border border-brand-border rounded-xl text-brand-primary shadow-lg hover:text-white transition-colors">
            <Camera className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <h2 className="text-3xl font-bold">Sua Conta</h2>
            <BadgeCheck className="w-6 h-6 text-brand-primary fill-brand-primary/20" />
          </div>
          <p className="text-slate-400">Membro desde Abril 2026 • EnglishNow Pro</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Editar Perfil
            </button>
            <button className="bg-brand-surface-light border border-brand-border hover:bg-slate-700 text-white font-semibold py-2 px-6 rounded-xl transition-all text-sm">
              Ver Estatísticas
            </button>
          </div>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard label="Total de XP" value={stats.xp.toLocaleString()} icon={<Zap className="text-yellow-500 fill-yellow-500/20" />} />
        <StatCard label="Ofensiva" value={`${stats.streak} Dias`} icon={<Zap className="text-orange-500 fill-orange-500/20" />} />
        <StatCard label="Gemas" value={stats.gems.toLocaleString()} icon={<Shield className="text-brand-accent fill-brand-accent/20" />} />
        <StatCard label="Liga" value="Ouro" icon={<Shield className="text-brand-primary fill-brand-primary/20" />} />
      </div>

      {/* Badges */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-brand-primary" />
          Conquistas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AchievementBadge name="Madrugador" progress={100} earned={true} />
          <AchievementBadge name="10 Dias de Fogo" progress={100} earned={true} />
          <AchievementBadge name="Guerreiro XP" progress={80} earned={false} />
          <AchievementBadge name="Rei do Ouro" progress={30} earned={false} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="glass-card p-6 flex flex-col items-center text-center">
      <div className="w-10 h-10 mb-3 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">{label}</div>
    </div>
  );
}

function AchievementBadge({ name, progress, earned }: { name: string, progress: number, earned: boolean }) {
  return (
    <div className={`p-4 rounded-2xl border ${earned ? 'bg-brand-primary/5 border-brand-primary/20' : 'bg-brand-surface border-brand-border'} transition-all hover:scale-105`}>
      <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${earned ? 'bg-brand-primary/20 text-brand-primary' : 'bg-slate-700/50 text-slate-600'}`}>
        <Shield className="w-6 h-6" />
      </div>
      <div className="text-center">
        <div className={`text-xs font-bold mb-2 ${earned ? 'text-white' : 'text-slate-500'}`}>{name}</div>
        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
          <div className={`h-full ${earned ? 'bg-brand-primary' : 'bg-slate-700'}`} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
