import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Public routes — rendered on the server
  { path: '', renderMode: RenderMode.Server },
  { path: 'auth/login', renderMode: RenderMode.Server },
  { path: 'auth/register', renderMode: RenderMode.Server },

  // Auth-guarded routes — rendered on the client (no auth context on server)
  { path: 'admin/**', renderMode: RenderMode.Client },
  { path: 'client/**', renderMode: RenderMode.Client },
  { path: 'counsellor/**', renderMode: RenderMode.Client },

  // Catch-all — client rendering
  { path: '**', renderMode: RenderMode.Client }
];

