import { Group } from "../classes/group";
import { Collection } from "./collection";

export class GroupCollection extends Collection<Group, number> {
  /**
   *
   * Constructor de la clase GroupCollection que representa una colección de grupos
   *
   * @param elements Grupos de la colección. No pueden haber varios grupos con el mismo ID
   */
  constructor(elements: Group[]) {
    super(elements);
  }

  /**
   *
   * Ordena los grupos alfabéticamente por el nombre en orden ascendente
   *
   */
  public sortByName(): void {
    this._elements.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  /**
   *
   * Ordena los grupos alfabéticamente por el nombre en orden descendente
   *
   */
  public sortReversedByName(): void {
    this.sortByName();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los grupos por el total de kilómetros recorridos en la semana en orden ascendente
   *
   */
  public sortByTotalWeekKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.week_kilometers > b.statistics.week_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los grupos por el total de kilómetros recorridos en la semana en orden descendente
   *
   */
  public sortReversedTotalWeekKilometers(): void {
    this.sortByTotalWeekKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los grupos por el total de kilómetros recorridos en el mes en orden ascendente
   *
   */
  public sortByTotalMonthKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.month_kilometers > b.statistics.month_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los grupos por el total de kilómetros recorridos en el mes en orden descendente
   *
   */
  public sortReversedTotalMonthKilometers(): void {
    this.sortByTotalMonthKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los grupos por el total de kilómetros recorridos en el año en orden ascendente
   *
   */
  public sortByTotalYearKilometers(): void {
    this._elements.sort((a, b) =>
      a.statistics.year_kilometers > b.statistics.year_kilometers ? 1 : -1
    );
  }

  /**
   *
   * Ordena los grupos por el total de kilómetros recorridos en el año en orden descendente
   *
   */
  public sortReversedTotalYearKilometers(): void {
    this.sortByTotalYearKilometers();
    this._elements.reverse();
  }

  /**
   *
   * Ordena los grupos por el número de miembros en orden ascendente
   *
   */
  public sortByNumberOfMembers(): void {
    this._elements.sort((a, b) =>
      a.members_id.length > b.members_id.length ? 1 : -1
    );
  }

  /**
   *
   * Ordena los grupos por el número de miembros en orden descendente
   *
   */
  public sortReversedByNumberOfMembers(): void {
    this.sortByNumberOfMembers();
    this._elements.reverse();
  }
}
