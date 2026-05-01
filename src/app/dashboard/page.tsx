'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';

interface DashboardData {
  stats: {
    totalTasks: number;
    todoTasks: number;
    inProgressTasks: number;
    completedTasks: number;
    overdueTasks: number;
    assignedToMe: number;
  };
  recentTasks: any[];
  overdueTasks: any[];
  projects: any[];
}

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchDashboard();
  }, [token, router]);

  const fetchDashboard = async () => {
    try {
      const response = await fetch('/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard');
      }

      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Manager</h1>
            <p className="text-gray-600 mt-1">Welcome, {user.name}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Tasks</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {data?.stats.totalTasks || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">In Progress</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">
              {data?.stats.inProgressTasks || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Overdue Tasks</div>
            <div className="text-3xl font-bold text-red-600 mt-2">
              {data?.stats.overdueTasks || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">To-Do</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              {data?.stats.todoTasks || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Completed</div>
            <div className="text-3xl font-bold text-green-600 mt-2">
              {data?.stats.completedTasks || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Assigned to Me</div>
            <div className="text-3xl font-bold text-purple-600 mt-2">
              {data?.stats.assignedToMe || 0}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
            <Link
              href="/projects/new"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              New Project
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {data?.projects && data.projects.length > 0 ? (
              data.projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="px-6 py-4 hover:bg-gray-50 transition flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {project.role}
                  </span>
                </Link>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-600">
                No projects yet. Create one to get started!
              </div>
            )}
          </div>
        </div>

        {/* Overdue Tasks */}
        {data?.overdueTasks && data.overdueTasks.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">⚠️ Overdue Tasks</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {data.overdueTasks.map((task) => (
                <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
                  <h3 className="font-medium text-red-600">{task.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {task.project.name}
                    </span>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
