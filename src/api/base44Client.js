// ─────────────────────────────────────────────────────────────────────────────
// base44Client.js  →  stub temporal mientras se conecta el backend con Supabase
// Reemplaza cada método con la lógica de Supabase cuando esté listo.
// ─────────────────────────────────────────────────────────────────────────────

const notImplemented = (name) => {
  throw new Error(`[API] "${name}" aún no está conectado. Conecta con Supabase.`);
};

const makeEntity = (entityName) => ({
  list:   (_order)      => notImplemented(`${entityName}.list`),
  filter: (_query)      => notImplemented(`${entityName}.filter`),
  get:    (_id)         => notImplemented(`${entityName}.get`),
  create: (_data)       => notImplemented(`${entityName}.create`),
  update: (_id, _data)  => notImplemented(`${entityName}.update`),
  delete: (_id)         => notImplemented(`${entityName}.delete`),
});

export const base44 = {
  entities: {
    UserSessionData: makeEntity('UserSessionData'),
    PanelConfig:     makeEntity('PanelConfig'),
  },
  auth: {
    me:              () => notImplemented('auth.me'),
    logout:          () => { /* no-op hasta conectar Supabase */ },
    redirectToLogin: () => { /* no-op hasta conectar Supabase */ },
  },
};
