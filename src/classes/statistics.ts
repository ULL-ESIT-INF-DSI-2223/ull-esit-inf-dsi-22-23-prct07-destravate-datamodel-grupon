import { Stringable } from "../interfaces/stringable";

export class Statistics implements Stringable {
  constructor(
    private _week_kilometers: number,
    private _week_unevenness: number,
    private _month_kilometers: number,
    private _month_unevenness: number,
    private _year_kilometers: number,
    private _year_unevenness: number
  ) {
    if (_week_kilometers < 0) {
      throw "La cantidad de kilómetros de la semana no puede ser negativa";
    } else if (_week_unevenness < 0) {
      throw "El desnivel total acumulado de la semana no puede ser negativo";
    } else if (_month_kilometers < 0) {
      throw "La cantidad de kilómetros del mes no puede ser negativa";
    } else if (_month_unevenness < 0) {
      throw "El desnivel total acumulado del mes no puede ser negativo";
    } else if (_year_kilometers < 0) {
      throw "La cantidad de kilómetros del año no puede ser negativa";
    } else if (_year_unevenness < 0) {
      throw "El desnivel total acumulado del año no puede ser negativo";
    }
    if (_week_kilometers > _month_kilometers) {
      throw "La cantidad de kilómetros de la semana no puede ser mayor a la cantidad de kilómetros del mes";
    } else if (_month_kilometers > _year_kilometers) {
      throw "La cantidad de kilómetros del mes no puede ser mayor a la cantidad de kilómetros del año";
    } else if (_week_unevenness > _month_unevenness) {
      throw "El desnivel total acumulado de la semana no puede ser mayor al desnivel total acumulado del mes";
    } else if (_month_unevenness > _year_unevenness) {
      throw "El desnivel total acumulado del mes no puede ser mayor al desnivel total acumulado del año";
    }
  }

  get week_kilometers(): number {
    return this._week_kilometers;
  }

  set week_kilometers(week_kilometers: number) {
    if (week_kilometers < 0) {
      throw "La cantidad de kilómetros de la semana no puede ser negativa";
    }
    if (week_kilometers > this._month_kilometers) {
      throw "La cantidad de kilómetros de la semana no puede ser mayor a la cantidad de kilómetros del mes";
    }
    this._week_kilometers = week_kilometers;
  }

  get week_unevenness(): number {
    return this._week_unevenness;
  }

  set week_unevenness(week_unevennes: number) {
    if (week_unevennes < 0) {
      throw "El desnivel total acumulado de la semana no puede ser negativo";
    }
    if (week_unevennes > this._month_unevenness) {
      throw "El desnivel total acumulado del mes no puede ser mayor al desnivel total acumulado del año";
    }
    this._week_unevenness = week_unevennes;
  }

  get month_kilometers(): number {
    return this._month_kilometers;
  }

  set month_kilometers(month_kilometers: number) {
    if (month_kilometers < 0) {
      throw "La cantidad de kilómetros del mes no puede ser negativa";
    }
    if (month_kilometers > this._year_kilometers) {
      throw "La cantidad de kilómetros del mes no puede ser mayor a la cantidad de kilómetros del año";
    } else if (month_kilometers < this._week_kilometers) {
      throw "La cantidad de kilómetros del mes no puede ser menor a la cantidad de kilómetros de la semana";
    }
    this._month_kilometers = month_kilometers;
  }

  get month_unevenness(): number {
    return this._month_unevenness;
  }

  set month_unevenness(month_unevenness: number) {
    if (month_unevenness < 0) {
      throw "El desnivel total acumulado del mes no puede ser negativo";
    }
    if (month_unevenness > this._year_unevenness) {
      throw "El desnivel total acumulado del mes no puede ser mayor al desnivel total acumulado del año";
    } else if (month_unevenness < this._week_unevenness) {
      throw "El desnivel total acumulado del mes no puede ser menor al desnivel total acumulado de la semana";
    }
    this._month_unevenness = month_unevenness;
  }

  get year_kilometers(): number {
    return this._year_kilometers;
  }

  set year_kilometers(year_kilometers: number) {
    if (year_kilometers < 0) {
      throw "La cantidad de kilómetros del año no puede ser negativa";
    }
    if (year_kilometers < this._month_kilometers) {
      throw "La cantidad de kilómetros del año no puede ser menor a la cantidad de kilómetros del mes";
    }
    this._year_kilometers = year_kilometers;
  }

  get year_unevenness(): number {
    return this._year_unevenness;
  }

  set year_unevenness(year_unevenness: number) {
    if (year_unevenness < 0) {
      throw "El desnivel total acumulado del año no puede ser negativo";
    }
    if (year_unevenness < this._month_unevenness) {
      throw "El desnivel total acumulado del año no puede ser menor al desnivel total acumulado del mes";
    }
    this._year_unevenness = year_unevenness;
  }

  public toString(): string {
    let output = "";
    output += `  - Kilómetros de la semana: ${this.week_kilometers}\n`;
    output += `  - Desnivel de la semana: ${this.week_unevenness}\n`;
    output += `  - Kilómetros de la mes: ${this.month_kilometers}\n`;
    output += `  - Desnivel de la mes: ${this.month_unevenness}\n`;
    output += `  - Kilómetros de la año: ${this.year_kilometers}\n`;
    output += `  - Desnivel de la año: ${this.year_unevenness}\n`;
    return output;
  }
}
