import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Database, Brain, Zap, Link, List, CheckCircle, XCircle } from 'lucide-react';

export const ProblemStatement: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-6 lg:px-12 flex flex-col justify-center min-h-full">
      <div className="w-full">
        <div className="mb-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-4 border border-red-100">
            当前局限性
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">基于生成方法的缺陷</h2>
          <p className="text-xl text-slate-500 max-w-3xl">
            虽然基于生成的方法（如 GCR）效率较高，但它们面临两个根本性挑战，阻碍了其可靠地解决复杂的推理任务。
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Challenge 1: Existence != Correctness */}
          <motion.div variants={item} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:border-red-200 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Database className="w-40 h-40" />
            </div>
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">1. 存在性 ≠ 正确性</h3>
            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
              约束解码仅能确保路径在知识图谱中 <em>存在</em>，但不能保证其 <em>正确</em>。
              模型经常生成 <strong>合法但无关</strong> 的路径。
            </p>
            <div className="bg-red-50/50 p-5 rounded-xl border border-red-100 text-sm">
              <div className="font-bold text-red-800 mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" /> Relation Hallucination / Error
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-100/50 shadow-sm font-mono text-xs text-slate-600 space-y-1">
                 <div><span className="text-slate-400">Query:</span> Who directed Inception?</div>
                 <div><span className="text-slate-400">Path:</span> ... -&gt; made_by_studio -&gt; Warner Bros.</div>
                 <div className="flex items-center gap-1 text-red-600 font-bold mt-1">
                   <XCircle className="w-3 h-3" /> KG-Valid but Wrong Relation
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Challenge 2: Semantic Loss */}
          <motion.div variants={item} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:border-amber-200 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Link className="w-40 h-40" />
            </div>
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
              <List className="w-7 h-7 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">2. 语义丢失</h3>
            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
              基于最短路径的训练使模型倾向于学习 <strong>连通性</strong> 而非 <strong>约束条件</strong>。
              问题的隐含约束语义（如 <em>latest</em>, <em>most</em>）经常被系统性地忽略。
            </p>
             <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-100 text-sm">
              <div className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Missing Operator: "Latest"
              </div>
              <div className="bg-white p-3 rounded-lg border border-amber-100/50 shadow-sm font-mono text-xs text-slate-600 space-y-1">
                 <div><span className="text-slate-400">Query:</span> Vienna museum established the <em>latest</em>?</div>
                 <div><span className="text-slate-400">Model:</span> "Museen der Welt", "Museum Wien"...</div>
                 <div className="flex items-center gap-1 text-amber-600 font-bold mt-1">
                   <AlertTriangle className="w-3 h-3" /> Enumerates without checking dates
                 </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Comparison Context */}
        <div className="bg-slate-100 rounded-3xl p-8 lg:p-10 border border-slate-200">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="font-mono text-xs uppercase tracking-wider text-slate-400">范式 1</div>
              <h4 className="font-bold text-xl text-slate-700">基于 Agent</h4>
              <p className="text-sm text-slate-500">迭代交互 (如 ToG)</p>
              <div className="flex gap-2 text-xs text-red-500 font-medium bg-white px-2 py-1 rounded w-fit border border-slate-200">
                 高延迟 & 高成本
              </div>
            </div>

            <div className="space-y-2 opacity-80 hover:opacity-100 transition-all">
              <div className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">范式 2 (GCR)</div>
              <h4 className="font-bold text-xl text-slate-900">基于生成</h4>
              <p className="text-sm text-slate-500">一次性规划 + 约束</p>
              <div className="flex flex-col gap-1">
                 <div className="flex gap-2 text-xs text-green-600 font-medium bg-white px-2 py-1 rounded w-fit border border-slate-200">
                   高效率
                 </div>
                 <div className="flex gap-2 text-xs text-red-500 font-medium bg-white px-2 py-1 rounded w-fit border border-slate-200">
                   存在性 ≠ 正确性
                 </div>
              </div>
            </div>

            <div className="relative p-6 bg-brand-600 rounded-2xl text-white shadow-xl shadow-brand-500/20 transform scale-105 border border-brand-400">
              <div className="absolute -top-3 left-6 bg-white text-brand-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
                我们的方案
              </div>
              <h4 className="font-bold text-xl mt-2">IRC 框架</h4>
              <p className="text-sm text-brand-100 mt-2 leading-relaxed opacity-90">
                感知约束的生成 + KG 引导的修正
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};