import { Activity } from "../types/activity";
import { Statistics } from "../classes/statistics";
import { UserCollection } from "../collections/userCollection";
import { User } from "../classes/user";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  user: {
    _id: string;
    _name: string;
    _activity: Activity;
    _friends: string[];
    _groups: number[];
    _statistics: Statistics;
    _favourite_routes: number[];
    _active_challenges: number[];
    _historical: [Date, number][];
  }[];
};

export class JsonUserCollection extends UserCollection {
  private database: lowdb.LowdbSync<schemaType>;
  constructor(elements: User[]) {
    super(elements);
    this.database = lowdb(new FileSync("./src/databases/user.json"));
    if (this.database.has("user").value()) {
      const dbItems = this.database.get("user").value();
      dbItems.forEach((item) => {
        super.add(
          new User(
            item._id,
            item._name,
            item._activity,
            item._friends,
            item._groups,
            item._statistics,
            item._favourite_routes,
            item._active_challenges,
            item._historical
          )
        );
      });
    } else {
      this.database.set("user", elements).write();
      elements.forEach((item) => this._elements.push(item));
    }
  }

  public addUser(user: User): boolean {
    const result = super.add(user);
    this.storeUsers();
    return result;
  }
  public removeUser(id: string): boolean {
    const result = super.remove(id);
    this.storeUsers();
    return result;
  }
  public updateUser(user: User): boolean {
    const result = super.update(user);
    this.storeUsers();
    return result;
  }
  public storeUsers() {
    this.database.set("user", [...this._elements.values()]).write();
  }
}
