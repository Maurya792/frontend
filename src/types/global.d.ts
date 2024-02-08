export {};

declare global {
  interface Window {
    MSStream: MSStream;
  }
}

export type ArrayElement<ArrayType extends readonly unknown[] | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
