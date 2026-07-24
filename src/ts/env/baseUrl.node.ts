const baseUrl:string|undefined=process.env.VITE_BASE_URL;
export function baseUrl_get(env: Record<string, string>):string|undefined {
    return env.VITE_BASE_URL;
}
export default baseUrl;