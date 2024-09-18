import express from 'express';
import { ValidateError } from 'tsoa';
import fs from 'fs/promises';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import InvalidParametersError from './lib/invalidParameters';
import { RegisterRoutes } from '../generated/routes';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Express.Response | void => {
    if (err instanceof ValidateError) {
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields,
      });
    }
    if (err instanceof InvalidParametersError) {
      return res.status(400).json({
        message: err.message,
      });
    }
    if (err instanceof Error) {
      // eslint-disable-next-line no-console
      console.log(err);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }

    return next();
  },
);

app.use('/docs', swaggerUi.serve, async (_req: express.Request, res: express.Response) => {
  const swaggerSpec = await fs.readFile('../shared/generated/swagger.json', 'utf-8');
  return res.send(swaggerUi.generateHTML(JSON.parse(swaggerSpec)));
});

RegisterRoutes(app);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
