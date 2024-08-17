import type { Express } from 'express';
import path from 'path';

export const loadModuleRoutes = (app: Express, module: string, feature: string): void => {
    const routePath = path.join(__dirname, `../../features/${module}/${feature}/${feature}.route`);
    const resolvedPath = require.resolve(routePath);
    require(resolvedPath).default(app);
}