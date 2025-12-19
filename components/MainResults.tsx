import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const TABLE_DATA = [
  { type: 'LLM Reasoning', method: 'Qwen2-0.5B', webqsp: { hits: '26.2', f1: '17.2' }, cwq: { hits: '12.5', f1: '11.0' } },
  { type: '', method: 'Llama-2-7B', webqsp: { hits: '56.4', f1: '36.5' }, cwq: { hits: '28.4', f1: '21.4' } },
  { type: '', method: 'Llama-3.1-8B', webqsp: { hits: '55.5', f1: '34.8' }, cwq: { hits: '28.1', f1: '22.4' } },
  { type: '', method: 'ChatGPT', webqsp: { hits: '59.3', f1: '43.5' }, cwq: { hits: '34.7', f1: '30.2' } },
  { type: '', method: 'ChatGPT+CoT', webqsp: { hits: '73.5', f1: '38.5' }, cwq: { hits: '47.5', f1: '31.0' } },
  { type: '', method: 'ChatGPT+SC', webqsp: { hits: '83.5', f1: '63.4' }, cwq: { hits: '56.0', f1: '48.1' } },
  
  { type: 'IR-based Methods', method: 'KV-Mem', webqsp: { hits: '46.7', f1: '34.5' }, cwq: { hits: '21.1', f1: '15.7' } },
  { type: '', method: 'PullNet', webqsp: { hits: '68.1', f1: '-' }, cwq: { hits: '47.2', f1: '-' } },
  { type: '', method: 'EmbedKGQA', webqsp: { hits: '66.6', f1: '-' }, cwq: { hits: '44.7', f1: '-' } },
  { type: '', method: 'NSM+h', webqsp: { hits: '74.3', f1: '67.4' }, cwq: { hits: '48.8', f1: '44.0' } },
  { type: '', method: 'TransferNet', webqsp: { hits: '71.4', f1: '-' }, cwq: { hits: '48.6', f1: '-' } },
  { type: '', method: 'Subgraph Retrieval', webqsp: { hits: '69.5', f1: '64.1' }, cwq: { hits: '50.2', f1: '47.1' } },
  
  { type: 'LLM-based', method: 'ToG (ChatGPT)', webqsp: { hits: '76.2', f1: '-' }, cwq: { hits: '57.6', f1: '-' } },
  { type: '', method: 'ToG (GPT-4)', webqsp: { hits: '82.6', f1: '-' }, cwq: { hits: '68.5', f1: '-' } },
  { type: '', method: 'InteractiveKBQA', webqsp: { hits: '72.5', f1: '-' }, cwq: { hits: '59.2', f1: '-' } },
  { type: '', method: 'EffiQA', webqsp: { hits: '82.9', f1: '-' }, cwq: { hits: '69.5', f1: '-' } },
  { type: '', method: 'RoG (Llama-2-7B)', webqsp: { hits: '85.7', f1: '70.8' }, cwq: { hits: '62.6', f1: '56.2' } },
  { type: '', method: 'GNN-RAG', webqsp: { hits: '82.8', f1: '73.5' }, cwq: { hits: '62.8', f1: '60.4' } },
  { type: '', method: 'GCR (Llama-3.1)', webqsp: { hits: '84.5', f1: '75.3' }, cwq: { hits: '64.4', f1: '62.9' } },
  
  { type: '', method: 'IRC (Llama-2-7B)', webqsp: { hits: '88.4', f1: '85.5' }, cwq: { hits: '88.9', f1: '83.0' }, highlight: true },
  { type: '', method: 'IRC (Llama-3.1-8B)', webqsp: { hits: '89.2', f1: '85.8' }, cwq: { hits: '89.8', f1: '83.7' }, highlight: true },
];

export const MainResults: React.FC = () => {
  return (
    <section className="w-full h-full max-w-7xl mx-auto py-8 px-6 lg:px-12 flex flex-col justify-center">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
          <Trophy className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Main Experiment Results</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0">
        <div className="overflow-auto custom-scrollbar flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Type</th>
                <th scope="col" className="px-6 py-4 font-bold tracking-wider">Method</th>
                <th scope="col" className="px-6 py-4 text-center border-l border-slate-200" colSpan={2}>
                  WebQSP
                  <div className="flex justify-around mt-1 text-[10px] text-slate-400">
                    <span className="w-1/2">Hits@1</span>
                    <span className="w-1/2">F1</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-center border-l border-slate-200" colSpan={2}>
                  CWQ
                   <div className="flex justify-around mt-1 text-[10px] text-slate-400">
                    <span className="w-1/2">Hits@1</span>
                    <span className="w-1/2">F1</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TABLE_DATA.map((row, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  viewport={{ once: true }}
                  className={`${row.highlight ? 'bg-brand-50/50 hover:bg-brand-50' : 'hover:bg-slate-50'} transition-colors`}
                >
                  <td className="px-6 py-3 font-medium text-slate-500 text-xs">{row.type}</td>
                  <td className={`px-6 py-3 font-medium ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-800'}`}>
                    {row.method}
                  </td>
                  
                  {/* WebQSP */}
                  <td className={`px-6 py-3 text-center border-l border-slate-100 w-[100px] ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>
                    {row.webqsp.hits}
                  </td>
                  <td className={`px-6 py-3 text-center w-[100px] ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>
                    {row.webqsp.f1}
                  </td>

                  {/* CWQ */}
                  <td className={`px-6 py-3 text-center border-l border-slate-100 w-[100px] ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>
                    {row.cwq.hits}
                  </td>
                  <td className={`px-6 py-3 text-center w-[100px] ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>
                    {row.cwq.f1}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};