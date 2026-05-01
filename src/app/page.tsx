'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Project Manager
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Manage projects, assign tasks, and track progress with ease. Perfect for teams of all sizes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/auth/login"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-blue-400 text-white rounded-lg font-semibold hover:bg-blue-300 transition"
            >
              Sign Up
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
              <p className="text-blue-100">Monitor all your projects and tasks at a glance</p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-lg font-semibold mb-2">Team Management</h3>
              <p className="text-blue-100">Collaborate with your team and manage roles</p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-white">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-lg font-semibold mb-2">Task Tracking</h3>
              <p className="text-blue-100">Track progress and manage task assignments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
