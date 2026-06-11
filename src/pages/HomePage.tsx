import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Zap, Target, Award } from 'lucide-react';
import { maps } from '../data/maps';
import { tactics } from '../data/tactics';
import { MapCard } from '../components/MapCard';
import { TacticCard } from '../components/TacticCard';

const stats = [
  { icon: Target, label: '教学点位', value: tactics.length },
  { icon: Zap, label: '覆盖地图', value: maps.length },
  { icon: Award, label: '玩家受益', value: '50K+' },
];

export const HomePage = () => {
  const featuredTactics = tactics.slice(0, 4);
  const featuredMaps = maps.slice(0, 6);

  return (
    <div className="min-h-screen bg-primary">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-cyan/10 via-primary to-primary" />
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-cyan/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-cyan/20 border border-accent-cyan/50 rounded-full mb-6"
            >
              <Play className="w-4 h-4 text-accent-cyan" />
              <span className="text-sm font-medium text-accent-cyan">CS2 道具教学</span>
            </motion.div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              <span className="text-text-primary">掌握</span>
              <span className="text-gradient glow-text">道具</span>
              <br />
              <span className="text-text-primary">称霸赛场</span>
            </h1>
            
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
              专业的CS2投掷物教学平台，提供详细的道具点位、投掷技巧和战术应用指南，帮助你快速提升游戏水平。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/maps" className="btn-primary inline-flex items-center gap-2">
                  开始学习
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/maps" className="btn-secondary inline-flex items-center gap-2">
                  浏览地图
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-text-secondary/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [2, 12, 2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-text-secondary/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card rounded-lg p-6 text-center"
              >
                <stat.icon className="w-10 h-10 text-accent-cyan mx-auto mb-4" />
                <div className="font-display text-3xl font-bold text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">热门地图</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMaps.map((map) => (
                <MapCard key={map.id} map={map} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/maps" className="btn-secondary inline-flex items-center gap-2">
                查看全部地图
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="section-title">热门教学</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredTactics.map((tactic) => (
                <TacticCard key={tactic.id} tactic={tactic} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-primary-border py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-text-secondary text-sm">
            CS2 TACTICS - 专业的CS2道具教学平台
          </p>
        </div>
      </footer>
    </div>
  );
};
