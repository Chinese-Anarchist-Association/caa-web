import type {Awaitable} from "@vueuse/core";

export const fsil_transform: (svg: string) => Awaitable<string>=
    (svg) => svg
        .replace(/fill="[^"]*"/g, 'fill="currentColor"')
        .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');