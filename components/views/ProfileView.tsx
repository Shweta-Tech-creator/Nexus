
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const ProfileView: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    await updateProfile({
      name: formData.get('name') as string,
    });
    setIsLoading(false);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* HUD Identity Panel */}
      <div className="glass bracket p-10 rounded-[2.5rem] relative overflow-hidden border-white/5 shadow-2xl">
        <div className="scanline" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[120px] rounded-full"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="relative group">
            <img 
              src={user?.avatar} 
              alt="" 
              className="w-40 h-40 rounded-3xl object-cover border-2 border-white/10 shadow-2xl group-hover:border-sky-400/50 transition-all duration-500"
            />
            <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-3xl transition-opacity">
              <button className="p-3 bg-sky-500 rounded-xl text-white shadow-xl hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter italic uppercase leading-tight">{user?.name}</h2>
              <p className="text-sky-400 font-bold uppercase tracking-[0.3em] text-[11px] mono mt-1">{user?.email}</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-5 py-2 glass rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest border-white/5 mono">
                EST_ {new Date(user?.joinedAt || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
              <div className="px-5 py-2 glass rounded-xl text-[9px] font-black text-emerald-400 uppercase tracking-widest border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                Access_Level_04
              </div>
            </div>
          </div>

          <Button variant="ghost" className="rounded-2xl border-white/10 px-8" onClick={() => setIsEditing(true)}>
            Edit_Protocol
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass bracket p-8 rounded-3xl border-white/5 space-y-8">
          <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Identity_Sec_Controls</h3>
          <div className="space-y-4">
            {[
              { label: 'Neural_Sync_Auth', sub: 'Enable 2FA via mobile terminal', active: false },
              { label: 'Telemetry_Updates', sub: 'Push logs to central relay', active: true }
            ].map((item, idx) => (
              <div key={idx} className="p-5 glass rounded-2xl flex items-center justify-between border-white/5 group hover:border-white/10 transition-all">
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-white uppercase tracking-tight">{item.label}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{item.sub}</p>
                </div>
                <div className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${item.active ? 'bg-sky-500' : 'bg-slate-800'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass bracket p-8 rounded-3xl border-white/5 space-y-8">
          <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Telemetry_Metadata</h3>
          <div className="space-y-3">
            {[
              { label: 'Status', value: 'Operational', color: 'text-emerald-400' },
              { label: 'Kernel', value: 'v2.4.0-stable', color: 'text-white' },
              { label: 'Uptime', value: '42d 12h 4s', color: 'text-white' }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between py-4 border-b border-white/5 last:border-0 group">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mono">{item.label}</span>
                <span className={`mono text-[10px] font-bold uppercase tracking-widest transition-all group-hover:tracking-[0.2em] ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Identity Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditing(false)} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md glass rounded-[2.5rem] p-12 border-white/10 shadow-3xl overflow-hidden"
            >
              <div className="scanline" />
              <h2 className="text-4xl font-black text-white mb-10 tracking-tighter uppercase italic">Patch_Identity</h2>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-sky-400 uppercase tracking-[0.4em] ml-1">Alias_ID</label>
                  <input name="name" defaultValue={user?.name} required className="w-full px-6 py-4 glass rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 font-bold uppercase tracking-tight italic" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1">Secure_Relay (Read_Only)</label>
                  <input disabled value={user?.email} className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-slate-500 font-medium text-xs opacity-50 cursor-not-allowed" />
                </div>
                <div className="flex gap-4 pt-6">
                  <Button type="button" variant="ghost" className="flex-1 rounded-2xl py-4" onClick={() => setIsEditing(false)}>Abort</Button>
                  <Button type="submit" className="flex-1 rounded-2xl py-4" isLoading={isLoading}>Apply</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileView;
