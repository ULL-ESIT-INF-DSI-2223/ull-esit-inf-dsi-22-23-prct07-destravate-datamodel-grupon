import { Route } from "../classes/route";
import { Coord } from "../classes/coord";
import { Activity } from "../types/activity";
import { RouteCollection } from "../collections/routeCollection";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  route: {
    _id: number;
    _name: string;
    _ini_cords: Coord;
    _end_cords: Coord;
    _length: number;
    _average_slope: number;
    _visitors_id: string[];
    _activity: Activity;
    _avg_score: number;
  }[];
};

export class JsonRouteCollection extends RouteCollection {
  private database: lowdb.LowdbSync<schemaType>;

  /**
   *
   * Constructor de la clase JsonRouteCollection que representa una colección de rutas del fichero JSON
   *
   * @param elements Rutas de la colección
   */
  constructor(elements: Route[]) {
    super(elements);
    this.database = lowdb(new FileSync("./databases/route.json"));
    if (this.database.has("route").value()) {
      const dbItems = this.database.get("route").value();
      dbItems.forEach((item) => {
        super.add(
          new Route(
            item._id,
            item._name,
            item._ini_cords,
            item._end_cords,
            item._length,
            item._average_slope,
            item._visitors_id,
            item._activity,
            item._average_slope
          )
        );
      });
    } else {
      this.database.set("route", elements).write();
      elements.forEach((item) => this._elements.push(item));
    }
  }

  /**
   *
   * Añade una ruta al fichero JSON
   *
   * @param route Ruta a añadir
   * @returns true si la ruta se pudo añadir, false si una ruta con el mismo ID ya estaba guardado
   */
  public addRoute(route: Route): boolean {
    const result = super.add(route);
    this.storeRoutes();
    return result;
  }

  /**
   *
   * Elimina una ruta de la colección por su ID
   *
   * @param id ID de la ruta a eliminar
   * @returns true si la ruta se pudo eliminar, false si la ruta no estaba guardada
   */
  public removeRoute(id: number): boolean {
    const result = super.remove(id);
    this.storeRoutes();
    return result;
  }

  /**
   *
   * Actualiza una ruta del fichero JSON
   *
   * @param route Ruta a actualizar
   * @returns true si la ruta se pudo actualizar, false si la ruta no existe
   */
  public updateRoute(route: Route): boolean {
    const result = super.update(route);
    this.storeRoutes();
    return result;
  }

  /**
   *
   * Almacena las rutas en el fichero JSON
   *
   */
  public storeRoutes() {
    this.database.set("route", [...this._elements.values()]).write();
  }
}
