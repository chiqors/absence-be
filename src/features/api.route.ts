import type { Express } from 'express';
import { loadModuleRoutes } from '@app/utils/routing/loadModuleRoutes.ts';

export default (app: Express): void => {
    loadModuleRoutes(app, 'api', 'jobs');
};