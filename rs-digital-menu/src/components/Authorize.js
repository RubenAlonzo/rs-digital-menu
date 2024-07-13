import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Authorize = ({ children, requireAdmin = true }) => {
  const { currentUser } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (requireAdmin) {
        setIsAuthorized(currentUser.claims?.admin || false);
      } else {
        setIsAuthorized(true);
      }
    } else {
      setIsAuthorized(false);
    }
  }, [currentUser, requireAdmin]);

  return isAuthorized ? children : null;
};

export default Authorize;
