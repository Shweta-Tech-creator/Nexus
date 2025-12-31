
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '../../types';
import { mockApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const TasksView: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user) {
      mockApi.getTasks(user.id).then(data => {
        setTasks(data);
        setIsLoading(false);
      });
    }
  }, [user]);

  const filteredTasks = tasks.filter(t => {
    const matchesFilter = filter === 'all' || t.status === filter;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = async (id: string) => {
    await mockApi.deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTask = await mockApi.createTask({
      userId: user!.id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: 'todo',
      priority: (formData.get('priority') as any) || 'medium',
    });
    setTasks(prev => [newTask, ...prev]);
    setIsModalOpen(false);
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center p-32 space-y-4">
      <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-400 animate-spin rounded-full shadow-[0_0_15px_rgba(56,189,248,0.4)]"></div>
      <span className="mono text-[10px] text-sky-400 font-bold uppercase tracking-[0.5em] animate-pulse">Syncing_Task_Registry...</span>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="flex p-1.5 glass rounded-2xl w-fit border-white/5 shadow-xl">
          {['all', 'todo', 'in-progress', 'done'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                filter === f ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {filter === f && (
                <motion.div layoutId="filter-active" className="absolute inset-0 bg-sky-500/10 border border-sky-400/30 rounded-xl" />
              )}
              <span className="relative z-10">{f.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="relative group">
            <svg className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Filter_Archives..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3.5 glass rounded-2xl text-[11px] font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/10 w-full sm:w-80 transition-all uppercase tracking-widest placeholder:text-slate-700"
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="md" className="rounded-2xl px-8 shadow-2xl">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
            Injest_Task
          </Button>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map(task => (
            <motion.div
              layout
              key={task.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 rounded-3xl border-white/5 relative bracket group hover:border-sky-500/20 transition-all duration-500 shadow-xl"
            >
              <div className="flex items-start justify-between mb-6">
                <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border ${
                  task.priority === 'high' ? 'bg-red-500/5 text-red-400 border-red-500/20' :
                  task.priority === 'medium' ? 'bg-amber-500/5 text-amber-400 border-amber-500/20' :
                  'bg-emerald-500/5 text-emerald-400 border-emerald-500/20'
                }`}>
                  PRTY_{task.priority}
                </span>
                <button 
                  onClick={() => handleDelete(task.id)}
                  className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
              
              <h4 className="text-xl font-black text-white mb-3 group-hover:text-sky-400 transition-colors uppercase italic tracking-tighter truncate">{task.title}</h4>
              <p className="text-slate-500 text-[11px] mb-8 leading-relaxed font-medium line-clamp-2 h-8">{task.description}</p>
              
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full relative ${
                    task.status === 'done' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]' :
                    task.status === 'in-progress' ? 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]' : 'bg-slate-700'
                  }`}>
                    {task.status !== 'todo' && <span className="absolute inset-0 rounded-full animate-ping bg-current opacity-40"></span>}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{task.status.replace('-', '_')}</span>
                </div>
                <span className="mono text-[8px] text-slate-600 font-bold uppercase tracking-widest">#{task.id.slice(0, 4)}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTasks.length === 0 && (
          <div className="col-span-full py-24 text-center glass rounded-3xl border-dashed border-white/10 flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center border-white/5 text-slate-700">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Null_Set_Detected</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">System awaiting assignment ingestion.</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg glass rounded-[2.5rem] p-12 border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="scanline" />
              <h2 className="text-4xl font-black text-white mb-10 tracking-tighter uppercase italic">Directive_Entry</h2>
              <form onSubmit={handleCreate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-sky-400 uppercase tracking-[0.4em] ml-1">Objective_Alias</label>
                  <input required name="title" className="w-full px-6 py-4 glass rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-base font-bold uppercase tracking-tight italic" placeholder="System Analysis..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-sky-400 uppercase tracking-[0.4em] ml-1">Context_Parameters</label>
                  <textarea name="description" rows={3} className="w-full px-6 py-4 glass rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 resize-none font-medium text-xs leading-relaxed" placeholder="Define constraints..." />
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[9px] font-black text-sky-400 uppercase tracking-[0.4em] ml-1">Priority</label>
                     <select name="priority" className="w-full px-6 py-4 glass rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 font-black uppercase tracking-widest text-[10px] appearance-none cursor-pointer">
                        <option value="low">Low_Tier</option>
                        <option value="medium">Med_Tier</option>
                        <option value="high">High_Tier</option>
                     </select>
                   </div>
                   <div className="flex items-end gap-3">
                      <Button type="button" variant="ghost" className="flex-1 rounded-2xl py-4" onClick={() => setIsModalOpen(false)}>Abort</Button>
                      <Button type="submit" className="flex-1 rounded-2xl py-4">Commit</Button>
                   </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksView;
