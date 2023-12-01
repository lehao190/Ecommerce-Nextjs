type NestedObject = {
  [key: string]: any;
};

// Define a function that takes an object and an array of keys as parameters
// and returns the value at the nested path or undefined if not found
const getNestedValue = (obj: NestedObject, keys: string[]): any => {
  // Initialize a variable to store the current value
  let value: any = obj;

  // Loop through the keys array
  for (let key of keys) {
    // Check if the current value is an object and has the key as a property
    if (typeof value === "object" && value !== null && key in value) {
      // Update the current value to the value of the key
      value = value[key];
    } else {
      // Return undefined if the key is not found
      return undefined;
    }
  }
}
