import { Activity } from "./types/activity";

/**
 *
 * Clase que representa una ruta
 * Atributos
 *  id_ - ID único de la ruta.
 *  name_ - Nombre de la ruta.
 *  participants_ids_ - Colleción de IDs de usuarios miembros del grupo.
 *
 */
export class Group {
  constructor(private id_: number, private name_: string) {}

  public get id(): number {
    return this.id_;
  }
  public get name(): string {
    return this.name_;
  }
}
