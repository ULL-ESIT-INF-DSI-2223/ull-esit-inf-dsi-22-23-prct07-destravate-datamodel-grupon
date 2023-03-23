import { Route } from "./route";
import { Statistics } from "./statistics";
import { User } from "./user";
/**
 *
 * Clase que representa una ruta
 * Atributos
 *  id_ - ID único del grupo.
 *  name_ - Nombre del grupo.
 *  participants_ids_ - Colleción de IDs de usuarios miembros del grupo.
 *
 */
export class Group {
  private _favourite_routes: number[] = [];
  private _historical: [Date, number][] = [];
  private _id: number;
  private _name: string;
  private _members_id: string[];
  private _statistics: Statistics;
  private _members_ranking: User[];

  constructor(
    id: number,
    name: string,
    members: User[],
    favourite_routes: number[],
    historical: [Date, number][]
  ) {
    if (id < 0 || id % 1 !== 0) {
      throw new Error(`ID de Grupo no válido`);
    }
    const favourite_routes_set = new Set(favourite_routes);
    favourite_routes_set.forEach((route_id) => {
      if (route_id < 0 || route_id % 1 !== 0) {
        throw new Error(`ID ${route_id} de ruta no válido`);
      } else {
        this._favourite_routes.push(route_id);
      }
    });
    const historical_set = new Set(historical);
    historical_set.forEach((element) => {
      if (element[0] > new Date()) {
        throw new Error("La fecha de una ruta del historial no puede ser futura");
      }
      if (element[1] < 0 || element[1] % 1 !== 0) {
        throw new Error(`ID ${element[1]} de ruta del historial no válido`);
      } else {
        this._historical.push(element);
      }
    });
    this._id = id;
    this._name = name;
    this._members_id= [];
    let s1 = 0;
    let s2 = 0;
    let s3 = 0;
    let s4 = 0;
    let s5 = 0;
    let s6 = 0;
    this._members_ranking = members;
    this._members_ranking.sort((a,b) => (a.statistics.year_kilometers > b.statistics.year_kilometers) ? 1:-1)
    members.forEach(member => {
      this._members_id.push(member.id)
      s1 = s1 + member.statistics.week_kilometers;
      s2 = s2 + member.statistics.week_unevenness;
      s3 = s3 + member.statistics.month_kilometers
      s4 = s4 + member.statistics.month_unevenness;
      s5 = s5 + member.statistics.year_kilometers;
      s6 = s6 + member.statistics.year_unevenness;
    });
    this._statistics = new Statistics(s1,s2,s3,s4,s5,s6);
  }

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    if (id < 0 || id % 1 !== 0) {
      throw new Error(`ID de Grupo no válido`);
    }
    this._id = id;
  }
  public get name(): string {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }

  public get members_ranking(): User[] {
    return this._members_ranking;
  }

  public get members_id(): string[] {
    return this._members_id;
  }

  public get statistics(): Statistics {
    return this._statistics;
  }

  get favourite_routes(): number[] {
    return this._favourite_routes;
  }

  set favourite_routes(favourite_routes: number[]) {
    const favourite_routes_set = new Set(favourite_routes);
    const tmp = this._favourite_routes.splice(0);
    favourite_routes_set.forEach((id) => {
      if (id < 0 || id % 1 !== 0) {
        this._favourite_routes = tmp;
        throw new Error(`ID ${id} de ruta no válido`);
      } else {
        this._favourite_routes.push(id);
      }
    });
  }

  public addFavouriteRoute(route: number | Route): boolean {
    if (typeof route === "number") {
      if (route >= 0 && route % 1 === 0 && !this._favourite_routes.includes(route)) {
        this._favourite_routes.push(route);
        return true;
      }
    } else {
      if (!this._favourite_routes.includes(route.id)) {
        this._favourite_routes.push(route.id);
        return true;
      }
    }
    return false;
  }

  public removeFavouriteRoute(route: number | Route): boolean {
    let index: number;
    if (typeof route === "number") {
      index = this._favourite_routes.indexOf(route);
    } else {
      index = this._favourite_routes.indexOf(route.id);
    }
    if (index > -1) {
      this._favourite_routes.splice(index, 1);
      return true;
    }
    return false
  }

  get historical(): [Date, number][] {
    return this._historical;
  }

  set historical(historical: [Date, number][]) {
    const historical_set = new Set(historical);
    const tmp = this._historical.splice(0);
    historical_set.forEach((element) => {
      if (element[0] > new Date()) {
        this._historical = tmp;
        throw new Error("La fecha de una ruta del historial no puede ser futura");
      }
      if (element[1] < 0 || element[1] % 1 !== 0) {
        throw new Error(`ID ${element[1]} de ruta del historial no válido`);
      } else {
        this._historical.push(element);
      }
    });
  }

  public addMember(member: User): boolean {
    if (!this._members_id.includes(member.id)) {
      this._members_id.push(member.id)
      const s1 =  this.statistics.week_kilometers + member.statistics.week_kilometers;
      const s2 =  this.statistics.week_kilometers + member.statistics.week_unevenness;
      const s3 =  this.statistics.week_kilometers + member.statistics.month_kilometers
      const s4 =  this.statistics.week_kilometers + member.statistics.month_unevenness;
      const s5 =  this.statistics.week_kilometers + member.statistics.year_kilometers;
      const s6 =  this.statistics.week_kilometers + member.statistics.year_unevenness;
      this._statistics = new Statistics(s1,s2,s3,s4,s5,s6);
      this._members_ranking.push(member)
      this._members_ranking.sort((a,b) => (a.statistics.year_kilometers > b.statistics.year_kilometers) ? 1:-1)
      return true;
    }
    return false;
  }
  

  public removeMember(member_id: string): boolean {
    const index = this._members_id.indexOf(member_id);
    
    if (index > -1) {
      let index_in_ranking = index;
      this.members_ranking.forEach((element,index2) => {
        if(element.id ===member_id) {
          index_in_ranking =index2;
        }
      });
      const s1 =  this.statistics.week_kilometers - this._members_ranking[index_in_ranking].statistics.week_kilometers;
      const s2 =  this.statistics.week_unevenness - this._members_ranking[index_in_ranking].statistics.week_unevenness;
      const s3 =  this.statistics.month_kilometers - this._members_ranking[index_in_ranking].statistics.month_kilometers
      const s4 =  this.statistics.month_unevenness - this._members_ranking[index_in_ranking].statistics.month_unevenness;
      const s5 =  this.statistics.year_kilometers - this._members_ranking[index_in_ranking].statistics.year_kilometers;
      const s6 =  this.statistics.year_unevenness - this._members_ranking[index_in_ranking].statistics.year_unevenness;
      this._members_id.splice(index, 1);
      this._members_ranking.splice(index_in_ranking, 1);
      this._statistics = new Statistics(s1,s2,s3,s4,s5,s6);
      
      this._members_ranking.sort((a,b) => (a.statistics.year_kilometers > b.statistics.year_kilometers) ? 1:-1)
      return true;
    }
    return false;
  }

}
