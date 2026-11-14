import { fileURLToPath } from "node:url";
import open from "open";

await open(
  fileURLToPath(new URL("../../coverage/report/index.html", import.meta.url)),
);
