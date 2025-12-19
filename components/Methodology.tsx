import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Database, Search, ArrowRight, XCircle, 
  CheckCircle, Zap, Filter, Terminal, GitBranch,
  List, MessageSquare, Network, ChevronRight, Clock, Calendar
} from 'lucide-react';

// Phases of the IRC process
const PHASES = [
  { id: 'gen',     title: '1. Initial Gen', subtitle: 'Main Path' },
  { id: 'blue',    title: '2. Blueprint',   subtitle: 'Decomposition' },
  { id: 'recall1', title: '3. Recall H1',   subtitle: 'Hop 1 Search' },
  { id: 'recall2', title: '4. Recall H2',   subtitle: 'Hop 2 Search' },
  { id: 'select',  title: '5. Selection',   subtitle: 'Reasoning' },
];

export const Methodology: React.FC = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPhaseIndex(prev => (prev + 1) % PHASES.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, [isPaused]);

  // Auto-scroll candidate list when entering selection phase
  useEffect(() => {
    if (phaseIndex === 4 && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [phaseIndex]);

  const currentPhase = PHASES[phaseIndex];

  return (
    <div className="w-full h-full flex flex-col gap-6">
      
      {/* Top Question Context */}
      <div className="w-full bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-5 relative overflow-hidden shrink-0">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-600"></div>
        <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0 text-brand-600">
          <Search className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Question</h3>
          <p className="text-lg font-medium text-slate-800 leading-tight">
            Which team did the person from the film about the <span className="text-brand-600 font-bold bg-brand-50 px-1 rounded">2006 NCAA Men's Basketball Championship</span> play for <span className="text-amber-600 font-bold bg-amber-50 px-1 rounded border border-amber-100">in 2015</span>?
          </p>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="flex-1 grid lg:grid-cols-12 gap-6 min-h-[550px]">
        
        {/* LEFT PANEL: Reasoning Trace */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-4 h-4 text-slate-400" /> Model Reasoning Trace
            </h4>
            <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-green-400 animate-pulse'}`}></div>
               <span className="text-[10px] font-mono text-slate-400 uppercase">{currentPhase.subtitle}</span>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/50 p-6 relative overflow-hidden flex flex-col">
             {/* Subtle background grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

             <AnimatePresence mode="wait">
                
                {/* STATE 0: GENERATION (Main Path Tree) */}
                {phaseIndex === 0 && (
                  <motion.div 
                    key="p0"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="relative z-10 flex flex-col h-full"
                  >
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                      <Terminal className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">Checking Main Path (MPR)</span>
                    </div>

                    <div className="flex-1 relative pl-6 border-l-2 border-slate-100 ml-3 space-y-1">
                      {/* Node 1 */}
                      <div className="relative pb-6 group">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-orange-500 shadow-sm z-10 group-hover:scale-110 transition-transform"></div>
                        <div className="text-[10px] font-mono text-slate-400 mb-1 uppercase tracking-wide">Start Entity</div>
                        <div className="font-bold text-slate-800 text-sm bg-slate-50 border border-slate-200 inline-block px-3 py-1.5 rounded-lg shadow-sm">
                          2006 NCAA Men's Basketball...
                        </div>
                      </div>

                      {/* Edge 1 */}
                      <div className="relative pb-6 group">
                        <div className="absolute -left-[29px] top-2 w-3 h-3 rounded-full bg-slate-200 border-2 border-white z-10"></div>
                        <div className="text-[10px] font-mono text-slate-400 mb-1 uppercase tracking-wide">Hop 1</div>
                        <div className="font-mono text-blue-600 bg-blue-50 border border-blue-100 inline-block px-2 py-1 rounded text-xs">
                          film_subject.films
                        </div>
                      </div>

                      {/* Edge 2 */}
                      <div className="relative pb-6 group">
                         <div className="absolute -left-[29px] top-2 w-3 h-3 rounded-full bg-slate-200 border-2 border-white z-10"></div>
                         <div className="text-[10px] font-mono text-slate-400 mb-1 uppercase tracking-wide">Hop 2</div>
                         <div className="font-mono text-blue-600 bg-blue-50 border border-blue-100 inline-block px-2 py-1 rounded text-xs">
                           sports_team_roster
                         </div>
                      </div>

                      {/* Constraints Block (Restored) */}
                      <div className="relative pb-8 group">
                         <div className="absolute -left-[29px] top-2 w-3 h-3 rounded-full bg-amber-200 border-2 border-white z-10 ring-2 ring-amber-50"></div>
                         <div className="text-[10px] font-mono text-amber-500 mb-1 uppercase tracking-wide flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Temporal Constraints
                         </div>
                         <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-[10px] font-mono text-amber-800 shadow-sm w-fit">
                            <div className="flex items-center gap-2 border-b border-amber-100 pb-1 mb-1">
                               <span className="text-amber-500 font-bold">?from</span> 
                               <span>&lt;= "2015-01-01"</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <span className="text-amber-500 font-bold">?to</span> 
                               <span className="ml-3.5">&gt;= "2015-12-31"</span>
                            </div>
                         </div>
                      </div>

                      {/* Result */}
                      <div className="relative group">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-red-500 shadow-sm z-10"></div>
                        <div className="text-[10px] font-mono text-red-500 mb-1 font-bold uppercase tracking-wide">Execution Result</div>
                        <div className="bg-red-50 text-red-700 font-mono text-xs p-3 rounded-lg border border-red-100 flex items-center gap-2 shadow-sm">
                           <XCircle className="w-4 h-4 flex-shrink-0" />
                           &lt;EMPTY_RESULT&gt;
                           <span className="text-red-400 ml-auto text-[10px] italic">No path found</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STATE 1: BLUEPRINT */}
                {phaseIndex === 1 && (
                   <motion.div 
                    key="p1"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="relative z-10 h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-3">
                      <h3 className="text-lg font-bold text-slate-800">Blueprint</h3>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100">
                         <Zap className="w-3 h-3" /> Recovery Mode
                      </div>
                    </div>

                    <div className="space-y-6 relative flex-1">
                      {/* Connector Line */}
                      <div className="absolute left-6 top-6 bottom-12 w-0.5 bg-slate-100 border-l border-dashed border-slate-300"></div>

                      <div className="relative pl-14 group">
                         <div className="absolute left-[18px] top-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 border-4 border-white shadow-sm z-10 flex items-center justify-center font-bold text-xs">1</div>
                         <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-[0_4px_20px_-10px_rgba(251,191,36,0.4)] group-hover:border-amber-300 transition-colors">
                            <div className="text-[10px] font-bold text-amber-500 mb-1 uppercase tracking-wide">Sub-Goal 1</div>
                            <p className="font-medium text-slate-800 text-sm">Identify the <span className="bg-amber-50 text-amber-900 px-1 rounded">person</span> who starred in the film about the 2006 NCAA Championship.</p>
                         </div>
                      </div>

                      <div className="relative pl-14 group opacity-80 hover:opacity-100 transition-opacity">
                         <div className="absolute left-[18px] top-0 w-8 h-8 rounded-full bg-slate-100 text-slate-500 border-4 border-white shadow-sm z-10 flex items-center justify-center font-bold text-xs">2</div>
                         <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                            <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wide">Sub-Goal 2</div>
                            <p className="font-medium text-slate-700 text-sm">Find which <span className="bg-slate-200 text-slate-800 px-1 rounded">team</span> that person played for <span className="text-amber-600 font-bold">in 2015</span>.</p>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STATE 2: RECALL HOP 1 */}
                {phaseIndex === 2 && (
                   <motion.div 
                    key="p2"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="relative z-10 h-full flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-4 text-brand-700 border-b border-brand-100 pb-3">
                      <Network className="w-4 h-4" />
                      <span className="font-bold text-sm uppercase tracking-wide">Recall Phase: Hop 1</span>
                    </div>

                    <div className="mb-3 text-xs text-slate-500">
                      Querying neighbors of <span className="font-bold text-slate-700">Start Node</span> matching Sub-Goal 1.
                    </div>

                    <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                      <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm relative overflow-hidden">
                         <div className="absolute top-0 right-0 bg-green-500 text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">TOP MATCH</div>
                         <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Recall Set A</div>
                         
                         <div className="space-y-2">
                            <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg border border-green-100">
                              <div className="flex items-center gap-2">
                                <span className="text-green-700 font-mono text-xs font-bold">film.film.starring</span>
                              </div>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            
                            <div className="pl-2 space-y-1.5 opacity-60">
                              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                                film.film.genre
                              </div>
                              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                                film.film.netflix_id
                              </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STATE 3: RECALL HOP 2 */}
                {phaseIndex === 3 && (
                   <motion.div 
                    key="p3"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="relative z-10 h-full flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-4 text-brand-700 border-b border-brand-100 pb-3">
                      <Network className="w-4 h-4" />
                      <span className="font-bold text-sm uppercase tracking-wide">Recall Phase: Hop 2</span>
                    </div>
                    
                    <div className="mb-3 text-xs text-slate-500">
                      Expanding from intermediate nodes (e.g., <span className="font-bold text-slate-700">Joakim Noah</span>) matching Sub-Goal 2.
                    </div>

                    <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                       <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm relative overflow-hidden">
                         <div className="absolute top-0 right-0 bg-green-500 text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">TOP MATCH</div>
                         <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Recall Set B</div>
                         
                         <div className="space-y-2">
                            <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg border border-green-100">
                              <div className="flex items-center gap-2">
                                <span className="text-green-700 font-mono text-xs font-bold">pro_athlete.teams</span>
                              </div>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            
                            <div className="pl-2 space-y-1.5 opacity-60">
                              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                                person.born_in
                              </div>
                              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                                common.topic.notable_for
                              </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STATE 4: SELECTION */}
                {phaseIndex === 4 && (
                   <motion.div 
                    key="p4"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="relative z-10 h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2 text-slate-700">
                        <GitBranch className="w-4 h-4" />
                        <span className="font-bold text-sm">Path Selection</span>
                      </div>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 border border-slate-200 font-mono">Filter & Rank</span>
                    </div>

                    {/* Candidate List - SCROLLABLE */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 bg-slate-900 rounded-xl border border-slate-800 p-3 mb-3 text-[10px] font-mono leading-relaxed text-slate-400 custom-scrollbar shadow-inner relative">
                      
                      {/* Candidate 1 - Highlighted with Filter Logic */}
                      <div className="p-3 mb-2 bg-green-900/10 border border-green-500/30 rounded-lg text-green-50 relative group transition-colors hover:bg-green-900/20">
                        <div className="absolute -left-[1px] top-3 w-1 h-6 bg-green-500 rounded-r shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start gap-2">
                               <span className="font-bold text-green-400 whitespace-nowrap">Candidate 1:</span>
                               <span className="leading-relaxed opacity-90">
                                  2006 NCAA...
                                  <span className="mx-1 text-slate-500">-&gt;</span>
                                  <span className="text-green-300 font-bold border-b border-green-500/30">film.film.starring</span>
                                  <span className="mx-1 text-slate-500">-&gt;</span>
                                  (Joakim Noah)
                                  <span className="mx-1 text-slate-500">-&gt;</span>
                                  <span className="text-green-300 font-bold border-b border-green-500/30">pro_athlete.teams</span>
                               </span>
                            </div>
                            
                            {/* Constraint Visualization inside Text Panel */}
                            <div className="ml-4 pl-3 border-l border-slate-700/50 space-y-1.5 mt-1">
                                <div className="text-amber-400 flex items-center gap-2 text-[9px] uppercase tracking-wider font-bold">
                                    <Filter className="w-3 h-3" /> Applying Constraint: "2015"
                                </div>
                                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                                    <span className="text-red-400/70 line-through decoration-red-500/30">Florida Gators</span>
                                    <span className="text-slate-500">(2004-2007) ❌</span>
                                    
                                    <span className="text-green-400 font-bold">Chicago Bulls</span>
                                    <span className="text-slate-300">(2007-2016) ✅</span>
                                </div>
                            </div>
                        </div>
                      </div>

                      {/* Other Candidates */}
                      <div className="p-2 pl-3 mb-1 opacity-50 hover:opacity-80 transition-opacity">
                        <span className="font-bold text-slate-500 mr-2">Candidate 2:</span>
                        ... -&gt; film.starring -&gt; person.born_in -&gt; New York
                      </div>
                      <div className="p-2 pl-3 mb-1 opacity-50 hover:opacity-80 transition-opacity">
                        <span className="font-bold text-slate-500 mr-2">Candidate 3:</span>
                        ... -&gt; film.genre -&gt; Sports -&gt; (Context Mismatch)
                      </div>
                      <div className="p-2 pl-3 mb-1 opacity-30">
                         <span className="italic">... [Candidates 4-10 truncated]</span>
                      </div>
                    </div>

                    {/* LLM Reasoning Box */}
                    <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-3 shadow-lg shrink-0">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
                        <MessageSquare className="w-3 h-3 text-brand-600" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">LLM Final Decision</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-700 font-medium">
                        <span className="text-slate-400 font-bold uppercase text-[9px]">Reasoning:</span> The main path is empty (&lt;EMPTY_RESULT&gt;), which means it does not provide any useful information to answer the question. Candidate paths 1, 2, 3, and 4 all lead to the teams associated with players from the film about the 2006 NCAA Men's Basketball Championship, specifically mentioning the Florida Gators men's basketball team. These candidates are relevant as they directly connect the film to the teams played by the athletes. Among these, Candidate 1 and Candidate 2 are the most straightforward as they directly link the film to the teams through the actor's performance. Therefore, they are the most helpful for answering the question.
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Model: gpt-4o-mini</span>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                          <CheckCircle className="w-3 h-3" />
                          Answer: Chicago Bulls
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>

        {/* RIGHT PANEL: Graph Execution */}
        <div className="lg:col-span-7 flex flex-col gap-3">
           <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-400" /> Knowledge Graph View
            </h4>
             <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-full">
               {PHASES.map((p, i) => (
                 <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === phaseIndex ? 'w-6 bg-brand-600' : 'w-2 bg-slate-300'}`} 
                  title={p.title}
                 />
               ))}
             </div>
          </div>

          <div className="flex-1 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden relative border border-slate-800 min-h-[400px]">
             {/* Dynamic Graph Background */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
             
             {/* Center Stage */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-[600px] max-h-[400px]">
                  
                  {/* START NODE: 2006 NCAA - Always visible */}
                  <motion.div 
                    layout
                    className="absolute left-[40px] top-[180px] z-20"
                  >
                     <div className="bg-orange-600 text-white px-4 py-3 rounded-xl shadow-[0_0_40px_rgba(234,88,12,0.4)] border border-orange-400/50 flex flex-col items-center min-w-[120px] backdrop-blur-sm">
                        <span className="text-[9px] font-bold uppercase text-orange-200 tracking-wider">Start Entity</span>
                        <span className="font-bold text-sm text-center">2006 NCAA<br/>Championship</span>
                     </div>
                  </motion.div>

                  {/* PHASE 0: FAILED PATH */}
                  {phaseIndex === 0 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                      <defs>
                        <marker id="arrow-fail" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                        </marker>
                      </defs>
                      <motion.path 
                        d="M 160 215 L 400 215" 
                        stroke="#ef4444" strokeWidth="2" strokeDasharray="6,6" fill="none"
                        markerEnd="url(#arrow-fail)"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      />
                      <foreignObject x="220" y="175" width="160" height="40">
                        <div className="flex flex-col items-center">
                           <span className="text-slate-400 text-[10px] bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">film_subject.films</span>
                           <span className="text-red-500 text-xs font-bold mt-1 bg-red-950/50 px-2 rounded border border-red-900/50">X Broken Path</span>
                        </div>
                      </foreignObject>
                    </svg>
                  )}

                  {/* PHASE 2: RECALL HOP 1 (Fan out) */}
                  {phaseIndex === 2 && (
                    <>
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                         {/* Branch 1 (Selected) */}
                         <motion.path 
                           d="M 160 215 C 220 215, 220 100, 300 100" 
                           stroke="#3b82f6" strokeWidth="3" fill="none"
                           initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                         />
                         {/* Branch 2 */}
                         <motion.path 
                           d="M 160 215 C 220 215, 220 160, 300 160" 
                           stroke="#64748b" strokeWidth="1" strokeDasharray="4,4" fill="none"
                           initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1 }}
                         />
                         {/* Branch 3 */}
                         <motion.path 
                           d="M 160 215 C 220 215, 220 240, 300 240" 
                           stroke="#64748b" strokeWidth="1" strokeDasharray="4,4" fill="none"
                           initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }}
                         />
                      </svg>

                      {/* Relation Labels */}
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="absolute left-[310px] top-[90px]">
                         <span className="text-blue-300 font-mono text-xs bg-blue-900/50 px-2 py-1 rounded border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]">film.film.starring</span>
                      </motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="absolute left-[310px] top-[150px]">
                         <span className="text-slate-500 font-mono text-[10px]">film.film.genre</span>
                      </motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="absolute left-[310px] top-[230px]">
                         <span className="text-slate-500 font-mono text-[10px]">common.topic...</span>
                      </motion.div>
                    </>
                  )}

                  {/* PHASE 3 & 4: RECALL HOP 2 & FINAL SELECTION */}
                  {(phaseIndex === 3 || phaseIndex === 4) && (
                     <>
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        {/* Hop 1 */}
                        <motion.path 
                          d="M 160 215 C 220 215, 220 120, 300 120" 
                          stroke="#3b82f6" strokeWidth="3" fill="none"
                          initial={{ pathLength: 1 }} 
                        />
                        
                        {/* Hop 2 (Noah to Bulls - Top Branch) */}
                        <motion.path 
                          d="M 400 120 C 440 120, 440 80, 480 80" 
                          stroke={phaseIndex === 4 ? "#22c55e" : "#3b82f6"} 
                          strokeWidth="3" fill="none"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }}
                        />

                         {/* Hop 2 (Noah to Gators - Bottom Branch - Only visible in Selection Phase for context) */}
                         <motion.path 
                          d="M 400 120 C 440 120, 440 180, 480 180" 
                          stroke={phaseIndex === 4 ? "#ef4444" : "transparent"} 
                          strokeWidth="2" strokeDasharray="4,4" fill="none"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }}
                        />
                      </svg>

                      {/* Intermediate Node: Joakim Noah */}
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="absolute left-[300px] top-[95px] z-20"
                      >
                         <div className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-blue-400 min-w-[100px] flex flex-col items-center">
                            <span className="text-[9px] font-bold uppercase text-blue-200">Intermediate</span>
                            <span className="font-bold text-sm">Joakim Noah</span>
                         </div>
                      </motion.div>

                      {/* Hop 2 Relation Label (Phase 3 only) */}
                      {phaseIndex === 3 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute left-[380px] top-[80px]">
                           <span className="text-blue-300 font-mono text-xs bg-blue-900/50 px-2 py-1 rounded border border-blue-500/50">pro_athlete.teams</span>
                        </motion.div>
                      )}
                      
                      {/* Filter Badge (Phase 4 only) */}
                      {phaseIndex === 4 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 }}
                          className="absolute left-[410px] top-[110px] z-40 bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-1 rounded border border-amber-300 shadow-sm flex items-center gap-1"
                        >
                          <Filter className="w-3 h-3" />
                          <span>Constraint: 2015</span>
                        </motion.div>
                      )}

                      {/* Final Node: Chicago Bulls (Correct) */}
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}
                        className="absolute left-[480px] top-[50px] z-30"
                      >
                         <div className={`transition-all duration-500 text-white px-5 py-3 rounded-xl border-2 min-w-[140px] ${
                            phaseIndex === 4 
                              ? 'bg-green-600 border-green-400 shadow-[0_0_50px_rgba(34,197,94,0.6)] scale-105' 
                              : 'bg-slate-800 border-slate-700 opacity-40 grayscale'
                         }`}>
                            <div className="flex items-center gap-2 mb-1">
                               <span className={`text-[10px] font-bold uppercase tracking-wider ${phaseIndex === 4 ? 'text-green-100' : 'text-slate-400'}`}>Answer</span>
                               {phaseIndex === 4 && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                            <span className="font-bold text-sm block whitespace-nowrap">Chicago Bulls</span>
                         </div>
                         {/* Temporal Tag */}
                         {phaseIndex === 4 && (
                            <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay:0.8}} className="absolute -right-2 -top-3 bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-green-200 shadow-sm whitespace-nowrap">
                                2007-2016
                            </motion.div>
                         )}
                      </motion.div>

                      {/* Final Node: Florida Gators (Incorrect - Phase 4) */}
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}
                        className={`absolute left-[480px] top-[150px] z-30 ${phaseIndex !== 4 ? 'hidden' : ''}`}
                      >
                         <div className="bg-slate-800 border-2 border-red-900/50 opacity-60 px-5 py-3 rounded-xl min-w-[140px] grayscale">
                            <div className="flex items-center gap-2 mb-1">
                               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Rejected</span>
                               <XCircle className="w-3 h-3 text-red-500" />
                            </div>
                            <span className="font-bold text-sm block whitespace-nowrap text-slate-400 line-through decoration-red-500/50">Florida Gators</span>
                         </div>
                         {/* Temporal Tag */}
                         <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay:0.9}} className="absolute -right-2 -top-3 bg-red-100 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-red-200 shadow-sm whitespace-nowrap">
                            2004-2007
                         </motion.div>
                      </motion.div>

                    </>
                  )}

                </div>
             </div>

             {/* Graph Legend Overlay */}
             <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur p-3 rounded-xl border border-slate-700 text-[10px] text-slate-300 space-y-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div> Start Entity
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div> Recalled Node
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div> Correct Answer
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer / Controls */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0 shadow-sm">
         <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            {PHASES.map((p, i) => (
              <button
                key={i}
                onClick={() => { setPhaseIndex(i); setIsPaused(true); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap border text-left ${
                  i === phaseIndex 
                    ? 'bg-slate-800 text-white border-slate-800 shadow-md ring-2 ring-slate-200' 
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                   i === phaseIndex ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-500'
                }`}>
                  {i + 1}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold leading-none">{p.title}</span>
                </div>
              </button>
            ))}
         </div>

         <div className="flex items-center gap-3">
           <button 
             onClick={() => setIsPaused(!isPaused)}
             className={`px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-colors border flex items-center gap-2 ${
               isPaused 
                 ? 'bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100' 
                 : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
             }`}
           >
             {isPaused ? <ArrowRight className="w-3 h-3"/> : <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>}
             {isPaused ? "Resume" : "Auto-Playing"}
           </button>
         </div>
      </div>

    </div>
  );
};