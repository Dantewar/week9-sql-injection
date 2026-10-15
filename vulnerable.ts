
function getProducts(category: string): string {
  const query =
    "SELECT * FROM products WHERE category = '" +
    category +
    "'";

  return query;
}

const normalInput = "Gifts";

const unsafeInput = "Gifts' OR 1=1--";

console.log("Normal query:");
console.log(getProducts(normalInput));

console.log("\nSQL injection example:");
console.log(getProducts(unsafeInput));

export {};