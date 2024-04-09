import { prisma } from '../libs/prisma';

export class CheckInService {
  async getByAttendeeId(attendeeId: number) {
    const attendeeCheckIn = await prisma.checkIn.findUnique({
      where: {
        attendeeId,
      },
    });

    return attendeeCheckIn;
  }

  async create(attendeeId: number) {
    await prisma.checkIn.create({
      data: {
        attendeeId,
      },
    });
  }
}
