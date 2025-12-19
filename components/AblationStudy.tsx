import React from 'react';
import { motion } from 'framer-motion';
import { Layers, TrendingDown, CheckCircle2 } from 'lucide-react';

const ABLATION_DATA = [
  { variant: 'Our (Llama-2-7B + GPT-4o-mini)', webqsp: { f1: '85.5', hit: '88.4', acc: '80.4' }, cwq: { f1: '83.0', hit: '88.9', acc: '78.7' }, highlight: true },
  { variant: 'w/o generation', webqsp: { f1: '74.9', hit: '84.7', acc: '53.3' }, cwq: { f1: '59.1', hit: '67.2', acc: '46.3' } },
  { variant: 'w/o KG-correction', webqsp: { f1: '83.5', hit: '86.6', acc: '78.1' }, cwq: { f1: '81.9', hit: '87.5', acc: '77.6' } },
  { variant: 'w/ random path', webqsp: { f1: '81.1', hit: '83.8', acc: '76.6' }, cwq: { f1: '80.2', hit: '84.8', acc: '76.2' } },
  { variant: 'w/ first path', webqsp: { f1: '83.2', hit: '86.0', acc: '78.5' }, cwq: { f1: '80.5', hit: '85.2', acc: '76.6' } },
];

export const AblationStudy: React.FC = () => {
  return (
    <section className="w-full h-full max-w-7xl mx-auto py-8 px-6 lg:px-12 flex flex-col justify-center">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
          <Layers className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Ablation Study</h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 h-full min-h-0">
        <div className="lg:col-span-8 flex flex-col min-h-0">
           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0">
            <div className="overflow-auto custom-scrollbar flex-1">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-bold tracking-wider">Variants</th>
                    <th scope="col" className="px-6 py-4 text-center border-l border-slate-200" colSpan={3}>
                      WebQSP
                      <div className="flex justify-around mt-1 text-[10px] text-slate-400">
                        <span className="w-1/3">F1</span>
                        <span className="w-1/3">Hit@1</span>
                        <span className="w-1/3">Acc</span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-4 text-center border-l border-slate-200" colSpan={3}>
                      CWQ
                       <div className="flex justify-around mt-1 text-[10px] text-slate-400">
                        <span className="w-1/3">F1</span>
                        <span className="w-1/3">Hit@1</span>
                        <span className="w-1/3">Acc</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ABLATION_DATA.map((row, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`${row.highlight ? 'bg-brand-50/50 hover:bg-brand-50' : 'hover:bg-slate-50'} transition-colors`}
                    >
                      <td className={`px-6 py-4 font-medium text-sm ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-700'}`}>
                        {row.variant}
                      </td>
                      
                      {/* WebQSP */}
                      <td className={`px-4 py-3 text-center border-l border-slate-100 ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>{row.webqsp.f1}</td>
                      <td className={`px-4 py-3 text-center ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>{row.webqsp.hit}</td>
                      <td className={`px-4 py-3 text-center ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>{row.webqsp.acc}</td>

                      {/* CWQ */}
                      <td className={`px-4 py-3 text-center border-l border-slate-100 ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>{row.cwq.f1}</td>
                      <td className={`px-4 py-3 text-center ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>{row.cwq.hit}</td>
                      <td className={`px-4 py-3 text-center ${row.highlight ? 'text-brand-700 font-bold' : 'text-slate-600'}`}>{row.cwq.acc}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-brand-600" />
              消融实验分析
            </h3>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed text-justify">
              <p>
                实验结果强有力地验证了 IRC 框架中 <strong className="text-brand-700">MPR 生成</strong> 和 <strong className="text-brand-700">KG 引导修正</strong> 两个核心模块的有效性。
              </p>
              
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h4 className="font-bold text-slate-800 text-xs mb-1">1. 模块不可或缺</h4>
                <p className="text-xs">
                  去除生成模块 (w/o generation) 或修正模块 (w/o KG-correction) 均导致性能显著下降，表明两者缺一不可。
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h4 className="font-bold text-slate-800 text-xs mb-1">2. 修正机制的深度价值</h4>
                 <p className="text-xs">
                   通过与 "w/ random path" (随机替换) 和 "w/ first path" (首选替换) 的对比发现，单纯将路径替换为 KG 中存在的任意路径并不能带来最佳性能。
                 </p>
                 <div className="flex items-start gap-2 mt-2 pt-2 border-t border-slate-200/50">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="text-xs text-green-700 font-medium">
                       证明提升源于修正过程筛选出了与问题语义<span className="underline decoration-green-300 decoration-2 underline-offset-2">高度相关且正确</span>的路径。
                    </span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};