export interface Category {
  name: string;
  items: Word[];
}

export interface Word {
  label: string;
  tip?: string;
  level: 'easy' | 'medium' | 'hard';
}

export interface WordWithCategory extends Word {
  categoryName: string;
}