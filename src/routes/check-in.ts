import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../libs/prisma';
import { BadRequest } from '../_errors/bad-request';

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

      const attendeeCheckIn = await prisma.checkIn.findUnique({
        where: {
          attendeeId,
        },
      });

      const attendee = await prisma.attendee.findUnique({
        where: {
          id: attendeeId,
        },
      });

      if (!attendee) {
        throw new BadRequest('Attendee not found.');
      }

      if (attendeeCheckIn) {
        throw new BadRequest('Attendee already checked in.');
      }

      await prisma.checkIn.create({
        data: {
          attendeeId,
        },
      });

      return reply.status(201).send();
    },
  );
}
