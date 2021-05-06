import React from "react";
import { useAuth } from "./context/auth_context";
import AuthenticatedApp from "./pages/authenticated-app";
import UnauthenticatedApp from "./pages/unauthenticated-app";
import ErrorBoundary from "./components/error_boundary";
import { FullPageErrorFallback } from "./components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
