import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Check } from 'lucide-react';
import { TacticTypeIcon, difficultyColors } from './TacticTypeIcon';
import { useUserStore } from '../store/userStore';
import { Tactic } from '../types';

interface TacticCardProps {
  tactic: Tactic;
}

export const TacticCard = ({ tactic }: TacticCardProps) => {
  const favorites = useUserStore((state) => state.favorites);
  const learned = useUserStore((state) => state.learned);
  const isFavorite = favorites.includes(tactic.id);
  const isLearned = learned.includes(tactic.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <Link to={`/tactic/${tactic.id}`}>
        <div className="card rounded-lg p-4 flex items-center gap-4 group cursor-pointer">
          <TacticTypeIcon type={tactic.type} className="flex-shrink-0" />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-display font-semibold text-text-primary group-hover:text-accent-cyan transition-colors truncate">
                {tactic.name}
              </h4>
              {isLearned && (
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-text-secondary truncate">
              {tactic.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-2 py-0.5 text-xs font-medium rounded border ${difficultyColors[tactic.difficulty]}`}>
                {tactic.difficulty}
              </span>
              {isFavorite && (
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
