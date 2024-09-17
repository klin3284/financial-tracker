import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../generated/routes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, async (_req: express.Request, res: express.Response) => {
  const swaggerSpec = await fs.readFile('../shared/generated/swagger.json', 'utf-8');
  return res.send(swaggerUi.generateHTML(JSON.parse(swaggerSpec)));
});

RegisterRoutes(app);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
