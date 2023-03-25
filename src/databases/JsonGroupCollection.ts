import { GroupCollection } from "../collections/groupCollection";
import { User } from "../classes/user";
import { Statistics } from "../classes/statistics";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Group } from "../classes/group";

type schemaType = {
  group: {
    _favourite_routes: number[];
    _historical: [Date, number][];
    _id: number;
    _name: string;
    _members_id: string[];
    _statistics: Statistics;
    _members_ranking: User[];
  }[];
};

export class JsonGroupCollection extends GroupCollection {
  private database: lowdb.LowdbSync<schemaType>;
  constructor(elements: Group[]) {
    super(elements);
    this.database = lowdb(new FileSync("./src/databases/group.json"));
    if (this.database.has("group").value()) {
      const dbItems = this.database.get("group").value();
      dbItems.forEach((item) => {
        const users: User[] = [];
        super.add(
          new Group(
            item._id,
            item._name,
            users,
            item._favourite_routes,
            item._historical
          )
        );
      });
    } else {
      this.database.set("group", elements).write();
      elements.forEach((item) => this._elements.push(item));
    }
  }

  public addGroup(group: Group): boolean {
    const result = super.add(group);
    this.storeGroups();
    return result;
  }
  public removeGroup(id: number): boolean {
    const result = super.remove(id);
    this.storeGroups();
    return result;
  }
  public updateGroup(group: Group): boolean {
    const result = super.update(group);
    this.storeGroups();
    return result;
  }
  public storeGroups() {
    this.database.set("group", [...this._elements.values()]).write();
  }
}
