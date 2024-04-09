import { prisma } from '../libs/prisma';

export class AttendeeService {
  async getById(attendeeId: number) {
    const attendee = await prisma.attendee.findUnique({
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true,
          },
        },
      },
      where: {
        id: attendeeId,
      },
    });

    return attendee;
  }

  async getByNameOrEventId(
    eventId: string,
    pageIndex: number,
    query?: string | null,
  ) {
    const attendees = await prisma.attendee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        checkIn: {
          select: {
            createdAt: true,
          },
        },
      },
      where: query ? { eventId, name: { contains: query } } : { eventId },
      take: 10,
      skip: pageIndex * 10,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return attendees;
  }

  async getByEmailAndEventId(email: string, eventId: string) {
    const attendeeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId,
        },
      },
    });

    return attendeeFromEmail;
  }

  async create(name: string, email: string, eventId: string) {
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId,
      },
    });

    return attendee;
  }
}
