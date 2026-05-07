import { Trophy, Medal, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';

const TOP_USERS = [
  { id: '1', name: 'Alex M.', xp: 2450, avatar: 'AM', color: 'bg-yellow-500' },
  { id: '2', name: 'Você', xp: 450, avatar: 'VC', color: 'bg-brand-primary', isCurrentUser: true },
  { id: '3', name: 'Sarah L.', xp: 1820, avatar: 'SL', color: 'bg-slate-400' },
  { id: '4', name: 'John D.', xp: 1540, avatar: 'JD', color: 'bg-orange-800' },
  { id: '5', name: 'Emma W.', xp: 1200, avatar: 'EW', color: 'bg-indigo-600' },
];

export default function LeaderboardView() {
  const sortedUsers = [...TOP_USERS].sort((a, b) => b.xp - a.xp);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-2xl mb-4 border border-yellow-500/20">
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold">Liga de Ouro</h2>
        <p className="text-slate-400 text-sm mt-2">Termine no top 3 para subir de liga!</p>
      </div>

      <div className="glass-card overflow-hidden">
        {sortedUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              flex items-center gap-4 p-4 border-b border-brand-border last:border-0
              ${user.isCurrentUser ? 'bg-brand-primary/10 border-brand-primary/20' : ''}
            `}
          >
            <div className="w-8 text-center font-bold text-slate-500">
              {index + 1}
            </div>
            
            <div className={`w-10 h-10 rounded-xl ${user.color} flex items-center justify-center font-bold text-white shadow-sm`}>
              {user.avatar}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-xs text-slate-500">{index === 1 ? 'Sua ofensiva: 12 dias' : 'Ofensiva de 12 dias'}</p>
            </div>

            <div className="text-right">
              <div className="font-bold text-white">{user.xp.toLocaleString()} XP</div>
              <div className="text-[10px] text-brand-success flex items-center justify-end gap-0.5">
                <ChevronUp className="w-3 h-3" />
                <span>Estável</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
