export function varDefault(v: string, def: string): string {
  return v.replace(")", `, ${def})`);
}
