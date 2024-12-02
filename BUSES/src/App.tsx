import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Layout } from "./layout/Layout";
import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Layout children={<AppRouter />} />
      </AuthProvider>
    </>
  );
}

export default App;
