import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { difficultyColors } from './TacticTypeIcon';
import { Map } from '../types';

interface MapCardProps {
  map: Map;
}

export const MapCard = ({ map }: MapCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/maps/${map.id}`}>
        <div className="card rounded-lg overflow-hidden aspect-video">
          <div className="relative h-full">
            <img
              src={map.thumbnail}
              alt={map.nameCn}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded border ${difficultyColors[map.difficulty]}`}>
                  {map.difficulty}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium bg-primary-secondary/80 text-text-secondary rounded">
                  {map.tacticCount} 个道具
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary">
                {map.nameCn}
              </h3>
              <p className="text-sm text-text-secondary">{map.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
