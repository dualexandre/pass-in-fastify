import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../libs/prisma';
import { BadRequest } from '../_errors/bad-request';
import { EventService } from '../services/event-service';

export async function registerForEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Register an Attendee for an Event.',
        tags: ['attendees'],
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
        }),
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            attendeeId: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { name, email } = request.body;
      const eventService = new EventService();

      const attendeeFromEmail = await prisma.attendee.findUnique({
        where: {
          eventId_email: {
            email,
            eventId,
          },
        },
      });

      if (attendeeFromEmail) {
        throw new BadRequest(
          'This e-mail is already registered for this event.',
        );
      }

      const event = await eventService.getById(eventId);

      if (
        event?.maximumAttendees &&
        event?._count.attendees >= event.maximumAttendees
      ) {
        throw new BadRequest(
          'The maximum number of attendees for this event has been reached.',
        );
      }

      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId,
        },
      });

      return reply.status(201).send({ attendeeId: attendee.id });
    },
  );
}
