import type { Express } from 'express';
import path from 'path';

export const loadRoutes = (app: Express, section: string): void => {
    const routePath = path.join(__dirname, `../../features/${section}.route`);
    const resolvedPath = require.resolve(routePath);
    require(resolvedPath).default(app);
}