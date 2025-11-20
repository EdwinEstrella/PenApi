import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getToken, TOKEN_ID, saveToken } from "@/lib/queries/token";
import { authService } from "@/lib/queries/auth/authService";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Set default API URL if not set
      const apiUrl = getToken(TOKEN_ID.API_URL) || import.meta.env.VITE_API_URL || "http://localhost:8080";
      if (!getToken(TOKEN_ID.API_URL)) {
        await saveToken({ url: apiUrl });
      }

      // Check if JWT token exists
      const token = getToken(TOKEN_ID.TOKEN);
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      // Verify token is valid by checking user
      const user = authService.getCurrentUser();
      if (user && token) {
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

  if (!isAuthenticated) {
    return <Navigate to="/manager/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
