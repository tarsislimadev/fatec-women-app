import { Pool } from "pg";
import { DB_CONFIG } from "./config/env";
export const pool = new Pool(DB_CONFIG);
