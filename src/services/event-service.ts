import { prisma } from '../libs/prisma';

export class EventService {
  async getById(eventId: string) {
    const event = await prisma.event.findUnique({
      select: {
        id: true,
        title: true,
        slug: true,
        details: true,
        maximumAttendees: true,
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      where: {
        id: eventId,
      },
    });

    return event;
  }

  async getBySlug(slug: string) {
    const event = await prisma.event.findUnique({
      where: {
        slug,
      },
    });

    return event;
  }

  async create(
    title: string,
    slug: string,
    maximumAttendees: number | null,
    details: string | null,
  ) {
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug,
      },
    });

    return event;
  }
}
