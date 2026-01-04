import type { NextRequest } from "next/server";
import { auth } from "@rntu-visit/auth";

export async function createContext(opts: { req: NextRequest }) {
  const { req } = opts;

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  return {
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
