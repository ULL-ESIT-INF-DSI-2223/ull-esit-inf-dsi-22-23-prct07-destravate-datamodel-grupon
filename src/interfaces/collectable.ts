export interface Collectable<T, U> {
  add(newItem: T): boolean;
  update(item: T): boolean;
  remove(id: U): boolean;
  get(index: number): T | undefined;
  length(): number;
}
