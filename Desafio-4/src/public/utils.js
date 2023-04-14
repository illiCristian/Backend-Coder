import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const filePath = path.join(__dirname, "../files/products.json");
export default __dirname;
