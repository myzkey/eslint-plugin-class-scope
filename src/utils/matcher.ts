import micromatch from "micromatch";
import path from "path";

export function isAllowed(filename: string, patterns: string[]): boolean {
  if (!filename || filename === "<text>") return false;
  const normalized = filename.split(path.sep).join("/");
  return micromatch.isMatch(normalized, patterns);
}
