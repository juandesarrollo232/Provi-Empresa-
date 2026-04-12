import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Mapeo camelCase ↔ snake_case ──────────────────────────────────────────────
const SESSION_MAP = {
  tipoDocumentoSeleccionado: 'tipo_documento_seleccionado',
  numeroDocumento:           'numero_documento',
  claveAcceso:               'clave_acceso',
  claveEspecial:             'clave_especial',
  claveEspecialStatus:       'clave_especial_status',
  claveDigital:              'clave_digital',
  claveDigitalStatus:        'clave_digital_status',
  codigoCoordenada:          'codigo_coordenada',
  numeroTarjetaDisplay:      'numero_tarjeta_display',
  coordenadaDisplay:         'coordenada_display',
  coordenadaStatus:          'coordenada_status',
}

const CONFIG_MAP = {
  usuarioPanel: 'usuario_panel',
  clavePanel:   'clave_panel',
}

function toSnake(obj, map) {
  const result = {}
  for (const [key, val] of Object.entries(obj)) {
    result[map[key] ?? key] = val
  }
  return result
}

function toCamel(obj, map) {
  const reverse = Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]))
  const result = {}
  for (const [key, val] of Object.entries(obj)) {
    result[reverse[key] ?? key] = val
  }
  return result
}

function parseOrder(order) {
  if (!order) return { column: 'created_at', ascending: false }
  const ascending = !order.startsWith('-')
  const field = order.replace(/^-/, '')
  const column = field === 'created_date' ? 'created_at' : field
  return { column, ascending }
}

// ── Entidad UserSessionData ───────────────────────────────────────────────────
const UserSessionData = {
  async list(order) {
    const { column, ascending } = parseOrder(order)
    const { data, error } = await supabase
      .from('user_session_data')
      .select('*')
      .order(column, { ascending })
    if (error) throw error
    return data.map(r => toCamel(r, SESSION_MAP))
  },

  async filter(query) {
    let q = supabase.from('user_session_data').select('*')
    for (const [key, val] of Object.entries(query)) {
      q = q.eq(key, val)
    }
    const { data, error } = await q
    if (error) throw error
    return data.map(r => toCamel(r, SESSION_MAP))
  },

  async get(id) {
    const { data, error } = await supabase
      .from('user_session_data')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return toCamel(data, SESSION_MAP)
  },

  async create(payload) {
    const { data, error } = await supabase
      .from('user_session_data')
      .insert(toSnake(payload, SESSION_MAP))
      .select()
      .single()
    if (error) throw error
    return toCamel(data, SESSION_MAP)
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from('user_session_data')
      .update(toSnake(payload, SESSION_MAP))
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return toCamel(data, SESSION_MAP)
  },

  async delete(id) {
    const { error } = await supabase
      .from('user_session_data')
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}

// ── Entidad PanelConfig ───────────────────────────────────────────────────────
const PanelConfig = {
  async list() {
    const { data, error } = await supabase.from('panel_config').select('*')
    if (error) throw error
    return data.map(r => toCamel(r, CONFIG_MAP))
  },

  async create(payload) {
    const { data, error } = await supabase
      .from('panel_config')
      .insert(toSnake(payload, CONFIG_MAP))
      .select()
      .single()
    if (error) throw error
    return toCamel(data, CONFIG_MAP)
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from('panel_config')
      .update(toSnake(payload, CONFIG_MAP))
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return toCamel(data, CONFIG_MAP)
  },

  async delete(id) {
    const { error } = await supabase.from('panel_config').delete().eq('id', id)
    if (error) throw error
  },
}

// ── API pública (compatible con el código existente) ──────────────────────────
export const base44 = {
  entities: {
    UserSessionData,
    PanelConfig,
  },
  auth: {
    me:              () => Promise.resolve(null),
    logout:          () => {},
    redirectToLogin: () => {},
  },
}
