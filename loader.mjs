import { register } from "node:module"
import { pathToFileURL } from "node:url"

if (process.env.NODE_ENV !== "production") {
  try {
    await import("dotenv/config")
    console.log("dotenv loaded in non-production environment")
  } catch (err) {
    console.error("Failed to load dotenv:", err)
  }
}

try {
  register("ts-node/esm", pathToFileURL("./"), {
    project: "./tsconfig.json",
  })
  const mainFileUrl = pathToFileURL("./src/index.ts").href
  await import(mainFileUrl)
} catch (err) {
  console.error("Failed to import main file:", err)
}
