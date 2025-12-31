
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const SidebarItem: React.FC<{ to: string; label: string; icon: React.ReactNode; active?: boolean }> = ({ to, label, icon, active }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ x: 6, backgroundColor: "rgba(255,255,255,0.03)" }}
      className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all relative group overflow-hidden ${
        active 
          ? 'text-sky-400' 
          : 'text-slate-500 hover:text-slate-200'
      }`}
    >
      {active && (
        <>
          <motion.div 
            layoutId="sidebar-active"
            className="absolute inset-0 bg-sky-500/5 border border-sky-500/20 rounded-xl"
          />
          <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] rounded-full" />
        </>
      )}
      <div className={`relative z-10 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-105'}`}>
        {icon}
      </div>
      <span className="text-[11px] font-black uppercase tracking-[0.15em] relative z-10">{label.replace('_', ' ')}</span>
    </motion.div>
  </Link>
);

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { 
      to: '/dashboard', 
      label: 'Core_Overview', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> 
    },
    { 
      to: '/dashboard/tasks', 
      label: 'Assignments', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> 
    },
    { 
      to: '/dashboard/profile', 
      label: 'User_Protocol', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> 
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-300 overflow-hidden font-sans">
      {/* Background Spotlight */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.08]"
        style={{ 
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, #38bdf8, transparent 80%)` 
        }}
      />

      {/* Sidebar Mobile Toggle */}
      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 glass rounded-xl text-white shadow-2xl border-sky-500/30"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 glass border-r border-white/5 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-8 relative z-20">
          <div className="flex items-center gap-4 mb-14 px-2">
            <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
               <span className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">Nexus</span>
               <span className="text-[9px] font-bold text-sky-500 tracking-[0.4em] uppercase mt-1">Industrial.v4</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map(item => (
              <SidebarItem 
                key={item.to}
                {...item} 
                active={location.pathname === item.to} 
              />
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <div className="p-4 glass rounded-2xl mb-6 relative group cursor-pointer overflow-hidden border-sky-500/10 hover:border-sky-500/30 transition-all">
               <div className="flex items-center gap-3 relative z-10">
                  <img src={user?.avatar} alt="" className="w-10 h-10 rounded-lg border border-sky-400/20 object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black text-white truncate uppercase tracking-tight">{user?.name}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 mono">UID: {user?.id.slice(0, 6)}</p>
                  </div>
               </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-red-400 hover:text-white hover:bg-red-500/20 border-red-500/10"
              onClick={handleLogout}
            >
              <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Terminate_Session
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 lg:p-14 overflow-x-hidden min-h-screen relative z-10">
        <header className="mb-14 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(56,189,248,1)]" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.6em] mono">System.Operational.Node_01</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter italic uppercase leading-tight">
              {menuItems.find(i => i.to === location.pathname)?.label.replace('_', ' ') || 'Overview'}
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6 glass p-2 rounded-2xl border-white/10"
          >
            <div className="flex items-center gap-3 px-5 py-2 border-r border-white/5">
                <span className="mono text-[10px] font-bold text-sky-400 uppercase tracking-widest">Sys_Load:</span>
                <span className="mono text-[10px] font-bold text-white">0.04s</span>
            </div>
            <button className="p-3 hover:bg-white/5 rounded-xl transition-all relative group">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-3 right-3 w-2 h-2 bg-sky-400 rounded-full border-2 border-[#020617] animate-pulse"></span>
            </button>
            <div className="w-[1px] h-8 bg-white/5" />
            <Link to="/dashboard/profile" className="flex items-center gap-3 pr-3 hover:opacity-80 transition-opacity">
              <img src={user?.avatar} alt="" className="w-10 h-10 rounded-xl border border-white/10" />
            </Link>
          </motion.div>
        </header>

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
