import type { PersistedClient, Persister } from "@tanstack/react-query-persist-client";
import { del, get, set } from "idb-keyval";

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export function createIDBPersister(idbValidKey: IDBValidKey = "reactQuery"): Persister {
  return {
    persistClient: async (client: PersistedClient) => {
      const json = JSON.stringify(client, (_, value) => {
        if (typeof value === "bigint") {
          return `${value.toString()}n`;
        }

        return value;
      });

      try {
        await set(idbValidKey, json);
      }
      catch (err) {
        console.warn("[IDB] Failed to persist client:", err);
      }
    },
    async restoreClient() {
      let json: string | undefined;
      try {
        json = await get<string>(idbValidKey);
      }
      catch (err) {
        console.warn("[IDB] Failed to restore client:", err);
        return undefined;
      }

      if (!json)
        return undefined;

      try {
        const parsed = JSON.parse(json, (_, value) => {
          if (typeof value === "string" && value.match(/^\d+n$/) && !Number.isNaN(Number(value.slice(0, -1)))) {
            return BigInt(value.slice(0, -1));
          }
          return value;
        }) as PersistedClient;

        return parsed;
      }
      catch (err) {
        console.error("Error parsing persisted client:", err);
        return undefined;
      }
    },
    removeClient: async () => {
      try {
        await del(idbValidKey);
      }
      catch (err) {
        console.warn("[IDB] Failed to remove client:", err);
      }
    },
  } as Persister;
}
