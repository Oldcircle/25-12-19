import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const EFFICIENCY_DATA = [
  { type: 'Generation-based', method: 'GNN-RAG', f1: '73.5', hits: '82.8', calls: '1', tokens: '414' },
  { type: '', method: 'RoG', f1: '70.8', hits: '85.7', calls: '2', tokens: '521' },
  { type: '', method: 'GCR', f1: '75.3', hits: '84.5', calls: '2', tokens: '231' },
  
  { type: 'Agent-based', method: 'ToG', f1: '-', hits: '75.1', calls: '11.6', tokens: '7,069' },
  { type: '', method: 'EffiQA', f1: '-', hits: '82.9', calls: '7.3', tokens: '-' },
  
  { type: '', method: 'Ours', f1: '86.1', hits: '89.1', calls: '1.2', tokens: '166', highlight: true },
];

export const EfficiencyResults: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-6 lg:px-12 flex flex-col justify-center min-h-full">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider mb-4 border border-green-200">
          <Zap className="w-3 h-3" /> Cost & Performance
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Efficiency Analysis</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-bold tracking-wider">Type</th>
              <th scope="col" className="px-6 py-4 font-bold tracking-wider">Method</th>
              <th scope="col" className="px-6 py-4 text-center font-bold tracking-wider text-slate-700 bg-slate-100/50">F1</th>
              <th scope="col" className="px-6 py-4 text-center font-bold tracking-wider text-slate-700 bg-slate-100/50">Hits@1</th>
              <th scope="col" className="px-6 py-4 text-center font-bold tracking-wider">Avg. # LLM Calls</th>
              <th scope="col" className="px-6 py-4 text-center font-bold tracking-wider">Avg. # LLM Tokens</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {EFFICIENCY_DATA.map((row, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${row.highlight ? 'bg-brand-50/50' : 'hover:bg-slate-50'} transition-colors`}
              >
                <td className="px-6 py-4 font-medium text-slate-400 text-xs">{row.type}</td>
                <td className={`px-6 py-4 font-bold ${row.highlight ? 'text-brand-700' : 'text-slate-800'}`}>
                  {row.method}
                </td>
                <td className={`px-6 py-4 text-center bg-slate-50/30 ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>{row.f1}</td>
                <td className={`px-6 py-4 text-center bg-slate-50/30 ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>{row.hits}</td>
                <td className="px-6 py-4 text-center text-slate-600">{row.calls}</td>
                <td className="px-6 py-4 text-center text-slate-600 font-mono text-xs">{row.tokens}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};