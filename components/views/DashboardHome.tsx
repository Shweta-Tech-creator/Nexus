
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const StatCard: React.FC<{ label: string; value: string; trend: string; isPositive: boolean; icon: React.ReactNode }> = ({ label, value, trend, isPositive, icon }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="glass bracket p-8 rounded-3xl shadow-xl border-white/5 relative group overflow-hidden"
  >
    {/* Active Scanline */}
    <div className="scanline" />
    
    <div className={`absolute -right-10 -top-10 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-10 transition-all duration-700 rounded-full ${isPositive ? 'bg-sky-500' : 'bg-red-500'}`}></div>

    <div className="flex items-center justify-between mb-8 relative z-10">
      <div className="p-3 glass rounded-xl text-sky-400 border-sky-500/20 group-hover:border-sky-400/50 transition-colors">
        {icon}
      </div>
      <div className={`mono text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
        {trend}
      </div>
    </div>
    
    <div className="space-y-1 relative z-10">
      <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-1">{label}</p>
      <h3 className="text-4xl font-black text-white tracking-tighter italic uppercase leading-none mono">{value}</h3>
    </div>

    {/* Precision Visualizer */}
    <div className="mt-8 flex items-end gap-1.5 h-10 opacity-10 group-hover:opacity-40 transition-all duration-500">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div 
          key={i} 
          initial={{ height: 0 }}
          animate={{ height: `${Math.random() * 80 + 20}%` }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5 + Math.random() }}
          className={`flex-1 rounded-sm ${isPositive ? 'bg-sky-400' : 'bg-red-400'}`}
        />
      ))}
    </div>
  </motion.div>
);

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Financial_Flux" 
          value="$14.2M" 
          trend="+84.2%" 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          label="Neural_Latency" 
          value="02ms" 
          trend="OPTIMIZED" 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        />
        <StatCard 
          label="System_Uptime" 
          value="99.9%" 
          trend="STABLE" 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
        />
        <StatCard 
          label="Error_Vector" 
          value="0.04%" 
          trend="-0.01%" 
          isPositive={false} 
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass bracket p-10 rounded-3xl relative overflow-hidden group border-white/5 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter italic uppercase leading-none">Cluster_Performance_Log</h3>
              <p className="text-slate-500 text-[10px] font-bold mt-2 uppercase tracking-[0.4em] mono">Real-time Telemetry Feed &bull; Node_742</p>
            </div>
            <div className="flex gap-3">
               <div className="px-5 py-2 glass rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest border-white/10">Archive</div>
               <div className="px-5 py-2 glass rounded-xl text-[9px] font-black text-sky-400 uppercase tracking-widest border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.2)]">Live_Feed</div>
            </div>
          </div>
          
          <div className="h-80 flex items-end justify-between gap-6 px-4">
            {[45, 65, 30, 90, 100, 75, 85, 60, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                <div className="w-full relative">
                   <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ delay: i * 0.05, duration: 1.2, ease: "circOut" }}
                    className="w-full bg-gradient-to-t from-sky-500/10 via-sky-400/40 to-sky-300 rounded-lg relative overflow-hidden border border-white/5"
                  >
                    <motion.div 
                      animate={{ y: [0, -200, 0] }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent" 
                    />
                  </motion.div>
                </div>
                <span className="mono text-[9px] font-bold text-slate-600 uppercase tracking-widest group-hover/bar:text-sky-400 transition-colors">ND_{i}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass bracket p-10 rounded-3xl flex flex-col border-white/5 shadow-2xl relative overflow-hidden">
          <div className="scanline" />
          <h3 className="text-2xl font-black text-white tracking-tighter italic uppercase leading-none mb-10">System_Audits</h3>
          <div className="space-y-8 flex-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-start gap-5 group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-all group-hover:scale-110 ${i % 2 === 0 ? 'bg-sky-500/10 text-sky-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={i % 2 === 0 ? "M9 12l2 2 4-4" : "M13 10V3L4 14h7v7l9-11h-7z"} />
                   </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white leading-tight group-hover:text-sky-400 transition-colors uppercase tracking-tight truncate">
                    {i % 2 === 0 ? 'Security_Protocol_Initialized' : 'Buffer_Overflow_Mitigated'}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                     <span className="mono text-[9px] text-slate-500 font-bold uppercase tracking-widest">{i * 6}m ago</span>
                     <div className="w-1 h-1 bg-slate-700 rounded-full" />
                     <span className="mono text-[9px] text-sky-400 font-bold">SHA_{i}f8x</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-8 py-4 uppercase text-[10px] tracking-[0.4em] font-black border-white/10">Review_Full_Logs</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
