import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import store from "./Redux_toolkit/store";
import { Provider } from "react-redux";
import { Toaster  as ShadCnToaster} from "@/components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Toaster />
        <ShadCnToaster/>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
