import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface EmptyProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function Empty({ icon: Icon, title, description }: EmptyProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16')}>
      <div className="p-6 bg-primary-secondary rounded-full mb-6">
        <Icon className="w-12 h-12 text-text-secondary" />
      </div>
      <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-text-secondary text-center max-w-md">
        {description}
      </p>
    </div>
  );
}
