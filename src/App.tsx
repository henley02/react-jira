import React from "react";
import { useAuth } from "./context/auth_context";
import AuthenticatedApp from "./pages/authenticated-app";
import UnauthenticatedApp from "./pages/unauthenticated-app";

function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
