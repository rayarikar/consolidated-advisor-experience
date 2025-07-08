import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import * as OpenApiValidator from 'express-openapi-validator';
import logger from './utils/logger';
import { ResponseHandler } from './utils/responseHandler';
import preferencesRoutes from './routes/preferences';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

app.use('/api-docs', express.static(path.join(__dirname, '../openapi-spec.yaml')));

// OpenAPI validation temporarily disabled
// app.use(
//   OpenApiValidator.middleware({
//     apiSpec: path.join(__dirname, '../openapi-spec.yaml'),
//     validateRequests: true,
//     validateResponses: true,
//     ignorePaths: /.*\/api-docs$/
//   })
// );

app.get('/health', (req, res) => {
  ResponseHandler.success(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.use('/v1/agents', preferencesRoutes);

app.use('*', (req, res) => {
  ResponseHandler.notFound(res, `Route ${req.originalUrl} not found`);
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  
  if (err.status) {
    return ResponseHandler.error(res, err.message || 'VALIDATION_ERROR', err.message, err.status);
  }
  
  return ResponseHandler.internalError(res, 'Something went wrong');
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
  logger.info(`API docs: http://localhost:${PORT}/api-docs`);
});

export default app;