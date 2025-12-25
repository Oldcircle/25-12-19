import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

type MetricKey = 'hits' | 'f1' | 'hit';
type DatasetKey = 'webqsp' | 'cwq';

const DATASETS: { key: DatasetKey; label: string }[] = [
  { key: 'webqsp', label: 'WebQSP' },
  { key: 'cwq', label: 'CWQ' },
];

const METRICS: { key: MetricKey; label: string }[] = [
  { key: 'hits', label: 'Hits@1' },
  { key: 'f1', label: 'F1' },
  { key: 'hit', label: 'Hit' },
];

type TableRow = {
  type: string;
  method: string;
  webqsp: Record<MetricKey, string>;
  cwq: Record<MetricKey, string>;
  highlight?: boolean;
};

const TABLE_DATA: TableRow[] = [
  { type: '', method: 'Llama-2-7B', webqsp: { hits: '56.4', f1: '36.5', hit: '-' }, cwq: { hits: '28.4', f1: '21.4', hit: '-' } },
  { type: '', method: 'Llama-3.1-8B', webqsp: { hits: '55.5', f1: '34.8', hit: '-' }, cwq: { hits: '28.1', f1: '22.4', hit: '-' } },
  { type: '', method: 'ChatGPT', webqsp: { hits: '59.3', f1: '43.5', hit: '-' }, cwq: { hits: '34.7', f1: '30.2', hit: '-' } },
  { type: '', method: 'ChatGPT+CoT', webqsp: { hits: '73.5', f1: '38.5', hit: '-' }, cwq: { hits: '47.5', f1: '31.0', hit: '-' } },
  { type: '', method: 'ChatGPT+SC', webqsp: { hits: '83.5', f1: '63.4', hit: '-' }, cwq: { hits: '56.0', f1: '48.1', hit: '-' } },
  { type: 'IR-based Methods', method: 'KV-Mem', webqsp: { hits: '46.7', f1: '34.5', hit: '-' }, cwq: { hits: '21.1', f1: '15.7', hit: '-' } },
  { type: '', method: 'PullNet', webqsp: { hits: '68.1', f1: '-', hit: '-' }, cwq: { hits: '47.2', f1: '-', hit: '-' } },
  { type: '', method: 'EmbedKGQA', webqsp: { hits: '66.6', f1: '-', hit: '-' }, cwq: { hits: '44.7', f1: '-', hit: '-' } },
  { type: '', method: 'NSM+h', webqsp: { hits: '74.3', f1: '67.4', hit: '-' }, cwq: { hits: '48.8', f1: '44.0', hit: '-' } },
  { type: '', method: 'TransferNet', webqsp: { hits: '71.4', f1: '-', hit: '-' }, cwq: { hits: '48.6', f1: '-', hit: '-' } },
  { type: '', method: 'Subgraph Retrieval', webqsp: { hits: '69.5', f1: '64.1', hit: '-' }, cwq: { hits: '50.2', f1: '47.1', hit: '-' } },
  { type: 'LLM-based', method: 'ToG (ChatGPT)', webqsp: { hits: '-', f1: '-', hit: '76.2' }, cwq: { hits: '-', f1: '-', hit: '57.6' } },
  { type: '', method: 'ToG (GPT-4)', webqsp: { hits: '-', f1: '-', hit: '82.6' }, cwq: { hits: '-', f1: '-', hit: '68.5' } },
  { type: '', method: 'EffiQA', webqsp: { hits: '-', f1: '-', hit: '82.9' }, cwq: { hits: '-', f1: '-', hit: '69.5' } },
  { type: '', method: 'RoG (Llama-2-7B)', webqsp: { hits: '85.7', f1: '70.8', hit: '-' }, cwq: { hits: '62.6', f1: '56.2', hit: '-' } },
  { type: '', method: 'GNN-RAG-RA', webqsp: { hits: '82.8', f1: '73.5', hit: ' 90.7' }, cwq: { hits: '62.8', f1: '60.4', hit: '68.7' } },
  { type: '', method: 'GCR (Llama-3.1-8b)', webqsp: { hits: '84.5', f1: '75.3', hit: '92.2' }, cwq: { hits: '64.4', f1: '62.9', hit: '75.8' } },
  { type: '', method: 'IRC (gpt-4o-mini, summary)', webqsp: { hits: '87.2', f1: '78.6', hit: '89.2' }, cwq: { hits: '83.7', f1: '81.3', hit: '88.0' } },
  { type: '', method: 'IRC-RA (gpt-4o-mini, summary)', webqsp: { hits: '88.7', f1: '81.5', hit: '92.1' }, cwq: { hits: '80.6', f1: '79.1', hit: '86.5' } },
  { type: '', method: 'IRC (Llama-2-7B)', webqsp: { hits: '88.4', f1: '85.5', hit: '-' }, cwq: { hits: '88.9', f1: '83.0', hit: '-' }, highlight: true },
  { type: '', method: 'IRC (Llama-3.1-8b)', webqsp: { hits: '89.2', f1: '85.8', hit: '92.2' }, cwq: { hits: '89.8', f1: '83.7', hit: '93.6' }, highlight: true },
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
                <th className="px-6 py-4 font-bold tracking-wider">Type</th>
                <th className="px-6 py-4 font-bold tracking-wider">Method</th>
                {DATASETS.map((d, i) => (
                  <th key={d.key} className={`px-6 py-4 text-center font-bold tracking-wider ${i === 0 ? 'border-l border-slate-200' : ''}`} colSpan={METRICS.length}>
                    {d.label}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-6 py-2"></th>
                <th className="px-6 py-2"></th>
                {DATASETS.map((d, di) =>
                  METRICS.map((m, mi) => (
                    <th
                      key={`${d.key}-${m.key}`}
                      className={`px-3 py-2 text-center font-bold tracking-wider text-slate-700 ${di === 0 && mi === 0 ? 'border-l border-slate-200' : ''} bg-slate-100/50`}
                    >
                      {m.label}
                    </th>
                  ))
                )}
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
                  {DATASETS.map((d, di) =>
                    METRICS.map((m, mi) => (
                      <td
                        key={`${index}-${d.key}-${m.key}`}
                        className={`px-6 py-3 text-center ${di === 0 && mi === 0 ? 'border-l border-slate-100' : ''} w-[100px] ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}
                      >
                        {row[d.key][m.key]}
                      </td>
                    ))
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
