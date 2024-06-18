import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' instead of 'react-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

const queryClient = new QueryClient();

const container = document.getElementById("root")!;
const root = ReactDOM.createRoot(container); // Create a root using ReactDOM.createRoot

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
