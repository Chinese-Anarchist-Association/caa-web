import anyBase from "any-base";

export const BASE62:string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const hexToBase62=anyBase(anyBase.HEX,BASE62);
export const base62ToHex=anyBase(BASE62,anyBase.HEX);