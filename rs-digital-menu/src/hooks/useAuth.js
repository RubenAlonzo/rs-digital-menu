import { useEffect, useState, useContext, createContext } from 'react';
import { auth } from '../firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap the application and provide authentication state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Effect to subscribe to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdTokenResult();
        setCurrentUser({
          ...user,
          claims: token.claims
        });
      } else {
        setCurrentUser(null); // Set currentUser to null if user is not logged in
      }
      setLoading(false); // Set loading to false after user state is determined
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when not loading */}
    </AuthContext.Provider>
  );
};
