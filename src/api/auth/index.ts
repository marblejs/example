import { login$ } from "./effects/login.effect";
import { combineRoutes } from "@marblejs/core";

export const auth$ = combineRoutes('/auth', [login$]);
