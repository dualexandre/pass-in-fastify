import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import fastify from 'fastify';
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';
import { checkIn } from './routes/check-in';

const app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/', () => {
  return {
    message: 'Welcome to pass.in API.',
  };
});

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!');
});
