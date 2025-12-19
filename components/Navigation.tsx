import React from 'react';
import { NavItem, SectionId } from '../types';
import { Menu, BookOpen, GitBranch, BarChart2, CheckCircle, Zap, Layers, ScanSearch } from 'lucide-react';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

const items: { id: SectionId; label: string; icon: React.ElementType }[] = [
  { id: 'intro', label: 'Overview', icon: BookOpen },
  { id: 'problem', label: 'The Problem', icon: GitBranch },
  { id: 'method', label: 'IRC Method', icon: Menu },
  { id: 'main-results', label: 'Main Results', icon: BarChart2 },
  { id: 'efficiency', label: 'Efficiency', icon: Zap },
  { id: 'ablation', label: 'Ablation Study', icon: Layers },
  { id: 'semantic', label: 'Semantic Check', icon: ScanSearch },
  { id: 'conclusion', label: 'Conclusion', icon: CheckCircle },
];

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  return (
    <nav className="fixed left-0 top-0 h-screen w-20 lg:w-64 bg-slate-900 text-white flex flex-col py-8 z-50 border-r border-slate-800 shadow-xl transition-all duration-300">
      <div className="px-4 mb-10 flex items-center justify-center lg:justify-start gap-3">
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shrink-0">
          <span className="font-bold text-white">IRC</span>
        </div>
        <span className="hidden lg:block font-bold text-xl tracking-tight">Paper Report</span>
      </div>

      <div className="flex-1 space-y-2 px-2 lg:px-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
              activeSection === item.id
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
            <span className="hidden lg:block font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="px-4 mt-auto hidden lg:block">
        <div className="bg-slate-800 rounded-xl p-4 text-xs text-slate-400">
          <p className="font-semibold text-slate-300 mb-1">Iterative Retrieval & Correction</p>
          <p>Presented by Frontend AI</p>
        </div>
      </div>
    </nav>
  );
};