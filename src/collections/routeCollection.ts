import { Route } from "../classes/route";
import { Collection } from "./collection";

/**
 * Colección de rutas
 */
export class RouteCollection extends Collection<Route, number> {
  constructor(elements: Route[]) {
    super(elements);
  }

  /**
   *
   * Ordena los elementos alfabeticamente
   *
   */
  public sortAlphabetically(): void {
    this._elements.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  /**
   *
   * Ordena los elementos alfabeticamente de manera inversa
   *
   */
  public sortReversedAlphabetically(): void {
    this.sortAlphabetically();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los elementos segun el número de visitantes de menor a mayor
   *
   */
  public sortByNumberUsers(): void {
    this._elements.sort((a, b) =>
      a.visitors_id.length > b.visitors_id.length ? 1 : -1
    );
  }

  /**
   *
   * Ordena los elementos segun el número de visitantes de mayor a menor
   *
   */
  public sortReversedByNumberUsers(): void {
    this.sortByNumberUsers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los elementos por la longitud de ruta de menor a mayor
   *
   */
  public sortByLenght(): void {
    this._elements.sort((a, b) => (a.length > b.length ? 1 : -1));
  }

  /**
   *
   * Ordena los elementos por la longitud de ruta de mayor a menor
   *
   */
  public sortReversedByLenght(): void {
    this.sortByLenght();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los elementos por la puntuación de la ruta de menor a mayor
   *
   */
  public sortByScore(): void {
    this._elements.sort((a, b) => (a.avg_score > b.avg_score ? 1 : -1));
  }

  /**
   *
   * Ordena los elementos por la puntuación de la ruta de mayor a menor
   *
   */
  public sortReversedByScore(): void {
    this.sortByScore();
    this._elements.reverse();
  }
  /**
   *
   * Ordena los elementos por ripo de actovidad
   *
   */
  public sortByActivity(): void {
    this._elements.sort((a, b) => (a.activity > b.activity ? 1 : -1));
  }
}
