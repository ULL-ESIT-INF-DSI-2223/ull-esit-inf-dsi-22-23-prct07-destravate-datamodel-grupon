import { Route } from "../classes/route";
import { Collection } from "./collection";

export class RouteCollection extends Collection<Route, number> {
  /**
   *
   * Constructor de la clase RouteCollection que representa una colección de rutas
   *
   * @param elements Rutas de la colección. No pueden haber varios rutas con el mismo ID
   */
  constructor(elements: Route[]) {
    super(elements);
  }

  /**
   *
   * Ordena los usuarios alfabéticamente por el nombre en orden ascendente
   *
   */
  public sortAlphabetically(): void {
    this._elements.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  /**
   *
   * Ordena los usuarios alfabéticamente por el nombre en orden descendente
   *
   */
  public sortReversedAlphabetically(): void {
    this.sortAlphabetically();
    this._elements.reverse();
  }

  /**
   *
   * Ordena las rutas por el número de usuarios en orden ascendente
   *
   */
  public sortByNumberUsers(): void {
    this._elements.sort((a, b) =>
      a.visitors_id.length > b.visitors_id.length ? 1 : -1
    );
  }

  /**
   *
   * Ordena las rutas por el número de usuarios en orden descendente
   *
   */
  public sortReversedByNumberUsers(): void {
    this.sortByNumberUsers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena las rutas por longitud en orden ascendente
   *
   */
  public sortByLenght(): void {
    this._elements.sort((a, b) => (a.length > b.length ? 1 : -1));
  }

  /**
   *
   * Ordena las rutas por longitud en orden descendente
   *
   */
  public sortReversedByLenght(): void {
    this.sortByLenght();
    this._elements.reverse();
  }

  /**
   *
   * Ordena las rutas por clasificación en orden ascendente
   *
   */
  public sortByScore(): void {
    this._elements.sort((a, b) => (a.avg_score > b.avg_score ? 1 : -1));
  }

  /**
   *
   * Ordena las rutas por clasificación en orden descendente
   *
   */
  public sortReversedByScore(): void {
    this.sortByScore();
    this._elements.reverse();
  }

  /**
   *
   * Ordena las rutas por la actividad para la que está destinada
   *
   */
  public sortByActivity(): void {
    this._elements.sort((a, b) => (a.activity > b.activity ? 1 : -1));
  }
}
