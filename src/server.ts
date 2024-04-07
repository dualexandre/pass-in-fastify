import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fastify from 'fastify';
import { createEvent } from './routes/create-event';

const app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/', () => {
  return {
    message: 'Welcome to pass.in API.',
  };
});

app.register(createEvent);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!');
});
