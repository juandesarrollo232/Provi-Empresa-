import { useIpFilter } from '@/hooks/useIpFilter';
import { Navigate } from 'react-router-dom';

export default function IpFilterGuard({ children }) {
  const status = useIpFilter();

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
      </div>
    );
  }

  if (status === 'blocked') {
    return <Navigate to="/rio-provincial" replace />;
  }

  return children;
}
