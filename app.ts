import express from 'express';
import router from './src/routes';
import { authenticateDB } from './src/sequelize';
import 'reflect-metadata';

const app = express();
app.use(express.json());
app.use(router);

authenticateDB().then(() => {
  const PORT = 8088;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
