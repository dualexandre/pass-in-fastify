import { app } from './app';

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || '0.0.0.0';

app.listen({ port: PORT, host: HOST }).then(() => {
  console.log('HTTP server running!');
});
