import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw, Terminal, Search, Brain } from 'lucide-react';
import { SimulationStep } from '../types';

const STEPS: SimulationStep[] = [
  {
    id: 1,
    title: "Verify (MPR)",
    description: "Initial Path Check",
    status: 'error',
    details: {
      action: "Q: Which team did the person from the film about the 2006 NCAA Men's Basketball Championship play for?",
      path: "Generated MPR: ... -> film_subject.films -> pro_athlete.teams -> <EMPTY_RESULT>\nSystem: Path is syntactically valid but semantically unreachable in KG."
    }
  },
  {
    id: 2,
    title: "Decompose",
    description: "Reasoning Blueprint",
    status: 'processing',
    details: {
      action: "LLM Generates Plan:\n#1 Identify person in film (relations: portrayed_by, actor)\n#2 Determine team person played for (relations: member_of, roster)"
    }
  },
  {
    id: 3,
    title: "Recall (Depth 1)",
    description: "Expand & Select",
    status: 'processing',
    details: {
      action: "Start Node: 2006 NCAA Men's Basketball...\nRecall: Found 10+ relations.\nScoring vs Blueprint Step 1:\n> Path 1: ...-> film.starring -> Joakim Noah (Score: 0.74)\n> Path 2: ...-> film.genre -> Sports (Score: 0.31)\nSelection: Path 1"
    }
  },
  {
    id: 4,
    title: "Recall (Depth 2)",
    description: "Expand & Select",
    status: 'processing',
    details: {
      action: "Current Node: Joakim Noah\nRecall: Found 8+ relations.\nScoring vs Blueprint Step 2:\n> Path 1: ...-> sports_team.roster -> Chicago Bulls (Score: 0.88)\n> Path 2: ...-> born_in -> New York (Score: 0.12)\nSelection: Path 1"
    }
  },
  {
    id: 5,
    title: "Success",
    description: "Final Answer",
    status: 'success',
    details: {
      action: "Final Path Constructed.",
      path: "Answer: Chicago Bulls"
    }
  }
];

export const Simulation: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying && currentStepIndex < STEPS.length - 1) {
      interval = setInterval(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 3500);
    } else if (currentStepIndex === STEPS.length - 1) {
      setIsAutoPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentStepIndex]);

  const reset = () => {
    setCurrentStepIndex(0);
    setIsAutoPlaying(false);
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-6 lg:px-12 flex flex-col justify-center min-h-full">
      <div className="w-full">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-4 uppercase tracking-wider border border-slate-200">
            Log Replay
          </div>
          <h2 className="text-4xl font-bold text-slate-900">System Trace Simulation</h2>
          <p className="text-slate-500 mt-3 text-lg">Live simulation of the IRC process executing on a complex temporal query.</p>
        </div>

        {/* Control Bar */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 text-sm ${
              isAutoPlaying 
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                : 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/30'
            }`}
          >
            {isAutoPlaying ? 'Pause' : 'Start Simulation'}
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-2 text-sm shadow-sm"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
        </div>

        {/* Steps Visualization */}
        <div className="grid lg:grid-cols-5 gap-4 relative mb-12">
          {STEPS.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isPast = index < currentStepIndex;
            
            let Icon = Terminal;
            if (index === 0) Icon = XCircle;
            else if (index === 1) Icon = Brain;
            else if (index > 1 && index < 4) Icon = Search;
            else if (index === 4) Icon = CheckCircle;

            return (
              <div key={step.id} className="relative flex flex-col items-center z-10 group">
                {/* Connector */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-[2px] -z-10 bg-slate-100">
                     <motion.div 
                       className="h-full bg-brand-500"
                       initial={{ width: '0%' }}
                       animate={{ width: isPast ? '100%' : '0%' }}
                       transition={{ duration: 0.5 }}
                     />
                  </div>
                )}

                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    borderColor: isActive ? '#0ea5e9' : isPast ? '#0ea5e9' : '#e2e8f0',
                    backgroundColor: isActive ? '#fff' : isPast ? '#f0f9ff' : '#fff',
                    boxShadow: isActive ? '0 10px 30px -5px rgba(14, 165, 233, 0.3)' : '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center mb-5 bg-white transition-all duration-300 relative"
                >
                   <Icon className={`w-8 h-8 ${isActive ? 'text-brand-500' : isPast ? 'text-brand-400' : 'text-slate-300'}`} />
                   {isActive && (
                     <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                      </span>
                   )}
                </motion.div>
                <div className={`text-center transition-all duration-300 ${isActive ? 'opacity-100 transform translate-y-0' : 'opacity-60'}`}>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Console Output */}
        <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-800 w-full max-w-4xl mx-auto">
           <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
             <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-500/80" />
               <div className="w-3 h-3 rounded-full bg-amber-500/80" />
               <div className="w-3 h-3 rounded-full bg-green-500/80" />
             </div>
             <span className="ml-3 text-xs font-mono text-slate-500 opacity-70">irc_trace_log.txt</span>
           </div>
           <div className="p-6 h-[200px] font-mono text-sm leading-relaxed overflow-y-auto custom-scrollbar flex flex-col justify-end">
              <motion.div 
                key={currentStepIndex}
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {STEPS[currentStepIndex].details?.action && (
                  <div className="text-emerald-400 whitespace-pre-wrap">
                    <span className="text-slate-600 mr-3 select-none">$</span>
                    {STEPS[currentStepIndex].details?.action}
                  </div>
                )}
                {STEPS[currentStepIndex].details?.path && (
                  <div className="text-slate-300 mt-2 bg-slate-900/50 p-4 rounded-lg border-l-2 border-brand-500">
                    {STEPS[currentStepIndex].details.path}
                  </div>
                )}
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};