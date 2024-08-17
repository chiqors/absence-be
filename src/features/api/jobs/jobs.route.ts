import type { Express } from 'express';
import { loadModuleVersionRoutes } from '@app/utils/routing/loadModuleVersionRoutes.ts';

export default (app: Express): void => {
    loadModuleVersionRoutes(app, 'api', 'jobs', 'v1');
};