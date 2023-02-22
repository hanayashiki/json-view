import { parseExpression } from "@babel/parser";
import {
  ArrayExpression,
  BooleanLiteral,
  Expression,
  NumericLiteral,
  StringLiteral,
  isExpression,
  NullLiteral,
  Identifier,
  ObjectExpression,
} from "@babel/types";

import { ParseLooseJsonError } from "./errors";

// Parse Python expr
const identifiers = {
  True: true,
  False: false,
  None: null,
};

export const parseLooseJson = (content: string): {} | null => {
  const parseResult = parseExpression(content);

  const transformExpression = (expression: Expression): {} | null => {
    switch (expression.type) {
      case "StringLiteral":
        return transformStringLiteral(expression);
      case "NumericLiteral":
        return transformNumericLiteral(expression);
      case "BooleanLiteral":
        return transformBooleanLiteral(expression);
      case "NullLiteral":
        return transformNullLiteral(expression);
      case "Identifier":
        return transformIdentifier(expression);
      case "ArrayExpression":
        return transformArrayExpression(expression);
      case "ObjectExpression":
        return transformObjectExpression(expression);
      default:
        throw new ParseLooseJsonError(
          expression.loc?.start,
          "SyntaxError",
          `${expression.type} is not a JSON component`
        );
    }
  };

  const transformStringLiteral = (stringLiteral: StringLiteral): string => {
    return stringLiteral.value;
  };

  const transformNumericLiteral = (numericLiteral: NumericLiteral): number => {
    return numericLiteral.value;
  };

  const transformBooleanLiteral = (booleanLiteral: BooleanLiteral): boolean => {
    return booleanLiteral.value;
  };

  const transformNullLiteral = (_: NullLiteral): null => {
    return null;
  };

  const transformIdentifier = (identifier: Identifier) => {
    if (identifier.name in identifiers) {
      return identifiers[identifier.name as keyof typeof identifiers];
    } else {
      throw new ParseLooseJsonError(
        identifier.loc?.start,
        "SyntaxError",
        `${identifier.name} is not a valid identifier. `
      );
    }
  };

  const transformArrayExpression = (
    arrayExpression: ArrayExpression
  ): unknown[] => {
    const values = arrayExpression.elements.map((element) => {
      if (element && isExpression(element)) {
        return transformExpression(element);
      } else {
        throw new ParseLooseJsonError(
          arrayExpression.loc?.start,
          "SyntaxError",
          "Arrays can only contain expressions."
        );
      }
    });

    return values;
  };

  const transformObjectExpression = (
    objectExpression: ObjectExpression
  ): Record<string, unknown> => {
    const object: Record<string, unknown> = {};

    for (const property of objectExpression.properties) {
      if (property.type !== "ObjectProperty") {
        throw new ParseLooseJsonError(
          property.loc?.start,
          "SyntaxError",
          "Object can only contain properties, not methods or spread elements. "
        );
      }

      // Skip undefined, as JSON.stringify behaves
      const valueIsUndefined =
        property.value.type === "Identifier" &&
        property.value.name === "undefined";

      if (valueIsUndefined) {
        continue;
      }

      if (property.key.type === "Identifier") {
        object[property.key.name] = transformExpression(
          property.value as Expression
        );
      } else if (
        property.key.type === "StringLiteral" ||
        property.key.type === "NumericLiteral"
      ) {
        object[property.key.value] = transformExpression(
          property.value as Expression
        );
      } else {
        throw new ParseLooseJsonError(
          property.key.loc?.start,
          "SyntaxError",
          "Key must be an identifier, string or number"
        );
      }
    }

    return object;
  };

  return transformExpression(parseResult);
};
