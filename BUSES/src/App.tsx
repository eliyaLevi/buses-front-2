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
