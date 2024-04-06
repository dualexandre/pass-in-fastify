import fastify from 'fastify';

const app = fastify();

app.get('/', () => {
  return {
    message: 'Welcome to pass.in API.',
  };
});

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!');
});
