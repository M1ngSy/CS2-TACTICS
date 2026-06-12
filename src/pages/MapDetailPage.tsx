import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, X, Play } from 'lucide-react';
import { maps } from '../data/maps';
import { getTacticsByMap } from '../data/tactics';
import { TacticType } from '../types';

const dust2Categories: { key: TacticType; label: string; color: string }[] = [
  { key: 'A大进攻', label: 'A大进攻', color: '#ff4d4d' },
  { key: 'A小进攻', label: 'A小进攻', color: '#ffd700' },
  { key: '沙地进攻', label: '沙地进攻', color: '#00d4ff' },
  { key: 'B区进攻', label: 'B区进攻', color: '#4ade80' },
  { key: 'CT道具', label: 'CT道具', color: '#ff8c00' },
];

const infernoCategories: { key: TacticType; label: string; color: string }[] = [
  { key: 'A进攻', label: 'A进攻', color: '#ff4d4d' },
  { key: 'B区进攻', label: 'B进攻', color: '#4ade80' },
  { key: 'CT道具', label: 'CT道具', color: '#ff8c00' },
];

export const MapDetailPage = () => {
  const { mapId } = useParams<{ mapId: string }>();
  const [selectedType, setSelectedType] = useState<TacticType | 'all'>('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const map = maps.find((m) => m.id === mapId);
  const allTactics = getTacticsByMap(mapId || '');
  const categories = mapId === 'inferno' ? infernoCategories : dust2Categories;

  const redCircleNames = new Set(['黄墙火', '二箱火']);

  const getMarkerImage = (tactic: typeof allTactics[number]) => {
    // 特定覆盖
    const overrides: Record<string, string | null> = {
      '警家满封烟，棺材烟': './images/smoke.png',
      '连接烟，书房烟': './images/smoke.png',
      '黄墙火': null,
      'B启动闪1，B启动闪2': './images/flash.jpg',
      'A小中路反清': './images/flash.jpg',
      'A小近点反清': './images/flash.jpg',
      '二箱火': null,
    };
    if (tactic.name in overrides) return overrides[tactic.name];

    const isMulti = tactic.name.includes('，');
    if (isMulti) return null; // 多个内容 → 蓝色圆圈
    if (tactic.name.includes('闪')) return './images/flash.jpg';
    if (tactic.name.includes('烟')) return './images/smoke.png';
    return './images/molotov.png'; // 其余 → 燃烧弹
  };
  const countLines = (tactics: typeof allTactics) =>
    tactics.reduce((sum, t) => sum + t.name.split('，').length, 0);

  const filteredTactics = selectedType === 'all'
    ? allTactics
    : allTactics.filter((t) => t.type === selectedType);

  const totalLines = countLines(allTactics);

  const handleMarkerClick = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const handlePlayVideo = (videoPath: string) => {
    setPlayingVideo(videoPath);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  if (!map) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-text-secondary">地图不存在</p>
      </div>
    );
  }

  const mapImage = mapId === 'dust2' ? './images/dust2/map2.jpg' : `./images/${mapId}/inferno-map.jpg`;

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/maps"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            返回地图列表
          </Link>

          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
                {map.nameCn}
              </h1>
              <p className="text-text-secondary text-lg mb-4">{map.name}</p>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-primary-secondary rounded-full text-sm text-text-secondary">
                  {map.difficulty}难度
                </span>
                <span className="px-3 py-1 bg-primary-secondary rounded-full text-sm text-text-secondary">
                  {totalLines}个道具
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 道具分类筛选栏 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'all'
                  ? 'bg-accent-cyan text-primary'
                  : 'bg-primary-secondary text-text-secondary hover:text-text-primary border border-primary-border'
              }`}
            >
              全部 ({totalLines})
            </button>
            {categories.map((cat) => {
              const count = countLines(allTactics.filter((t) => t.type === cat.key));
              return (
                <button
                  key={cat.key}
                  onClick={() => { setSelectedType(cat.key); setActiveId(null); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedType === cat.key
                      ? 'bg-accent-cyan text-primary'
                      : 'bg-primary-secondary text-text-secondary hover:text-text-primary border border-primary-border'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 地图平面图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="card rounded-xl overflow-hidden">
            <div className="relative w-full bg-primary-secondary">
              <img
                src={mapImage}
                alt={`${map.nameCn} 平面图`}
                className="w-full h-auto select-none"
                draggable={false}
              />

              {/* 正式道具点位 */}
              {filteredTactics.map((tactic) => {
                const isActive = activeId === tactic.id;
                const lines = tactic.name.split('，');
                const videos = tactic.videos || [];
                const markerImage = getMarkerImage(tactic);
                const isRedCircle = !markerImage && redCircleNames.has(tactic.name);

                return (
                  <div
                    key={tactic.id}
                    className="absolute"
                    style={{
                      left: `${tactic.x}%`,
                      top: `${tactic.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isActive ? 50 : 10,
                    }}
                  >
                    {/* 标记圈 */}
                    <button
                      onClick={() => handleMarkerClick(tactic.id)}
                      className="group block rounded-full relative"
                      style={{ width: '22px', height: '22px' }}
                    >
                      <div
                        className="absolute rounded-full animate-ping opacity-30"
                        style={{
                          width: '30px', height: '30px',
                          left: '-4px', top: '-4px',
                          backgroundColor: markerImage ? '#00d4ff' : isRedCircle ? '#ef4444' : '#3b82f6',
                          animationDuration: '2.5s',
                        }}
                      />
                      {markerImage ? (
                        <img
                          src={markerImage}
                          className="absolute top-0 left-0 rounded-full transition-transform group-hover:scale-110"
                          style={{
                            width: '22px', height: '22px',
                            objectFit: 'cover',
                          }}
                          draggable={false}
                          alt=""
                        />
                      ) : (
                        <div
                          className="absolute top-0 left-0 rounded-full border-2 transition-transform group-hover:scale-110"
                          style={{
                            width: '22px', height: '22px',
                            backgroundColor: isRedCircle ? '#ef4444' : '#3b82f6',
                            borderColor: isRedCircle ? '#ef4444' : '#3b82f6',
                            boxShadow: isRedCircle ? '0 0 10px #ef444460' : '0 0 10px #3b82f660',
                          }}
                        />
                      )}
                    </button>

                    {/* 弹出交互框 */}
                    {isActive && lines.map((line, i) => {
                      const isRight = tactic.id === 'dust2-a-long-6' || tactic.id === 'dust2-ct-7';
                      const videoSrc = videos[i];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="absolute bg-primary border border-primary-border rounded-lg px-3 py-2 shadow-lg z-20 cursor-pointer hover:bg-primary-secondary transition-colors flex items-center gap-2"
                          style={{
                            [isRight ? 'right' : 'left']: '28px',
                            top: `${i * 36}px`,
                            transform: 'translateY(-50%)',
                            minWidth: '100px',
                          }}
                          onClick={() => videoSrc && handlePlayVideo(videoSrc)}
                        >
                          {videoSrc && (
                            <Play className="w-3 h-3 text-accent-cyan flex-shrink-0" />
                          )}
                          <span className="text-sm font-display font-bold text-text-primary whitespace-nowrap">
                            {line}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {selectedType !== 'all' && filteredTactics.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-text-secondary text-sm">该分类下暂无道具</p>
          </motion.div>
        )}
      </div>

      {/* 视频播放器弹窗 */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl bg-primary rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseVideo}
                className="absolute top-3 right-3 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="w-full h-[70vh] bg-black flex items-center justify-center">
                <video
                  key={playingVideo}
                  src={playingVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-fill"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};