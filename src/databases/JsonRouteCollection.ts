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
  constructor(elements: Route[]) {
    super(elements);
    this.database = lowdb(new FileSync("./src/databases/route.json"));
    if (this.database.has("route").value()) {
      const dbItems = this.database.get("route").value();
      dbItems.forEach((item) => {
        console.log(item._id);
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

  public addRoute(route: Route): boolean {
    const result = super.add(route);
    this.storeRoutes();
    return result;
  }
  public removeRoute(id: number): boolean {
    const result = super.remove(id);
    this.storeRoutes();
    return result;
  }
  public updateRoute(route: Route): boolean {
    const result = super.update(route);
    this.storeRoutes();
    return result;
  }
  public storeRoutes() {
    this.database.set("route", [...this._elements.values()]).write();
  }
}
