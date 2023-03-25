export interface Collectable<T, U> {
  /**
   *
   * Añade un elemento a la colección
   *
   * @param newItem Elemento a añadir
   */
  add(newItem: T): boolean;

  /**
   *
   * Actualiza un elemento de la colección
   *
   * @param item Elemento a actualizar
   */
  update(item: T): boolean;

  /**
   *
   * Elimina un elemento de la colección por su ID
   *
   * @param id ID del elemento a eliminar
   */
  remove(id: U): boolean;

  /**
   *
   * Devuelve un elemento de la colección
   *
   * @param index Índice del elemento a devolver
   */
  get(index: number): T | undefined;

  /**
   *
   * Devuelve el número de elementos de la colección
   */
  length(): number;
}
