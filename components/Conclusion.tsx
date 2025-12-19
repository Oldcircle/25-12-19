import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { CheckCircle, Zap, Shield } from 'lucide-react';

const data = [
  { name: 'Standard LLM', accuracy: 45, hallucination: 60, fill: '#94a3b8' },
  { name: 'Agent (ToG)', accuracy: 65, hallucination: 30, fill: '#64748b' },
  { name: 'IRC (Ours)', accuracy: 82, hallucination: 10, fill: '#0ea5e9' },
];

export const Conclusion: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-6 lg:px-12 flex flex-col justify-center min-h-full">
      <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Empirical Validation</h2>
          </div>
          <p className="text-slate-600 mb-8 text-lg leading-relaxed">
            Experiments on <strong>WebQSP</strong> and <strong>CWQ</strong> benchmarks demonstrate that IRC achieves significantly higher accuracy while minimizing hallucination rates, outperforming both standard LLMs and expensive Agent-based approaches.
          </p>

          <div className="h-[320px] w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-xl shadow-slate-100/50">
            <h4 className="text-xs font-bold text-slate-400 mb-6 text-center uppercase tracking-widest">Accuracy Comparison (%)</h4>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={data} barSize={48}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Bar dataKey="accuracy" name="Accuracy" radius={[6, 6, 0, 0]}>
                   {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <div className="bg-slate-900 text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
             {/* Decorative gradients */}
             <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20 -ml-10 -mb-10" />
             
             <h3 className="text-3xl font-bold mb-10 relative z-10 flex items-center gap-3">
               <Shield className="w-8 h-8 text-brand-400" /> Key Takeaways
             </h3>
             
             <ul className="space-y-8 relative z-10">
               <li className="flex gap-5">
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm text-brand-300 border border-white/10">1</div>
                 <div>
                   <h4 className="font-bold text-xl text-white">Complementarity</h4>
                   <p className="text-slate-400 text-sm mt-2 leading-relaxed">LLM generation provides the semantic blueprint, while KG grounding ensures factual validity. They cover each other's blind spots.</p>
                 </div>
               </li>
               <li className="flex gap-5">
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm text-brand-300 border border-white/10">2</div>
                 <div>
                   <h4 className="font-bold text-xl text-white">Efficiency</h4>
                   <p className="text-slate-400 text-sm mt-2 leading-relaxed">IRC avoids the high computational cost and latency of open-ended agent exploration by using targeted retrieval.</p>
                 </div>
               </li>
               <li className="flex gap-5">
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm text-brand-300 border border-white/10">3</div>
                 <div>
                   <h4 className="font-bold text-xl text-white">Semantic Fidelity</h4>
                   <p className="text-slate-400 text-sm mt-2 leading-relaxed">The MPR structure captures complex constraints (temporal, comparative) that standard path-finding methods systematically miss.</p>
                 </div>
               </li>
             </ul>

             <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">Thank you for viewing</p>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};