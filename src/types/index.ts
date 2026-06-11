export type TacticCategory =
  | 'A大进攻'
  | 'A小进攻'
  | '沙地进攻'
  | 'B区进攻'
  | 'CT道具';

export interface Map {
  id: string;
  name: string;
  nameCn: string;
  thumbnail: string;
  difficulty: '入门' | '进阶' | '高级';
  tacticCount: number;
}

export interface Tactic {
  id: string;
  mapId: string;
  type: TacticCategory;
  name: string;
  description: string;
  steps: string[];
  image: string;
  videos: string[];
  difficulty: '入门' | '进阶' | '高级';
  tags: string[];
  x: number;
  y: number;
}

export type TacticType = Tactic['type'];
export type Difficulty = Tactic['difficulty'];
