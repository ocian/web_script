import { createRoot } from "react-dom/client";

export const mountReactApp = (RootApp: React.FC, node = "#root") => {
  const root = createRoot(document.querySelector(node) as HTMLElement);
  root.render(<RootApp />);
};
