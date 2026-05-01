import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

async function getUserFromRequest(request: NextRequest) {
  const token = extractTokenFromHeader(request.headers.get('authorization'));

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: payload.userId },
  });
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's projects
    const userProjects = await prisma.projectMember.findMany({
      where: { userId: user.id },
      include: { project: true },
    });

    const projectIds = userProjects.map((pm) => pm.project.id);

    // Get task statistics
    const tasks = await prisma.task.findMany({
      where: {
        projectId: { in: projectIds },
      },
      include: {
        assignee: true,
        creator: true,
        project: true,
      },
    });

    const now = new Date();

    const stats = {
      totalTasks: tasks.length,
      todoTasks: tasks.filter((t) => t.status === 'TODO').length,
      inProgressTasks: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
      completedTasks: tasks.filter((t) => t.status === 'COMPLETED').length,
      overdueTasks: tasks.filter((t) => t.dueDate && t.dueDate < now && t.status !== 'COMPLETED').length,
      assignedToMe: tasks.filter((t) => t.assigneeId === user.id && t.status !== 'COMPLETED').length,
    };

    // Get recent tasks
    const recentTasks = tasks
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 10);

    // Get overdue tasks
    const overdueTasks = tasks.filter(
      (t) => t.dueDate && t.dueDate < now && t.status !== 'COMPLETED'
    );

    return NextResponse.json({
      stats,
      recentTasks,
      overdueTasks,
      projects: userProjects.map((pm) => ({
        ...pm.project,
        role: pm.role,
      })),
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
