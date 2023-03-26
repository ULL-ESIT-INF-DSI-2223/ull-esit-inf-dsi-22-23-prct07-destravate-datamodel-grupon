import { GroupCollection } from "../collections/groupCollection";
import { User } from "../classes/user";
import { Activity } from "../types/activity";
import { Statistics } from "../classes/statistics";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Group } from "../classes/group";

type userSchema = {
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

type schemaType = {
  group: {
    _favourite_routes: number[];
    _historical: [Date, number][];
    _id: number;
    _name: string;
    _members_id: string[];
    _statistics: Statistics;
    _members_ranking: userSchema;
    _admins: string[];
  }[];
};

export class JsonGroupCollection extends GroupCollection {
  private database: lowdb.LowdbSync<schemaType>;

  /**
   *
   * Constructor de la clase JsonGroupCollection que representa una colección de grupos del fichero JSON
   *
   * @param elements Grupos de la colección
   */
  constructor(elements: Group[]) {
    super(elements);
    this.database = lowdb(new FileSync("./databases/group.json"));
    if (this.database.has("group").value()) {
      const dbItems = this.database.get("group").value();
      dbItems.forEach((item) => {
        const input_users: User[] = [];
        for (let i = 0; i < item._members_ranking.length; i++) {
          input_users.push(
            new User(
              item._members_ranking[i]._id,
              item._members_ranking[i]._name,
              item._members_ranking[i]._activity,
              item._members_ranking[i]._friends,
              item._members_ranking[i]._groups,
              item._members_ranking[i]._statistics,
              item._members_ranking[i]._favourite_routes,
              item._members_ranking[i]._active_challenges,
              item._members_ranking[i]._historical
            )
          );
        }

        const group = new Group(
          item._id,
          item._name,
          input_users,
          item._favourite_routes,
          item._historical
        );
        item._admins.forEach((element) => {
          group.addAdmin(element);
        });

        super.add(group);
      });
    } else {
      this.database.set("group", elements).write();
      elements.forEach((item) => this._elements.push(item));
    }
  }

  /**
   *
   * Añade un grupo al fichero JSON
   *
   * @param group Grupo a añadir
   * @returns true si el grupo se pudo añadir, false si un grupo con el mismo ID ya estaba guardado
   */
  public addGroup(group: Group): boolean {
    const result = super.add(group);
    this.storeGroups();
    return result;
  }

  /**
   *
   * Elimina un grupo de la colección por su ID
   *
   * @param id ID del grupo a eliminar
   * @returns true si el grupo se pudo eliminar, false si el grupo no estaba guardada
   */
  public removeGroup(id: number): boolean {
    const result = super.remove(id);
    this.storeGroups();
    return result;
  }

  /**
   *
   * Actualiza un grupo del fichero JSON
   *
   * @param group Grupo a actualizar
   * @returns true si el grupo se pudo actualizar, false si el grupo no existe
   */
  public updateGroup(group: Group): boolean {
    const result = super.update(group);
    this.storeGroups();
    return result;
  }

  /**
   *
   * Almacena los grupos en el fichero JSON
   *
   */
  public storeGroups() {
    this.database.set("group", [...this._elements.values()]).write();
  }
}
