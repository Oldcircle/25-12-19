import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Calendar } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center px-8 lg:px-16 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-100/50 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-5xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium mb-8 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-600"></span>
            </span>
            Knowledge Base Question Answering (KBQA)
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-8">
            Iterative Retrieval <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
              and Correction
            </span>
          </h1>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl border border-slate-200 shadow-2xl text-left max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-6 bg-brand-500 rounded-full" />
            <h3 className="text-xl font-bold text-slate-900">摘要</h3>
          </div>
          <p className="text-slate-700 leading-relaxed text-lg text-justify">
            本文提出了 <strong className="text-brand-700">IRC (Iterative Retrieval and Correction)</strong>，这是一种两阶段框架，旨在缓解基于大模型的复杂 KBQA 中的事实幻觉问题。
            通过结合生成的灵活性与结构化验证，IRC 引入了
            <span className="font-mono text-sm bg-brand-50 text-brand-700 px-2 py-0.5 mx-1.5 rounded border border-brand-100 font-bold">MPR 生成</span>
            和
            <span className="font-mono text-sm bg-brand-50 text-brand-700 px-2 py-0.5 mx-1.5 rounded border border-brand-100 font-bold">KG 引导的修正</span>。
            该方法通过迭代检索证据来修复不存在或错误的关系，在保持高效率的同时，显著减少了由语义无关路径引起的错误。
          </p>
        </motion.div>
      </div>
    </section>
  );
};