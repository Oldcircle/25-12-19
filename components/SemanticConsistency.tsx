import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanSearch, Divide, Check, Ban, Search, BarChart3, TrendingUp, GitMerge } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CHART_DATA = [
  {
    name: 'EXACT_EQUAL',
    label: 'Exact Match',
    description: '子问题完全一致，语义无丢失',
    gcr: 352,
    irc: 1210,
    gcr_f1: 78.3,
    irc_f1: 89.2,
  },
  {
    name: 'PARTIAL_OVERLAP',
    label: 'Partial Overlap',
    description: '部分重叠，有部分相同的子问题也有不同的',
    gcr: 1697,
    irc: 2141,
    gcr_f1: 62.0,
    irc_f1: 81.6,
  },
  {
    name: 'RECON_SUBSET',
    label: 'Subset',
    description: '重构问题的子问题是原始问题子问题集合的子集，缺失语义',
    gcr: 405,
    irc: 88,
    gcr_f1: 69.2,
    irc_f1: 85.2,
  },
  {
    name: 'DISJOINT',
    label: 'Disjoint',
    description: '完全无关不相交',
    gcr: 812,
    irc: 50,
    gcr_f1: 56.6,
    irc_f1: 45.8,
  }
];

export const SemanticConsistency: React.FC = () => {
  const [viewMode, setViewMode] = useState<'count' | 'performance'>('count');

  return (
    <section className="w-full h-full max-w-7xl mx-auto py-8 px-6 lg:px-12 flex flex-col justify-center">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
             <ScanSearch className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Semantic Consistency Check</h2>
        </div>
        <p className="text-slate-500 max-w-4xl">
          为了验证生成的推理路径是否忠实于原始问题，我们使用大模型将路径重构回自然语言问题，并对比原问题与重构问题的<strong>子问题分解（Decomposition）</strong>一致性。
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 min-h-0 flex-1">
        {/* Chart Area */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xl p-6 flex flex-col">
           <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">
               {viewMode === 'count' ? 'Category Distribution (Sample Count)' : 'Performance Comparison (Avg. F1 Score)'}
             </h3>
             
             {/* Toggle Controls */}
             <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
               <button
                 onClick={() => setViewMode('count')}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                   viewMode === 'count' 
                     ? 'bg-white text-brand-600 shadow-sm ring-1 ring-slate-200' 
                     : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 <BarChart3 className="w-3.5 h-3.5" /> Distribution
               </button>
               <button
                 onClick={() => setViewMode('performance')}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                   viewMode === 'performance' 
                     ? 'bg-white text-brand-600 shadow-sm ring-1 ring-slate-200' 
                     : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 <TrendingUp className="w-3.5 h-3.5" /> Performance
               </button>
             </div>
           </div>

           <div className="flex-1 min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart
                 data={CHART_DATA}
                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
               >
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                 />
                 <Legend wrapperStyle={{paddingTop: '20px'}} />
                 <Bar 
                    dataKey={viewMode === 'count' ? "gcr" : "gcr_f1"} 
                    name="Baseline (GCR)" 
                    fill="#94a3b8" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={800}
                 />
                 <Bar 
                    dataKey={viewMode === 'count' ? "irc" : "irc_f1"} 
                    name="Ours (IRC)" 
                    fill="#0ea5e9" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={800}
                 />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Analysis Cards */}
        <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
           <AnimatePresence mode="wait">
             <motion.div 
               key="exact"
               initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}}
               className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-green-200 transition-colors"
             >
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-green-50 text-green-600 rounded-lg shrink-0">
                      <Check className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-sm">Exact Equal (完全一致)</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-1 mb-2">
                        IRC: 1210 (F1 89.2) | GCR: 352 (F1 78.3)
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
                        IRC 在保持语义完整性方面具有显著优势，且在完全一致的情况下性能更优 (+10.9 F1)。
                      </p>
                   </div>
                </div>
             </motion.div>

             <motion.div 
               key="partial"
               initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.15}}
               className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-200 transition-colors"
             >
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                      <GitMerge className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-sm">Partial Overlap (部分重叠)</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-1 mb-2">
                        IRC: 2141 (F1 81.6) | GCR: 1697 (F1 62.0)
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
                        存在部分相同的子问题。虽然语义未完全匹配，但 IRC 在此类情况下的性能仍远优于 GCR (+19.6 F1)。
                      </p>
                   </div>
                </div>
             </motion.div>

             <motion.div 
               key="subset"
               initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}}
               className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-amber-200 transition-colors"
             >
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                      <Divide className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-sm">Subset (缺失语义)</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-1 mb-2">
                        IRC: 88 (F1 85.2) | GCR: 405 (F1 69.2)
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
                        重构问题的子问题是原始问题子问题集合的子集。IRC 极少遗漏关键语义，且性能优异。
                      </p>
                   </div>
                </div>
             </motion.div>

             <motion.div 
               key="disjoint"
               initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}}
               className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-red-200 transition-colors"
             >
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                      <Ban className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-sm">Disjoint (完全无关)</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-1 mb-2">
                         IRC: 50 | GCR: 812
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
                        GCR 产生了大量语义完全偏离的严重幻觉。IRC 几乎消除了这种情况 (降至 1.4%)。
                      </p>
                   </div>
                </div>
             </motion.div>
             
             <motion.div 
               key="conclusion"
               initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4}}
               className="p-4 bg-blue-50 border border-blue-100 rounded-xl"
             >
               <h4 className="text-xs font-bold text-blue-800 uppercase mb-2 flex items-center gap-2">
                 <Search className="w-3 h-3" /> 实验结论
               </h4>
               <p className="text-xs text-blue-900 leading-relaxed">
                 通过子问题重构实验证明：<strong>IRC 生成的推理路径不仅 factual correct，而且包含了更加完整的语义信息</strong>，与原问题的意图高度一致。
               </p>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
};