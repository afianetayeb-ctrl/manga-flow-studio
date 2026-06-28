import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  viewAllLink?: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, icon: Icon, viewAllLink, children }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between border-b pb-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        {children}
        {viewAllLink && (
          <Button variant="link" asChild className="text-muted-foreground hover:text-primary">
            <Link to={viewAllLink}>عرض الكل</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
