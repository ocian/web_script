import * as path from "path";

export default {
  pages: {
    "index.tsx": null,
  },
  default: {
    template: path.resolve(process.cwd(), "./index.html"),
    params: { title: "Document Example" },
  },
};
