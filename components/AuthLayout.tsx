
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';

const AuthLayout: React.FC & { Login: React.FC; Signup: React.FC } = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-sky-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-500/10 blur-[120px] rounded-full"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0F172A] border border-[#1F2937] rounded-2xl p-8 shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <Outlet />
      </motion.div>
    </div>
  );
};

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

AuthLayout.Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Welcome back</h2>
        <p className="text-slate-400 mt-2">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
          <input
            {...register('email')}
            className="w-full px-4 py-2.5 bg-[#020617] border border-[#1F2937] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            placeholder="name@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{(errors.email.message as string)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-4 py-2.5 bg-[#020617] border border-[#1F2937] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{(errors.password.message as string)}</p>}
        </div>

        {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-xs text-red-500">{error}</div>}

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Sign In
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-slate-400">
          Don't have an account? <Link to="/auth/signup" className="text-sky-500 hover:text-sky-400 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

AuthLayout.Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      await signup(data.name, data.email, data.password);
      navigate('/dashboard');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Create account</h2>
        <p className="text-slate-400 mt-2">Join Nexus and boost your productivity</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
          <input
            {...register('name')}
            className="w-full px-4 py-2.5 bg-[#020617] border border-[#1F2937] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{(errors.name.message as string)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
          <input
            {...register('email')}
            className="w-full px-4 py-2.5 bg-[#020617] border border-[#1F2937] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            placeholder="name@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{(errors.email.message as string)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-4 py-2.5 bg-[#020617] border border-[#1F2937] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{(errors.password.message as string)}</p>}
        </div>

        {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-xs text-red-500">{error}</div>}

        <Button type="submit" isLoading={isSubmitting} variant="secondary" className="w-full">
          Create Account
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-slate-400">
          Already have an account? <Link to="/auth/login" className="text-sky-500 hover:text-sky-400 font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
