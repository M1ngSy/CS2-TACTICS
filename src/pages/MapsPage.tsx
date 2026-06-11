import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { maps } from '../data/maps';
import { MapCard } from '../components/MapCard';

export const MapsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaps = maps.filter((map) => {
    const matchesSearch = map.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         map.nameCn.includes(searchTerm);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            地图列表
          </h1>
          <p className="text-text-secondary">
            选择一张地图，开始学习道具投掷技巧
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="搜索地图..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-primary-secondary border border-primary-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-cyan transition-colors"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMaps.map((map, index) => (
            <motion.div
              key={map.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MapCard map={map} />
            </motion.div>
          ))}
        </motion.div>

        {filteredMaps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-text-secondary">没有找到匹配的地图</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
