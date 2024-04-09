import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { BadRequest } from '../_errors/bad-request';
import { AttendeeService } from '../services/attendee-service';
import { CheckInService } from '../services/check-in-service';

export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/check-in',
    {
      schema: {
        summary: 'Checks the attendee into the event.',
        tags: ['check-ins'],
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;
      const attendeeService = new AttendeeService();
      const checkInService = new CheckInService();

      const attendeeCheckIn = await checkInService.getByAttendeeId(attendeeId);
      if (attendeeCheckIn) {
        throw new BadRequest('Attendee already checked in.');
      }

      const attendee = await attendeeService.getById(attendeeId);
      if (!attendee) {
        throw new BadRequest('Attendee not found.');
      }

      checkInService.create(attendeeId);

      return reply.status(201).send();
    },
  );
}
