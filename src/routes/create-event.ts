import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { generateSlug } from '../utils/generate-slug';
import { FastifyInstance } from 'fastify';
import { BadRequest } from '../_errors/bad-request';
import { EventService } from '../services/event-service';

export async function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events',
    {
      schema: {
        summary: 'Create an Event.',
        tags: ['events'],
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendees } = request.body;
      const slug = generateSlug(title);
      const eventService = new EventService();
      const eventWithSameSlug = await eventService.getBySlug(slug);

      if (eventWithSameSlug) {
        throw new BadRequest('Another event with same title already exists.');
      }

      const event = await eventService.create(
        title,
        slug,
        maximumAttendees,
        details,
      );

      return reply.status(201).send({ eventId: event.id });
    },
  );
}
