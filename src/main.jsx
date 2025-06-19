import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiRoot } from "jotai";

import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

const Loader = lazy(() => import("./components/Loader.jsx"));

root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <JotaiRoot>
          <App />
        </JotaiRoot>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
