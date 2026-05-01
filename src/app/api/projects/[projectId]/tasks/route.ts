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

// GET /api/projects/[projectId]/tasks
export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is member of the project
    const member = await prisma.projectMember.findFirst({
      where: {
        projectId: params.projectId,
        userId: user.id,
      },
    });

    if (!member) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId: params.projectId,
      },
      include: {
        assignee: true,
        creator: true,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/projects/[projectId]/tasks
export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is member of the project
    const member = await prisma.projectMember.findFirst({
      where: {
        projectId: params.projectId,
        userId: user.id,
      },
    });

    if (!member) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, priority, assigneeId, dueDate } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Task title is required' },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        projectId: params.projectId,
        createdById: user.id,
        assigneeId,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      include: {
        assignee: true,
        creator: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
