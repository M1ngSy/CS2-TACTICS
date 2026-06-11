import { Crosshair, Target, Map, Flag, Shield } from 'lucide-react';
import { TacticType } from '../types';

interface TypeIconProps {
  type: TacticType;
  className?: string;
}

export const tacticTypeConfig: Record<TacticType, { icon: typeof Crosshair; color: string; bgColor: string; label: string }> = {
  'A大进攻': { icon: Crosshair, color: 'text-tactic-fire', bgColor: 'bg-tactic-fire/20', label: 'A大进攻' },
  'A小进攻': { icon: Target, color: 'text-tactic-flash', bgColor: 'bg-tactic-flash/20', label: 'A小进攻' },
  '沙地进攻': { icon: Map, color: 'text-accent-cyan', bgColor: 'bg-accent-cyan/20', label: '沙地进攻' },
  'B区进攻': { icon: Flag, color: 'text-tactic-smoke', bgColor: 'bg-tactic-smoke/20', label: 'B区进攻' },
  'CT道具': { icon: Shield, color: 'text-tactic-grenade', bgColor: 'bg-tactic-grenade/20', label: 'CT道具' },
  'A1进攻': { icon: Crosshair, color: 'text-tactic-fire', bgColor: 'bg-tactic-fire/20', label: 'A1进攻' },
  '飞二楼': { icon: Target, color: 'text-tactic-flash', bgColor: 'bg-tactic-flash/20', label: '飞二楼' },
  '链接进攻': { icon: Map, color: 'text-accent-cyan', bgColor: 'bg-accent-cyan/20', label: '链接进攻' },
  'A进攻': { icon: Crosshair, color: 'text-tactic-fire', bgColor: 'bg-tactic-fire/20', label: 'A进攻' },
};

export const TacticTypeIcon = ({ type, className = '' }: TypeIconProps) => {
  const config = tacticTypeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`p-2 rounded-lg ${config.bgColor} ${className}`}>
      <Icon className={`w-5 h-5 ${config.color}`} />
    </div>
  );
};

export const difficultyColors: Record<string, string> = {
  '入门': 'bg-green-500/20 text-green-400 border-green-500/50',
  '进阶': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  '高级': 'bg-red-500/20 text-red-400 border-red-500/50',
};
