
import React, { useEffect, useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, Variants, useSpring, useMotionValue } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const FloatingNode: React.FC<{ index: number }> = ({ index }) => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 10;
  const randomDuration = 15 + Math.random() * 20;

  return (
    <motion.div
      initial={{ y: '110vh', x: `${randomX}%`, opacity: 0 }}
      animate={{
        y: '-10vh',
        opacity: [0, 0.4, 0.4, 0],
        x: [`${randomX}%`, `${randomX + (Math.random() - 0.5) * 10}%`]
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear"
      }}
      className="absolute pointer-events-none flex flex-col items-start gap-1 z-0"
    >
      <div className="w-1 h-1 bg-sky-500/40 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
      <span className="mono text-[8px] text-sky-500/20 tracking-widest whitespace-nowrap">
        DATA_PKT_0x{index.toString(16).padStart(4, '0')}
      </span>
    </motion.div>
  );
};

const Landing: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { scrollY } = useScroll();
  const mockupRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMockupMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMockupMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax transforms
  const yHero = useTransform(scrollY, [0, 500], [0, -150]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const blurHero = useTransform(scrollY, [0, 200], [0, 10]);
  const scaleMockup = useTransform(scrollY, [0, 800], [1, 0.9]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const cinematicVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(15px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col relative overflow-hidden font-sans selection:bg-sky-500/30">
      {/* Background Cinematic Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[5%] w-[1200px] h-[1200px] bg-sky-500/10 blur-[200px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.08, 0.12, 0.08],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[5%] w-[1000px] h-[1000px] bg-indigo-600/10 blur-[200px] rounded-full"
        />
      </div>

      {/* Parallax Data Nodes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <FloatingNode key={i} index={i} />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 lg:px-12 py-10 flex items-center justify-between relative z-50"
      >
        <Link to="/" className="flex items-center gap-4 group cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 glass rounded-2xl flex items-center justify-center border-sky-400/30 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all"
          >
            <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">Nexus</span>
            <span className="text-[9px] font-bold text-sky-500 tracking-[0.5em] uppercase mt-1 mono">Protocol.0.1</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">
          {['Ecosystem', 'Telemetry', 'Governance'].map((item, i) => (
            <motion.a
              key={item}
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="hover:text-sky-400 transition-all hover:tracking-[0.5em] duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-sky-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <Link to="/auth/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all">Portal_Key</Link>
          <Link to="/auth/signup">
            <Button size="sm" magnetic className="px-8 rounded-xl">Init_Session</Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-28 relative z-10 text-center">
        <motion.div
          style={{ y: yHero, opacity: opacityHero, filter: `blur(${blurHero}px)` }}
          className="max-w-6xl w-full"
        >
          <motion.div
            custom={0}
            variants={cinematicVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full glass border-sky-500/20 text-[9px] font-black text-sky-400 uppercase tracking-[0.5em] mb-14"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,1)]"></span>
            </span>
            Neural_Link_Established // Active_Cluster_07
          </motion.div>

          <motion.h1
            custom={1}
            variants={cinematicVariants}
            initial="hidden"
            animate="visible"
            className="text-7xl md:text-9xl lg:text-[11rem] font-black text-white tracking-tighter mb-12 leading-[0.8] uppercase italic"
          >
            Tactical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-300 to-indigo-400 bg-300-percent animate-gradient text-glow">Engineering.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={cinematicVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-2xl text-slate-500 mb-16 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight"
          >
            A kinetic data infrastructure for the next generation of industrial applications.
            Deterministic, observable, and designed for extreme performance.
          </motion.p>

          <motion.div
            custom={3}
            variants={cinematicVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-10"
          >
            <Link to="/auth/signup" className="w-full sm:w-auto">
              <Button size="lg" magnetic className="w-full sm:w-80 py-7 rounded-2xl shadow-[0_15px_40px_rgba(56,189,248,0.25)]">
                Deploy_Environment
              </Button>
            </Link>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 group text-white text-[11px] font-black uppercase tracking-[0.3em] transition-all"
            >
              Protocol_Docs
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Dashboard Mockup */}
        <div className="perspective-[2000px] mt-40 w-full max-w-7xl px-4">
          <motion.div
            ref={mockupRef}
            onMouseMove={handleMockupMouseMove}
            onMouseLeave={handleMockupMouseLeave}
            initial={{ opacity: 0, y: 100, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              rotateX,
              rotateY,
              scale: scaleMockup,
              transformStyle: "preserve-3d"
            }}
            className="rounded-[3rem] overflow-hidden glass shadow-[0_60px_120px_rgba(0,0,0,0.8)] relative group border-white/10"
          >
            <div className="border-beam" />

            {/* Gloss Highlight */}
            <motion.div
              style={{ x: useTransform(springX, [-0.5, 0.5], [100, -100]), opacity: useTransform(springX, [-0.5, 0.5], [0.2, 0.5]) }}
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10"
            />

            {/* Dashboard Mockup Content */}
            <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between relative z-30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
              </div>
              <div className="px-6 py-2 glass rounded-full text-[8px] text-sky-400 font-black tracking-[0.5em] uppercase mono border-sky-500/10">
                terminal_v4.2 // kernel_742_active
              </div>
              <div className="w-10 h-1 bg-white/5 rounded-full" />
            </div>

            <div className="relative aspect-[16/9] overflow-hidden group-hover:scale-[1.01] transition-transform duration-[3s]">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
                alt="Nexus Dashboard Preview"
                className="w-full h-full object-cover opacity-20 transition-all duration-1000 group-hover:opacity-30"
              />

              {/* Dynamic HUD Layer */}
              <div className="absolute inset-0 p-16 flex flex-col justify-between z-30 pointer-events-none">
                <div className="flex justify-between items-start">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="w-64 glass p-6 rounded-2xl border-white/5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 mb-4 flex items-center justify-center">
                      <div className="w-4 h-4 border border-sky-400 rounded-sm animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-1 bg-white/10 rounded-full" />
                      <div className="w-2/3 h-1 bg-white/5 rounded-full" />
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-16 h-16 rounded-full border-2 border-dashed border-sky-500/20 flex items-center justify-center"
                  >
                    <div className="w-8 h-8 rounded-full border border-sky-500/40 animate-spin" />
                  </motion.div>
                </div>

                <div className="flex justify-center">
                  <div className="w-full max-w-2xl h-32 glass rounded-3xl border-sky-400/20 p-8 flex items-center justify-between">
                    <div className="space-y-2">
                      <span className="mono text-[10px] text-sky-400 font-black tracking-widest uppercase">Kernel_Stress</span>
                      <div className="text-4xl font-black text-white italic tracking-tighter">14.2%</div>
                    </div>
                    <div className="flex gap-2 items-end h-16">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                          className="w-1.5 bg-sky-500/40 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scanline Effect Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Feature Grid with Entrance HUD Brackets */}
      <section className="container mx-auto px-6 py-48 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {[
            { title: 'Neural_Flow', desc: 'Sub-millisecond data propagation across global edge clusters.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { title: 'Zero_Trust_Mesh', desc: 'Authenticated-at-rest telemetry with quantum-resistant key cycles.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            { title: 'Deterministic_API', desc: 'Predictable response cycles designed for mission-critical automation.', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass bracket p-12 rounded-[2.5rem] group cursor-default border-white/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.02] transition-colors duration-500" />
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center mb-10 border-sky-400/20 group-hover:border-sky-400/60 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all">
                <svg className="w-7 h-7 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <span className="mono text-[10px] text-sky-500 font-black uppercase tracking-[0.4em] mb-4 block">MODULE_0x0{idx + 1}</span>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-5 group-hover:text-sky-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-500 text-base leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 glass backdrop-blur-3xl relative z-40">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-20">
          <div className="space-y-8 max-w-sm text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-5">
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase italic">Nexus</span>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed italic uppercase tracking-[0.3em] opacity-60">
              Redefining industrial interface standards for the autonomous age.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-24 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
            <div className="flex flex-col gap-6">
              <span className="text-white">Relay_Network</span>
              <a href="#" className="hover:text-sky-400 transition-colors">Edge_Nodes</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Telemetry</a>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-white">Security</span>
              <a href="#" className="hover:text-sky-400 transition-colors">Key_Rotation</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Audit_Log</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-10 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="mono text-[8px] text-slate-700 font-bold uppercase tracking-[0.5em]">© NEXUS_OS // CORE_PROTOCOL_RESERVED // 2025</span>
          <div className="flex gap-10">
            <a href="#" className="mono text-[8px] text-slate-700 font-bold uppercase tracking-[0.5em] hover:text-sky-500 transition-colors">Terms.0.1</a>
            <a href="#" className="mono text-[8px] text-slate-700 font-bold uppercase tracking-[0.5em] hover:text-sky-500 transition-colors">Privacy.v1</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
