import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getToken, TOKEN_ID, saveToken } from "@/lib/queries/token";
import { authService } from "@/lib/queries/auth/authService";

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Set default API URL if not set
      const apiUrl = getToken(TOKEN_ID.API_URL) || import.meta.env.VITE_API_URL || "http://localhost:8080";
      if (!getToken(TOKEN_ID.API_URL)) {
        await saveToken({ url: apiUrl });
      }

      // Check if JWT token exists and user is authenticated
      const token = getToken(TOKEN_ID.TOKEN);
      const user = authService.getCurrentUser();
      
      if (token && user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null; // Loading state
  }

  if (isAuthenticated) {
    return <Navigate to="/manager/" />;
  }

  return <>{children}</>;
};

export default PublicRoute;
