import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Check, Play, Crosshair, Target, Map, Flag, Shield } from 'lucide-react';
import { getTacticById } from '../data/tactics';
import { maps } from '../data/maps';
import { useUserStore } from '../store/userStore';
import { TacticType } from '../types';

const tacticTypeConfig: Record<TacticType, { icon: typeof Crosshair; color: string; label: string }> = {
  'A大进攻': { icon: Crosshair, color: 'text-tactic-fire', label: 'A大进攻' },
  'A小进攻': { icon: Target, color: 'text-tactic-flash', label: 'A小进攻' },
  '沙地进攻': { icon: Map, color: 'text-accent-cyan', label: '沙地进攻' },
  'B区进攻': { icon: Flag, color: 'text-tactic-smoke', label: 'B区进攻' },
  'CT道具': { icon: Shield, color: 'text-tactic-grenade', label: 'CT道具' },
};

const difficultyColors: Record<string, string> = {
  '入门': 'bg-green-500/20 text-green-400 border-green-500/50',
  '进阶': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  '高级': 'bg-red-500/20 text-red-400 border-red-500/50',
};

export const TacticDetailPage = () => {
  const { tacticId } = useParams<{ tacticId: string }>();
  const tactic = getTacticById(tacticId || '');
  
  const favorites = useUserStore((state) => state.favorites);
  const learned = useUserStore((state) => state.learned);
  const toggleFavorite = useUserStore((state) => state.toggleFavorite);
  const markAsLearned = useUserStore((state) => state.markAsLearned);

  const isFavorite = favorites.includes(tacticId || '');
  const isLearned = learned.includes(tacticId || '');

  const map = maps.find((m) => m.id === tactic?.mapId);

  if (!tactic) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-text-secondary">道具教学不存在</p>
      </div>
    );
  }

  const TypeIcon = tacticTypeConfig[tactic.type].icon;

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4">
            <Link
              to={map ? `/maps/${map.id}` : '/maps'}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回
            </Link>
            {map && (
              <>
                <span className="text-text-secondary">/</span>
                <Link
                  to={`/maps/${map.id}`}
                  className="text-text-secondary hover:text-accent-cyan transition-colors"
                >
                  {map.nameCn}
                </Link>
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card rounded-xl overflow-hidden mb-8"
        >
          <div className="relative aspect-video">
            <img
              src={tactic.image}
              alt={tactic.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-primary-secondary/80 ${tacticTypeConfig[tactic.type].color}`}>
                  <TypeIcon className="w-6 h-6" />
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${difficultyColors[tactic.difficulty]}`}>
                  {tactic.difficulty}
                </span>
              </div>
              <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
                {tactic.name}
              </h1>
              <p className="text-text-secondary">{tactic.description}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <div className="card rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-text-primary mb-6">
                投掷步骤
              </h2>
              <ol className="space-y-4">
                {tactic.steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent-cyan/20 text-accent-cyan font-display font-bold rounded-lg">
                      {index + 1}
                    </span>
                    <p className="text-text-secondary pt-1">{step}</p>
                  </motion.li>
                ))}
              </ol>
            </div>

            {tactic.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card rounded-xl p-6 mt-6"
              >
                <h3 className="font-display font-semibold text-text-primary mb-3">
                  标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tactic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary border border-primary-border rounded-full text-sm text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-64 space-y-4"
          >
            <button
              onClick={() => toggleFavorite(tactic.id)}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-display font-semibold transition-all ${
                isFavorite
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                  : 'bg-primary-secondary text-text-secondary border border-primary-border hover:border-accent-cyan hover:text-accent-cyan'
              }`}
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-400' : ''}`} />
              {isFavorite ? '已收藏' : '收藏'}
            </button>

            <button
              onClick={() => markAsLearned(tactic.id)}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-display font-semibold transition-all ${
                isLearned
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-primary-secondary text-text-secondary border border-primary-border hover:border-green-500 hover:text-green-400'
              }`}
            >
              <Check className="w-5 h-5" />
              {isLearned ? '已学会' : '标记已学'}
            </button>

            {tactic.videos && tactic.videos.length > 0 && (
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-cyan text-primary rounded-lg font-display font-semibold hover:bg-accent-cyan/90 transition-colors">
                <Play className="w-5 h-5" />
                观看视频
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
