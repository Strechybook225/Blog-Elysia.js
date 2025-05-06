import { Elysia } from "elysia";
import swagger from '@elysiajs/swagger';
import dotenv from 'dotenv'

dotenv.config();
const port = process.env.PORT || 3000;

const app = new Elysia();

app.use(
  swagger({
    path: '/swagger',
    documentation: {
      info: {
        title: 'API DOCUMENTATION',
        version: '1.0.0',
        description: 'Elysia + Swagger örneği'
      }
    }
  })
);

app.listen(port);
console.log(`Sunucu ${port} portunda çalışıyor`);