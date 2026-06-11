import { motion } from 'framer-motion';
import { Star, BookOpen } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { getTacticById } from '../data/tactics';
import { TacticCard } from '../components/TacticCard';
import { Empty } from '../components/Empty';

export const FavoritesPage = () => {
  const favorites = useUserStore((state) => state.favorites);
  const learned = useUserStore((state) => state.learned);

  const favoriteTactics = favorites.map((id) => getTacticById(id)).filter(Boolean);
  const learnedTactics = learned.map((id) => getTacticById(id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            我的收藏
          </h1>
          <p className="text-text-secondary">
            管理你收藏的道具教学和学习进度
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-5 h-5 text-yellow-400" />
            <h2 className="font-display text-xl font-bold text-text-primary">
              收藏的道具 ({favoriteTactics.length})
            </h2>
          </div>

          {favoriteTactics.length > 0 ? (
            <div className="space-y-4">
              {favoriteTactics.map((tactic, index) => (
                <motion.div
                  key={tactic?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {tactic && <TacticCard tactic={tactic} />}
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty
              icon={Star}
              title="暂无收藏"
              description="收藏你喜欢的道具教学，方便随时查看"
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-green-400" />
            <h2 className="font-display text-xl font-bold text-text-primary">
              已学会 ({learnedTactics.length})
            </h2>
          </div>

          {learnedTactics.length > 0 ? (
            <div className="space-y-4">
              {learnedTactics.map((tactic, index) => (
                <motion.div
                  key={tactic?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {tactic && <TacticCard tactic={tactic} />}
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty
              icon={BookOpen}
              title="暂无已学会的道具"
              description="学习道具后标记为已学会，追踪你的进步"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};
