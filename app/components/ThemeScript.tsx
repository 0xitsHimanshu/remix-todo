import { useRouteLoaderData } from "@remix-run/react";
import type { loader as rootLoader } from "~/root";
import type { Theme } from "~/type";
 
export function useTheme(): Theme {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  const rootTheme = rootLoaderData?.theme ?? "system";
 
  return rootTheme;
}