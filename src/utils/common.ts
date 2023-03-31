import { init } from "@paralleldrive/cuid2";

export const createId = init({
  // A custom random function with the same API as Math.random.
  // You should use this to pass a cryptographically secure random function.
  length: 15, // the length of the id
  fingerprint: "a-custom-host-fingerprint",
});
