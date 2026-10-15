
function getProducts(category: string): string {
  const query =
    "SELECT name, description FROM products WHERE category = '" +
    category +
    "' AND released = 1";

  return query;
}

const normalInput = "Gifts";
const unsafeInput = "Gifts' OR 1=1--";

console.log("Normal query:");
console.log(getProducts(normalInput));

console.log("\nSQL injection example:");
console.log(getProducts(unsafeInput));

export {};