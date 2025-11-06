import { Rule } from "eslint";
import type { JSXAttribute, JSXIdentifier } from "estree-jsx";
import { isAllowed } from "../utils/matcher";

function isJSXAttribute(node: Rule.Node): node is JSXAttribute & Rule.Node {
  return node.type === "JSXAttribute";
}

function isJSXIdentifier(node: JSXAttribute["name"]): node is JSXIdentifier {
  return node.type === "JSXIdentifier";
}

export const onlyAllowInRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Restrict usage of class/className to specific directories",
    },
    schema: [
      {
        type: "object",
        properties: {
          allow: {
            type: "array",
            items: { type: "string" },
            description:
              "Glob patterns of directories where class/className is allowed",
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      disallow:
        "Usage of `class` or `className` is not allowed outside allowed directories: {{allowList}}",
    },
  },

  create(context): Rule.RuleListener {
    const options = context.options?.[0] || {};
    const allow: string[] = options.allow || [];
    const filename = context.filename;

    if (isAllowed(filename, allow)) return {};

    return {
      JSXAttribute(node: Rule.Node) {
        if (!isJSXAttribute(node)) return;

        const jsxName = node.name;
        if (isJSXIdentifier(jsxName)) {
          const name = jsxName.name;
          if (name === "class" || name === "className") {
            context.report({
              node,
              messageId: "disallow",
              data: { allowList: allow.join(", ") },
            });
          }
        }
      },
    };
  },
};
