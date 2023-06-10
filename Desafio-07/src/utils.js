import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

import fs from "fs";

export function readJSON(filename) {
  const data = fs.readFileSync(filename, "utf8");
  return JSON.parse(data);
}
