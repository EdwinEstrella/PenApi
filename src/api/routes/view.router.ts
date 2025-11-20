import { RouterBroker } from '@api/abstract/abstract.router';
import express, { Router } from 'express';
import path from 'path';

export class ViewsRouter extends RouterBroker {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();

    const basePath = path.join(process.cwd(), 'PenManager', 'dist');
    const indexPath = path.join(basePath, 'index.html');

    // Serve static files with no-cache headers to prevent browser caching
    this.router.use(
      express.static(basePath, {
        setHeaders: (res, filePath) => {
          // Disable caching for HTML files
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
          }
          // Disable caching for JS and CSS files during development
          if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
          }
        },
      }),
    );

    this.router.get('*', (req, res) => {
      // Set no-cache headers for index.html
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(indexPath);
    });
  }
}
