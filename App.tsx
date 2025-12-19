import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { ProblemStatement } from './components/ProblemStatement';
import { Methodology } from './components/Methodology';
import { MainResults } from './components/MainResults';
import { EfficiencyResults } from './components/EfficiencyResults';
import { AblationStudy } from './components/AblationStudy';
import { SemanticConsistency } from './components/SemanticConsistency';
import { Conclusion } from './components/Conclusion';
import { ChevronLeft, ChevronRight, Layout } from 'lucide-react';

const SLIDES = [
  { id: 'title', component: Hero, title: 'Introduction' },
  { id: 'problem', component: ProblemStatement, title: 'Problem Statement' },
  { id: 'method', component: Methodology, title: 'Our Methodology (IRC)' },
  { id: 'main-results', component: MainResults, title: 'Main Experiment Results' },
  { id: 'efficiency', component: EfficiencyResults, title: 'Efficiency Analysis' },
  { id: 'ablation', component: AblationStudy, title: 'Ablation Study' },
  { id: 'semantic', component: SemanticConsistency, title: 'Semantic Consistency' },
  { id: 'conclusion', component: Conclusion, title: 'Conclusion' }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        if (currentSlide < SLIDES.length - 1) setCurrentSlide(curr => curr + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) setCurrentSlide(curr => curr - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const CurrentComponent = SLIDES[currentSlide].component;

  return (
    <div className="bg-slate-50 h-screen w-screen overflow-hidden flex flex-col font-sans text-slate-900">
      {/* PPT Header/Toolbar */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-2">
           <div className="bg-brand-600 p-1 rounded text-white">
             <Layout className="w-4 h-4" />
           </div>
           <span className="font-bold text-slate-700 text-sm">IRC Framework Presentation</span>
        </div>
        
        {/* Progress Dots */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
           {SLIDES.map((_, idx) => (
             <button 
               key={idx}
               onClick={() => setCurrentSlide(idx)}
               className={`transition-all duration-300 rounded-full ${
                 idx === currentSlide 
                   ? 'w-8 h-2 bg-brand-600' 
                   : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
               }`}
               title={SLIDES[idx].title}
             />
           ))}
        </div>

        <div className="text-xs font-mono text-slate-400 font-medium">
          Slide {currentSlide + 1} / {SLIDES.length}
        </div>
      </header>

      {/* Slide Viewport */}
      <main className="flex-1 relative overflow-hidden bg-slate-50">
        <div className="w-full h-full overflow-y-auto custom-scrollbar">
           {/* 
              We adjust the container based on the slide type.
              Methodology (Slide 2) requires full height for its dashboard layout.
              Tables also benefit from full height scrolling.
           */}
           <div className={`w-full min-h-full flex flex-col ${
             currentSlide === 2 ? 'p-4 lg:p-6 h-full' : 'p-0'
           }`}>
             <CurrentComponent />
           </div>
        </div>
      </main>

      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 flex gap-3 z-50">
        <button 
          onClick={() => setCurrentSlide(curr => Math.max(0, curr - 1))}
          disabled={currentSlide === 0}
          className="p-3 bg-white rounded-full shadow-lg border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
          title="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setCurrentSlide(curr => Math.min(SLIDES.length - 1, curr + 1))}
          disabled={currentSlide === SLIDES.length - 1}
          className="p-3 bg-brand-600 rounded-full shadow-lg shadow-brand-500/30 text-white disabled:opacity-50 disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-brand-700 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
          title="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default App;