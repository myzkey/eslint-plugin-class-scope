import type { Rule } from "eslint";
import { onlyAllowInRule } from "./rules/only-allow-in";

export const rules: Record<string, Rule.RuleModule> = {
  "only-allow-in": onlyAllowInRule
};

export const configs = {
  recommended: {
    rules: {
      "class-scope/only-allow-in": [
        "error",
        { allow: ["components/**", "ui/**"] }
      ]
    }
  }
};
