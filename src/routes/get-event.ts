import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { BadRequest } from '../_errors/bad-request';
import { EventService } from '../services/event-service';

export async function getEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId',
    {
      schema: {
        summary: 'Get an Event.',
        tags: ['events'],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            event: z.object({
              id: z.string(),
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maximumAttendees: z.number().int().positive().nullable(),
              attendeesAmount: z.number().int().positive(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const eventService = new EventService();

      const event = await eventService.getById(eventId);

      if (!event) {
        throw new BadRequest('Event not found.');
      }

      return reply.send({
        event: {
          id: event.id,
          title: event.title,
          slug: event.slug,
          details: event.details,
          maximumAttendees: event.maximumAttendees,
          attendeesAmount: event._count.attendees,
        },
      });
    },
  );
}
