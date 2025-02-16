import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// App
import App from "./App.tsx";
// Styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PrimeReactProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </PrimeReactProvider>
  </BrowserRouter>
);
