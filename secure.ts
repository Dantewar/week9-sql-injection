
type SafeQuery = {
  text: string;
  values: string[];
};

function getProducts(category: string): SafeQuery {
  return {
    text: "SELECT * FROM products WHERE category = $1",
    values: [category],
  };
}

const normalInput = "Gifts";

const unsafeInput = "Gifts' OR 1=1--";

console.log("Normal query:");
console.log(getProducts(normalInput));

console.log("\nSafe parameterized query:");
console.log(getProducts(unsafeInput));

export {};