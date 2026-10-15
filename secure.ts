
import { z } from "zod";

const querySchema = z.object({
  category: z.enum(["Gifts", "Food", "Clothing"]),
});

type SafeQuery = {
  text: string;
  values: string[];
};

function getProducts(input: unknown): SafeQuery {
  const { category } = querySchema.parse(input);

  return {
    text: "SELECT name, description FROM products WHERE category = $1 AND released = 1",
    values: [category],
  };
}

const normalInput = {
  category: "Gifts",
};

const unsafeInput = {
  category: "Gifts' OR 1=1--",
};

console.log("Normal query:");
console.log(getProducts(normalInput));

console.log("\nSQL injection test:");

const result = querySchema.safeParse(unsafeInput);

if (!result.success) {
  console.log("Invalid category. Request rejected.");
} else {
  console.log(getProducts(result.data));
}

// $1 keeps user input separate from the SQL command.
// String concatenation can allow input to change SQL syntax.
// Column names and ORDER BY cannot use $1 as identifiers.
// Use a whitelist for allowed columns and sort directions.