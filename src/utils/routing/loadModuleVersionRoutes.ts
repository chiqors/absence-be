import type { Express } from 'express';
import path from 'path';

export const loadModuleVersionRoutes = (app: Express, module: string, feature: string, version: string): void => {
    const routePath = path.join(__dirname, `../../features/${module}/${feature}/${version}/route`);
    const resolvedPath = require.resolve(routePath);
    const routeModule = require(resolvedPath);
    if (routeModule && routeModule.default) {
        app.use(`/api/${version}/${feature}`, routeModule.default);
    } else {
        throw new Error(`Route module not found or does not export default: ${resolvedPath}`);
    }
}