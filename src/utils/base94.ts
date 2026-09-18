import anyBase from "any-base";

const BASE94=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~\"\\\`";
//console.log(BASE94.length,BASE94);

export const hexToBase94=anyBase(anyBase.HEX,BASE94);
export const base94ToHex=anyBase(BASE94,anyBase.HEX);