import { exec } from 'node:child_process';
import { watch } from "node:fs/promises";

try {
    const watcher = await watch("src", { recursive: true });
  
    for await (const event of watcher) {
      if (event) {
        exec("metalsmith");
      }
    }
  } catch (e) {
    log.error(e);
  }