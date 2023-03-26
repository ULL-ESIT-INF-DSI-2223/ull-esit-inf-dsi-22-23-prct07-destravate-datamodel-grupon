import { Activity } from "../types/activity";
import { Challenge } from "../classes/challenge";
import { ChallengeCollection } from "../collections/challengeCollection";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  challenge: {
    _name: string;
    _routes: number[];
    _activity: Activity;
    _total_kilometers: number;
    _users: string[];
    _id: number;
  }[];
};

export class JsonChallengeCollection extends ChallengeCollection {
  private database: lowdb.LowdbSync<schemaType>;

  /**
   *
   * Constructor de la clase JsonChallengeCollection que representa una colección de retos del fichero JSON
   *
   * @param elements Retos de la colección
   */
  constructor(elements: Challenge[]) {
    super(elements);
    this.database = lowdb(new FileSync("./databases/challenge.json"));
    if (this.database.has("challenge").value()) {
      const dbItems = this.database.get("challenge").value();
      dbItems.forEach((item) => {
        super.add(
          new Challenge(
            item._id,
            item._name,
            item._routes,
            item._activity,
            item._total_kilometers,
            item._users
          )
        );
      });
    } else {
      this.database.set("challenge", elements).write();
      elements.forEach((item) => this._elements.push(item));
    }
  }

  /**
   *
   * Añade un reto al fichero JSON
   *
   * @param challenge Reto a añadir
   * @returns true si el reto se pudo añadir, false si un reto con el mismo ID ya estaba guardado
   */
  public addChallenge(challenge: Challenge): boolean {
    const result = super.add(challenge);
    this.storeChallenges();
    return result;
  }

  /**
   *
   * Elimina un reto de la colección por su ID
   *
   * @param id ID del reto a eliminar
   * @returns true si el reto se pudo eliminar, false si el reto no estaba guardada
   */
  public removeChallenge(id: number): boolean {
    const result = super.remove(id);
    this.storeChallenges();
    return result;
  }

  /**
   *
   * Actualiza un reto del fichero JSON
   *
   * @param challenge Reto a actualizar
   * @returns true si el reto se pudo actualizar, false si el reto no existe
   */
  public updateChallenge(challenge: Challenge): boolean {
    const result = super.update(challenge);
    this.storeChallenges();
    return result;
  }

  /**
   *
   * Almacena los retos en el fichero JSON
   *
   */
  public storeChallenges() {
    this.database.set("challenge", [...this._elements.values()]).write();
  }
}
