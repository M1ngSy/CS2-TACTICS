import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crosshair, Menu, X, Star } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const favorites = useUserStore((state) => state.favorites);

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/maps', label: '地图' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-md border-b border-primary-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-accent-cyan/20 rounded-lg group-hover:bg-accent-cyan/30 transition-colors">
              <Crosshair className="w-6 h-6 text-accent-cyan" />
            </div>
            <span className="font-display font-bold text-xl text-text-primary">
              CS2<span className="text-accent-cyan">TACTICS</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-display text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent-cyan after:transition-all hover:after:w-full ${
                  isActive(item.path) ? 'text-accent-cyan' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/favorites"
              className={`flex items-center gap-2 font-display text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent-cyan after:transition-all hover:after:w-full ${
                isActive('/favorites') ? 'text-accent-cyan' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Star className="w-4 h-4" />
              收藏
              {favorites.length > 0 && (
                <span className="px-1.5 py-0.5 text-xs bg-accent-cyan text-primary rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-primary-secondary border-t border-primary-border">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 font-display text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'text-accent-cyan' : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/favorites"
              className="flex items-center gap-2 py-2 font-display text-sm font-medium text-text-secondary hover:text-text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Star className="w-4 h-4" />
              收藏
              {favorites.length > 0 && (
                <span className="px-1.5 py-0.5 text-xs bg-accent-cyan text-primary rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
