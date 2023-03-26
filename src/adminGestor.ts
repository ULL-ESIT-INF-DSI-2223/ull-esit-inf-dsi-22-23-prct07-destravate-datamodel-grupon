import inquirer from "inquirer";

import { GeneralCommands } from "./enums/GeneralComands";
import { GroupsAdminCommands } from "./enums/GroupAdminComands";
import { RouteAdminCommands } from "./enums/RouteAdminComands";
import { ChallengeAdminCommands } from "./enums/ChallengeAdminComands";
import { UserAdminCommands } from "./enums/UserAdminCommands";

import { Activity } from "./types/activity";
import { Coord } from "./classes/coord";
import { JsonRouteCollection } from "./databases/JsonRouteCollection";
import { routeExample } from "./examples/routeExample";
import { Route } from "./classes/route";
import { JsonChallengeCollection } from "./databases/JsonChallengeCollection";
import { challengeExample } from "./examples/challengeExample";
import { Challenge } from "./classes/challenge";
import { JsonGroupCollection } from "./databases/JsonGroupCollection";
import { groupExample } from "./examples/groupExample";
import { Group } from "./classes/group";
import { JsonUserCollection } from "./databases/JsonUserCollection";
import { userExample } from "./examples/userExample";
import { User } from "./classes/user";
import { Statistics } from "./classes/statistics";

export class AdminGestor {
  private _route_collection;
  private _challenge_collection;
  private _group_collection;
  private _user_collection;
  private _selector;
  private static adminGestorInstance: AdminGestor;

  /**
   * Constructor de la clase AdminGestor
   */
  private constructor() {
    this._route_collection = new JsonRouteCollection(routeExample);
    this._challenge_collection = new JsonChallengeCollection(challengeExample);
    this._group_collection = new JsonGroupCollection(groupExample);
    this._user_collection = new JsonUserCollection(userExample);
    this._selector = -1;
  }

  /**
   * Devuelve una instancia de AdminGestor siguiendo el patrón Singleton
   * @returns Instancia única de AdminGestor
   */
  public static getAdminGestorInstance(): AdminGestor {
    if (!AdminGestor.adminGestorInstance) {
      AdminGestor.adminGestorInstance = new AdminGestor();
    }
    return AdminGestor.adminGestorInstance;
  }

  /**
   * Muestra por consola la colección de elementos que se requiera
   */
  private printRequested(): void {
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

    switch (this._selector) {
      case 1:
        console.log(this._route_collection.toString());
        break;
      case 2:
        console.log(this._challenge_collection.toString());
        break;
      case 3:
        console.log(this._user_collection.toString());
        break;
      case 4:
        console.log(this._group_collection.toString());
        break;

      default:
        console.log();
        break;
    }
  }

  /**
   * Muestra por consola el prompt para eliminar una ruta de la base de datos según el ID
   */
  private async removeRoutePrompt() {
    let flag = false;
    while (!flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "removeID",
          message: "Introduce the id of the route you want to delete:",
        })
        .then((answers) => {
          if (answers["removeID"] !== "" && /^\d+$/.test(answers["removeID"])) {
            flag = this._route_collection.removeRoute(
              Number(answers["removeID"])
            );
          }
          if (!flag) {
            console.log(`ID ${answers["removeID"]} not found or invalid`);
          }
        });
    }
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt para añadir una ruta a la base de datos. Para esto pide todos los datos necesarios para crear una nueva ruta
   */
  private async addRoutePrompt() {
    console.clear();
    let routeID = -1;
    let routeName = "default";
    let x_ini_cord = -1;
    let y_ini_cord = -1;
    let x_end_cord = -1;
    let y_end_cord = -1;
    let routeLength = -1;
    let routeSlope = -1;
    let routeScore = -1;
    let routeVisitors: string[] = [];
    let routeActivity: Activity = "Bicycle";
    while (routeID < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeID",
          message: "Introduce new route id:",
        })
        .then((answers) => {
          if (answers["routeID"] !== "" && /^\d+$/.test(answers["routeID"])) {
            routeID = Number(answers["routeID"]);
          } else {
            console.log("ID not valid, try again");
          }
        });
    }
    await inquirer
      .prompt({
        type: "input",
        name: "routeName",
        message: "Introduce new route Name:",
      })
      .then((answers) => {
        if (answers["routeName"] !== "") {
          routeName = answers["routeName"];
        }
      });

    while (x_ini_cord < 0 || y_ini_cord < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeIniCord",
          message: "Introduce new route initial cordinates:",
        })
        .then((answers) => {
          if (
            answers["routeIniCord"] !== "" &&
            /^\d+ \d+$/.test(answers["routeIniCord"])
          ) {
            const splitN = answers["routeIniCord"].split(" ");
            x_ini_cord = parseFloat(splitN[0]);
            y_ini_cord = parseFloat(splitN[1]);
          }
        });
      if (x_ini_cord < 0 || y_ini_cord < 0)
        console.log("Invalid initial cordinates, try again");
    }
    while (x_end_cord < 0 || y_end_cord < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeEndCord",
          message: "Introduce new route end cordinates:",
        })
        .then((answers) => {
          if (
            answers["routeEndCord"] !== "" &&
            /^\d+ \d+$/.test(answers["routeEndCord"])
          ) {
            const splitN = answers["routeEndCord"].split(" ");
            x_end_cord = parseFloat(splitN[0]);
            y_end_cord = parseFloat(splitN[1]);
          }
        });
      if (x_end_cord < 0 || y_end_cord < 0)
        console.log("Invalid end cordinates, try again");
    }

    while (routeLength < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeLength",
          message: "Introduce new route length:",
        })
        .then((answers) => {
          if (
            answers["routeLength"] !== "" &&
            /^\d+$/.test(answers["routeLength"])
          ) {
            routeLength = Number(answers["routeLength"]);
          }
          if (routeLength < 0) console.log("Length not valid, try again");
        });
    }
    while (routeSlope < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeSlope",
          message: "Introduce new route slope:",
        })
        .then((answers) => {
          if (
            answers["routeSlope"] !== "" &&
            /^\d+$/.test(answers["routeSlope"])
          ) {
            routeSlope = Number(answers["routeSlope"]);
          }
          if (routeSlope < 0) console.log("Slope not valid, try again");
        });
    }
    const rg = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
    let flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeVisitors",
          message: "Introduce users id who have visited the route:",
        })
        .then((answers) => {
          if (
            answers["routeVisitors"] !== "" &&
            rg.test(answers["routeVisitors"])
          ) {
            routeVisitors = answers["routeVisitors"].split(" ");
            flag = false;
          } else {
            console.log("One or more user ID not valid, try again");
          }
        });
    }
    flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeActivity",
          message: "Introduce route activity:",
        })
        .then((answers) => {
          if (
            answers["routeActivity"] !== "" &&
            ["Bicycle", "Running"].includes(answers["routeActivity"])
          ) {
            routeActivity = answers["routeActivity"];
            flag = false;
          } else {
            console.log("Invalid activity try again");
          }
        });
    }

    while (routeScore < 0 || routeScore > 10) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeScore",
          message: "Introduce new route score:",
        })
        .then((answers) => {
          if (
            answers["routeScore"] !== "" &&
            /^\d+$/.test(answers["routeScore"])
          ) {
            routeScore = Number(answers["routeScore"]);
          }
          if (routeScore < 0 || routeScore > 10)
            console.log("Length not valid, try again");
        });
    }
    const RouteToAdd = new Route(
      routeID,
      routeName,
      new Coord(x_ini_cord, y_ini_cord),
      new Coord(x_end_cord, y_end_cord),
      routeLength,
      routeSlope,
      routeVisitors,
      routeActivity,
      routeScore
    );
    this._route_collection.addRoute(RouteToAdd);
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt para actualizar una ruta a la base de datos. Para esto pide todos los datos necesarios para actualizar la ruta y la actualiza según su ID
   */
  private async updateRoutePrompt() {
    console.clear();
    let routeID = -1;
    let routeName = "default";
    let x_ini_cord = -1;
    let y_ini_cord = -1;
    let x_end_cord = -1;
    let y_end_cord = -1;
    let routeLength = -1;
    let routeSlope = -1;
    let routeScore = -1;
    let routeVisitors: string[] = [];
    let routeActivity: Activity = "Bicycle";
    while (routeID < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeID",
          message: "Introduce route id:",
        })
        .then((answers) => {
          if (
            answers["routeID"] !== "" &&
            /^\d+$/.test(answers["routeID"]) &&
            this._route_collection.hasID(Number(answers["routeID"]))
          ) {
            routeID = Number(answers["routeID"]);
          } else {
            console.log("ID not found, try again");
          }
        });
    }
    await inquirer
      .prompt({
        type: "input",
        name: "routeName",
        message: "Introduce new route Name:",
      })
      .then((answers) => {
        if (answers["routeName"] !== "") {
          routeName = answers["routeName"];
        }
      });

    while (x_ini_cord < 0 || y_ini_cord < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeIniCord",
          message: "Introduce new route initial cordinates:",
        })
        .then((answers) => {
          if (
            answers["routeIniCord"] !== "" &&
            /^\d+ \d+$/.test(answers["routeIniCord"])
          ) {
            const splitN = answers["routeIniCord"].split(" ");
            x_ini_cord = parseFloat(splitN[0]);
            y_ini_cord = parseFloat(splitN[1]);
          }
        });
      if (x_ini_cord < 0 || y_ini_cord < 0)
        console.log("Invalid initial cordinates, try again");
    }
    while (x_end_cord < 0 || y_end_cord < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeEndCord",
          message: "Introduce new route end cordinates:",
        })
        .then((answers) => {
          if (
            answers["routeEndCord"] !== "" &&
            /^\d+ \d+$/.test(answers["routeEndCord"])
          ) {
            const splitN = answers["routeEndCord"].split(" ");
            x_end_cord = parseFloat(splitN[0]);
            y_end_cord = parseFloat(splitN[1]);
          }
        });
      if (x_end_cord < 0 || y_end_cord < 0)
        console.log("Invalid end cordinates, try again");
    }

    while (routeLength < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeLength",
          message: "Introduce new route length:",
        })
        .then((answers) => {
          if (
            answers["routeLength"] !== "" &&
            /^\d+$/.test(answers["routeLength"])
          ) {
            routeLength = Number(answers["routeLength"]);
          }
          if (routeLength < 0) console.log("Length not valid, try again");
        });
    }
    while (routeSlope < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeSlope",
          message: "Introduce new route slope:",
        })
        .then((answers) => {
          if (
            answers["routeSlope"] !== "" &&
            /^\d+$/.test(answers["routeSlope"])
          ) {
            routeSlope = Number(answers["routeSlope"]);
          }
          if (routeSlope < 0) console.log("Slope not valid, try again");
        });
    }
    const rg = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
    let flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeVisitors",
          message: "Introduce users id who have visited the route:",
        })
        .then((answers) => {
          if (
            answers["routeVisitors"] !== "" &&
            rg.test(answers["routeVisitors"])
          ) {
            routeVisitors = answers["routeVisitors"].split(" ");
            flag = false;
          } else {
            console.log("One or more user ID not valid, try again");
          }
        });
    }
    flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeActibity",
          message: "Introduce route activity:",
        })
        .then((answers) => {
          if (
            answers["routeActibity"] !== "" &&
            ["Bicycle", "Running"].includes(answers["routeActibity"])
          ) {
            routeActivity = answers["routeActibity"];
            flag = false;
          } else {
            console.log("Invalid activity try again");
          }
        });
    }

    while (routeScore < 0 || routeScore > 10) {
      await inquirer
        .prompt({
          type: "input",
          name: "routeScore",
          message: "Introduce new route score:",
        })
        .then((answers) => {
          if (
            answers["routeScore"] !== "" &&
            /^\d+$/.test(answers["routeScore"])
          ) {
            routeScore = Number(answers["routeScore"]);
          }
          if (routeScore < 0 || routeScore > 10)
            console.log("Length not valid, try again");
        });
    }
    const RouteToAdd = new Route(
      routeID,
      routeName,
      new Coord(x_ini_cord, y_ini_cord),
      new Coord(x_end_cord, y_end_cord),
      routeLength,
      routeSlope,
      routeVisitors,
      routeActivity,
      routeScore
    );

    this._route_collection.updateRoute(RouteToAdd);
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt con las posibles acciones a realizar sobre las rutas de la base de datos
   */
  private async routePrompt() {
    console.clear();
    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(RouteAdminCommands),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case RouteAdminCommands.ShowRoutesAlphabetically:
            this._route_collection.sortAlphabetically();
            this.promptMenu();
            break;
          case RouteAdminCommands.ShowRoutesReversedAlphabetically:
            this._route_collection.sortReversedAlphabetically();
            this.promptMenu();
            break;
          case RouteAdminCommands.ShowRoutesByVisitors:
            this._route_collection.sortByNumberUsers();
            this.promptMenu();
            break;
          case RouteAdminCommands.ShowRoutesByVisitorsReversed:
            this._route_collection.sortReversedByNumberUsers();
            this.promptMenu();
            break;

          case RouteAdminCommands.ShowRoutesByLength:
            this._route_collection.sortByLenght();
            this.promptMenu();
            break;
          case RouteAdminCommands.ShowRoutesByLengthReversed:
            this._route_collection.sortReversedByLenght();
            this.promptMenu();
            break;
          case RouteAdminCommands.AddNewRoute:
            this.addRoutePrompt();
            break;
          case RouteAdminCommands.RemoveRoute:
            this.removeRoutePrompt();
            break;
          case RouteAdminCommands.UpdateRoute:
            this.updateRoutePrompt();
            break;
        }
      });
  }

  /**
   * Muestra por consola el prompt para eliminar un reto de la base de datos según el ID
   */
  private async removeChallengePrompt() {
    let flag = false;
    while (!flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "removeID",
          message: "Introduce the id of the challenge you want to delete:",
        })
        .then((answers) => {
          if (answers["removeID"] !== "" && /^\d+$/.test(answers["removeID"])) {
            flag = this._challenge_collection.removeChallenge(
              Number(answers["removeID"])
            );
          }
          if (!flag) {
            console.log(`ID ${answers["removeID"]} not found or invalid`);
          }
        });
    }
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt para añadir un reto a la base de datos. Para esto pide todos los datos necesarios para crear un nuevo reto
   */
  private async addChallengePropmt() {
    console.clear();
    let challengeID = -1;
    let challengeName = "default";
    let challengeRoutes: number[] = [];
    let challengeKilometers = -1;
    let challengeActivity: Activity = "Bicycle";
    let usersParticipating: string[] = [];
    while (challengeID < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "challengeID",
          message: "Introduce new challenge id:",
        })
        .then((answers) => {
          if (
            answers["challengeID"] !== "" &&
            /^\d+$/.test(answers["challengeID"])
          ) {
            challengeID = Number(answers["challengeID"]);
          } else {
            console.log("ID not valid, try again");
          }
        });
    }
    await inquirer
      .prompt({
        type: "input",
        name: "challengeName",
        message: "Introduce new challenge Name:",
      })
      .then((answers) => {
        if (answers["challengeName"] !== "") {
          challengeName = answers["challengeName"];
        }
      });

    const rg2 = /^\d+(\s+\d+)*$/;
    let flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "challengeRoutes",
          message: "Introduce routes id of challenge:",
        })
        .then((answers) => {
          if (
            answers["challengeRoutes"] !== "" &&
            rg2.test(answers["challengeRoutes"])
          ) {
            challengeRoutes = answers["challengeRoutes"]
              .split(" ")
              .map((numStr: string) => parseInt(numStr, 10));
            flag = false;
          } else {
            console.log("One or more user ID not valid, try again");
          }
        });
    }
    flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "challengeActivity",
          message: "Introduce challenge activity:",
        })
        .then((answers) => {
          if (
            answers["challengeActivity"] !== "" &&
            ["Bicycle", "Running"].includes(answers["challengeActivity"])
          ) {
            challengeActivity = answers["challengeActivity"];
            flag = false;
          } else {
            console.log("Invalid activity try again");
          }
        });
    }

    while (challengeKilometers < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "challengeID",
          message: "Introduce challenge Kilometers:",
        })
        .then((answers) => {
          if (
            answers["challengeID"] !== "" &&
            /^\d+$/.test(answers["challengeID"])
          ) {
            challengeKilometers = Number(answers["challengeID"]);
          } else {
            console.log("Not valid input, try again");
          }
        });
    }

    const rg = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
    flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "usersParticipating",
          message: "Introduce users id who are doing the challenge:",
        })
        .then((answers) => {
          if (
            answers["usersParticipating"] !== "" &&
            rg.test(answers["usersParticipating"])
          ) {
            usersParticipating = answers["usersParticipating"].split(" ");
            flag = false;
          } else {
            console.log("One or more user ID not valid, try again");
          }
        });
    }

    const ChallengeToAdd = new Challenge(
      challengeID,
      challengeName,
      challengeRoutes,
      challengeActivity,
      challengeKilometers,
      usersParticipating
    );
    this._challenge_collection.addChallenge(ChallengeToAdd);
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt para actualizar un reto a la base de datos. Para esto pide todos los datos necesarios para actualizar el reto y lo actualiza según su ID
   */
  private async updateChallengePropmt() {
    console.clear();
    let challengeID = -1;
    let challengeName = "default";
    let challengeRoutes: number[] = [];
    let challengeKilometers = -1;
    let challengeActivity: Activity = "Bicycle";
    let usersParticipating: string[] = [];
    while (challengeID < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "challengeID",
          message: "Introduce route id:",
        })
        .then((answers) => {
          if (
            answers["challengeID"] !== "" &&
            /^\d+$/.test(answers["challengeID"]) &&
            this._challenge_collection.hasID(Number(answers["challengeID"]))
          ) {
            challengeID = Number(answers["challengeID"]);
          } else {
            console.log("ID not found, try again");
          }
        });
    }
    await inquirer
      .prompt({
        type: "input",
        name: "challengeName",
        message: "Introduce new challenge Name:",
      })
      .then((answers) => {
        if (answers["challengeName"] !== "") {
          challengeName = answers["challengeName"];
        }
      });

    const rg2 = /^\d+(\s+\d+)*$/;
    let flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "challengeRoutes",
          message: "Introduce routes id of challenge:",
        })
        .then((answers) => {
          if (
            answers["challengeRoutes"] !== "" &&
            rg2.test(answers["challengeRoutes"])
          ) {
            challengeRoutes = answers["challengeRoutes"]
              .split(" ")
              .map((numStr: string) => parseInt(numStr, 10));
            flag = false;
          } else {
            console.log("One or more user ID not valid, try again");
          }
        });
    }
    flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "challengeActivity",
          message: "Introduce challenge activity:",
        })
        .then((answers) => {
          if (
            answers["challengeActivity"] !== "" &&
            ["Bicycle", "Running"].includes(answers["challengeActivity"])
          ) {
            challengeActivity = answers["challengeActivity"];
            flag = false;
          } else {
            console.log("Invalid activity try again");
          }
        });
    }

    while (challengeKilometers < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "challengeID",
          message: "Introduce challenge Kilometers:",
        })
        .then((answers) => {
          if (
            answers["challengeID"] !== "" &&
            /^\d+$/.test(answers["challengeID"])
          ) {
            challengeKilometers = Number(answers["challengeID"]);
          } else {
            console.log("Not valid input, try again");
          }
        });
    }

    const rg = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
    flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "usersParticipating",
          message: "Introduce users id who are doing the challenge:",
        })
        .then((answers) => {
          if (
            answers["usersParticipating"] !== "" &&
            rg.test(answers["usersParticipating"])
          ) {
            usersParticipating = answers["usersParticipating"].split(" ");
            flag = false;
          } else {
            console.log("One or more user ID not valid, try again");
          }
        });
    }

    const ChallengeToAdd = new Challenge(
      challengeID,
      challengeName,
      challengeRoutes,
      challengeActivity,
      challengeKilometers,
      usersParticipating
    );
    this._challenge_collection.updateChallenge(ChallengeToAdd);
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt con las posibles acciones a realizar sobre los retos de la base de datos
   */
  private async challengePrompt() {
    console.clear();
    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(ChallengeAdminCommands),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case ChallengeAdminCommands.ShowChallengeAlphabetically:
            this._challenge_collection.sortByName();
            this.promptMenu();
            break;
          case ChallengeAdminCommands.ShowChallengeReversedAlphabetically:
            this._challenge_collection.sortReversedByName();
            this.promptMenu();
            break;
          case ChallengeAdminCommands.ShowChallengeByKilometers:
            this._challenge_collection.sortByKilometers();
            this.promptMenu();
            break;
          case ChallengeAdminCommands.ShowChallengeByKilometersReversed:
            this._challenge_collection.sortReversedByKilometers();
            this.promptMenu();
            break;
          case ChallengeAdminCommands.ShowChallengeByTotalUsers:
            this._challenge_collection.sortByTotalUsers();
            this.promptMenu();
            break;
          case ChallengeAdminCommands.ShowChallengeByTotalUsersReversed:
            this._challenge_collection.sortReversedByTotalUsers();
            this.promptMenu();
            break;
          case ChallengeAdminCommands.RemoveChallenge:
            this.removeChallengePrompt();
            break;
          case ChallengeAdminCommands.AddChallenge:
            this.addChallengePropmt();
            break;
          case ChallengeAdminCommands.UpdateChallenge:
            this.updateChallengePropmt();
            break;
        }
      });
  }

  /**
   * Muestra por consola el prompt para eliminar un usuario de la base de datos según el ID
   */
  private async removeUserPrompt() {
    let flag = false;
    let foundedID = "";
    while (!flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "removeID",
          message: "Introduce the id of the user you want to delete:",
        })
        .then((answers) => {
          if (answers["removeID"] !== "") {
            flag = this._user_collection.removeUser(answers["removeID"]);
          }
          if (!flag) {
            console.log(`ID ${answers["removeID"]} not found or invalid`);
          } else {
            foundedID = answers["removeID"];
          }
        });
    }

    for (let i = 0; i < this._group_collection.elements.length; i++) {
      this._group_collection.elements[i].removeMember(foundedID);
    }
    this._group_collection.storeGroups();
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt para añadir un usuario a la base de datos. Para esto pide los datos necesarios para crear un nuevo usuario
   */
  private async addUserPropmt() {
    console.clear();
    let UserID = "";
    let UserName = "";
    let UserActivity: Activity = "Running";
    const Userfriends: string[] = [];
    const Usergroups: number[] = [];
    const Userstatistics: Statistics = new Statistics(0, 0, 0, 0, 0, 0);
    const Userfavourite_routes: number[] = [];
    const Useractive_challenges: number[] = [];
    const Userhistorical: [Date, number][] = [];

    let flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "UserID",
          message: "Introduce new user id:",
        })
        .then((answers) => {
          if (answers["UserID"] !== "") {
            UserID = answers["UserID"];
          }
        });
      if (!this._user_collection.hasID(UserID)) {
        flag = false;
      } else {
        console.log("ID not valid or id already taken, try again");
      }
    }
    await inquirer
      .prompt({
        type: "input",
        name: "UserName",
        message: "Introduce new user Name:",
      })
      .then((answers) => {
        if (answers["UserName"] !== "") {
          UserName = answers["UserName"];
        }
      });
    flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "UserActivity",
          message: "Introduce user activity:",
        })
        .then((answers) => {
          if (
            answers["UserActivity"] !== "" &&
            ["Bicycle", "Running"].includes(answers["UserActivity"])
          ) {
            UserActivity = answers["UserActivity"];
            flag = false;
          } else {
            console.log("Invalid activity try again");
          }
        });
    }

    const UserToAdd = new User(
      UserID,
      UserName,
      UserActivity,
      Userfriends,
      Usergroups,
      Userstatistics,
      Userfavourite_routes,
      Useractive_challenges,
      Userhistorical
    );
    this._user_collection.addUser(UserToAdd);
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt para actualizar un usuario a la base de datos. Para esto pide los datos necesarios para actualizar el usuario y lo actualiza según su ID
   */
  private async updateUserPropmt() {
    console.clear();
    let UserID = "";
    let UserName = "";
    let UserActivity: Activity = "Running";
    let Userfriends: string[] = [];
    let Usergroups: number[] = [];
    let Userstatistics: Statistics = new Statistics(0, 0, 0, 0, 0, 0);
    let Userfavourite_routes: number[] = [];
    let Useractive_challenges: number[] = [];
    let Userhistorical: [Date, number][] = [];

    let flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "UserID",
          message: "Introduce new user id:",
        })
        .then((answers) => {
          if (answers["UserID"] !== "") {
            UserID = answers["UserID"];
          }
        });
      if (this._user_collection.hasID(UserID)) {
        flag = false;
      } else {
        console.log("ID not valid, try again");
      }
    }
    await inquirer
      .prompt({
        type: "input",
        name: "UserName",
        message: "Introduce new user Name:",
      })
      .then((answers) => {
        if (answers["UserName"] !== "") {
          UserName = answers["UserName"];
        }
      });
    flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "UserActivity",
          message: "Introduce user activity:",
        })
        .then((answers) => {
          if (
            answers["UserActivity"] !== "" &&
            ["Bicycle", "Running"].includes(answers["UserActivity"])
          ) {
            UserActivity = answers["UserActivity"];
            flag = false;
          } else {
            console.log("Invalid activity try again");
          }
        });
    }
    for (let i = 0; i < this._user_collection.elements.length; i++) {
      if (UserID === this._user_collection.elements[i].id) {
        Userfriends = this._user_collection.elements[i].friends;
        Usergroups = this._user_collection.elements[i].groups;
        Userstatistics = this._user_collection.elements[i].statistics;
        Userfavourite_routes =
          this._user_collection.elements[i].favourite_routes;
        Useractive_challenges =
          this._user_collection.elements[i].active_challenges;
        Userhistorical = this._user_collection.elements[i].historical;
      }
    }

    const UserToAdd = new User(
      UserID,
      UserName,
      UserActivity,
      Userfriends,
      Usergroups,
      Userstatistics,
      Userfavourite_routes,
      Useractive_challenges,
      Userhistorical
    );
    this._user_collection.updateUser(UserToAdd);
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt con las posibles acciones a realizar sobre los usuarios de la base de datos.
   */
  async userPrompt() {
    console.clear();
    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(UserAdminCommands),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case UserAdminCommands.ShowUserAlphabetically:
            this._user_collection.sortByName();
            this.promptMenu();
            break;
          case UserAdminCommands.ShowUserReversedAlphabetically:
            this._user_collection.sortReversedByName();
            this.promptMenu();
            break;
          case UserAdminCommands.ShowUsersByWeekKilometers:
            this._user_collection.sortByWeekKilometers();
            this.promptMenu();
            break;
          case UserAdminCommands.ShowUsersByWeekKilometersReversed:
            this._user_collection.sortReversedMonthKilometers();
            this.promptMenu();
            break;
          case UserAdminCommands.ShowUsersByMonthKilometers:
            this._user_collection.sortByMonthKilometers();
            this.promptMenu();
            break;
          case UserAdminCommands.ShowUsersByMonthKilometersReversed:
            this._user_collection.sortReversedMonthKilometers();
            this.promptMenu();
            break;
          case UserAdminCommands.ShowUsersByYearKilometers:
            this._user_collection.sortByYearKilometers();
            this.promptMenu();
            break;
          case UserAdminCommands.ShowUsersByYearKilometersReversed:
            this._user_collection.sortReversedYearKilometers();
            this.promptMenu();
            break;
          case UserAdminCommands.AddNewUser:
            this.addUserPropmt();
            break;
          case UserAdminCommands.RemoveUser:
            this.removeUserPrompt();
            break;
          case UserAdminCommands.UpdateUser:
            this.updateUserPropmt();
            break;
        }
      });
  }

  /**
   * Muestra por consola el prompt para eliminar un grupo de la base de datos según el ID
   */
  private async removeGroupPrompt() {
    let flag = false;
    let foundedID = -1;
    while (!flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "removeID",
          message: "Introduce the id of the group you want to delete:",
        })
        .then((answers) => {
          if (answers["removeID"] !== "" && /^\d+$/.test(answers["removeID"])) {
            flag = this._group_collection.removeGroup(
              Number(answers["removeID"])
            );
          }
          if (!flag) {
            console.log(`ID ${answers["removeID"]} not found or invalid`);
          } else {
            foundedID = Number(answers["removeID"]);
          }
        });
    }
    for (let i = 0; i < this._group_collection.elements.length; i++) {
      this._user_collection.elements[i].removeGroup(foundedID);
    }
    this._user_collection.storeUsers();
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt para añadir un grupo a la base de datos. Para esto pide los datos necesarios para crear un nuevo grupo
   */
  private async addGroupPropmt() {
    console.clear();
    let GroupID = -1;
    let GroupName = "default";
    const GroupFavouriteRoutes: number[] = [];
    const GroupUsers: User[] = [];

    while (GroupID < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "GroupID",
          message: "Introduce new group id:",
        })
        .then((answers) => {
          if (answers["GroupID"] !== "" && /^\d+$/.test(answers["GroupID"])) {
            GroupID = Number(answers["GroupID"]);
          } else {
            console.log("ID not valid, try again");
          }
        });
    }
    await inquirer
      .prompt({
        type: "input",
        name: "GroupName",
        message: "Introduce new group Name:",
      })
      .then((answers) => {
        if (answers["GroupName"] !== "") {
          GroupName = answers["GroupName"];
        }
      });

    const GroupToAdd = new Group(
      GroupID,
      GroupName,
      GroupUsers,
      GroupFavouriteRoutes,
      []
    );
    this._group_collection.addGroup(GroupToAdd);
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt para actualizar un grupo a la base de datos. Para esto pide los datos necesarios para actualizar el grupo y lo actualiza según su ID
   */
  private async updateGroupPropmt() {
    console.clear();
    let GroupID = -1;
    let GroupName = "default";
    let GroupFavouriteRoutes: number[] = [];
    let GroupUsers: User[] = [];
    let GroupHistorical: [Date, number][] = [];
    let flag = true;
    while (flag) {
      await inquirer
        .prompt({
          type: "input",
          name: "GroupID",
          message: "Introduce new group id:",
        })
        .then((answers) => {
          if (answers["GroupID"] !== "" && /^\d+$/.test(answers["GroupID"])) {
            GroupID = parseInt(answers["GroupID"]);
          }
        });
      if (!this._group_collection.hasID(GroupID)) {
        flag = false;
      } else {
        console.log("ID not valid , try again");
      }
    }
    await inquirer
      .prompt({
        type: "input",
        name: "GroupName",
        message: "Introduce new group Name:",
      })
      .then((answers) => {
        if (answers["GroupName"] !== "") {
          GroupName = answers["GroupName"];
        }
      });

    for (let i = 0; i < this._group_collection.elements.length; i++) {
      if (GroupID === this._group_collection.elements[i].id) {
        GroupFavouriteRoutes =
          this._group_collection.elements[i].favourite_routes;
        GroupUsers = this._group_collection.elements[i].members_ranking;
        GroupHistorical = this._group_collection.elements[i].historical;
      }
    }

    const GroupToAdd = new Group(
      GroupID,
      GroupName,
      GroupUsers,
      GroupFavouriteRoutes,
      GroupHistorical
    );
    this._group_collection.updateGroup(GroupToAdd);
    this.promptMenu();
  }

  /**
   * Muestra por consola el prompt con las posibles acciones a realizar sobre los grupos de la base de datos
   */
  private async groupPrompt() {
    console.clear();
    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(GroupsAdminCommands),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case GroupsAdminCommands.ShowGroupsAlphabetically:
            this._group_collection.sortByName();
            this.promptMenu();
            break;
          case GroupsAdminCommands.ShowGroupsAlphabeticallyReversed:
            this._group_collection.sortReversedByName();
            this.promptMenu();
            break;
          case GroupsAdminCommands.ShowGroupsByWeekKilometers:
            this._group_collection.sortByTotalWeekKilometers();
            this.promptMenu();
            break;
          case GroupsAdminCommands.ShowGroupsByWeekKilometersReversed:
            this._group_collection.sortReversedTotalWeekKilometers();
            this.promptMenu();
            break;
          case GroupsAdminCommands.ShowGroupsByMonthKilometers:
            this._group_collection.sortByTotalMonthKilometers();
            this.promptMenu();
            break;
          case GroupsAdminCommands.ShowGroupsByMonthKilometersReversed:
            this._group_collection.sortReversedTotalMonthKilometers();
            this.promptMenu();
            break;
          case GroupsAdminCommands.ShowGroupsByYearKilometers:
            this._group_collection.sortByTotalYearKilometers();
            this.promptMenu();
            break;
          case GroupsAdminCommands.ShowGroupsByYearKilometersReversed:
            this._group_collection.sortReversedTotalYearKilometers();
            this.promptMenu();
            break;
          case GroupsAdminCommands.ShowGroupsByNumberOfMembers:
            this._group_collection.sortByNumberOfMembers();
            this.promptMenu();
            break;
          case GroupsAdminCommands.ShowGroupsByNumberOfMembersReversed:
            this._group_collection.sortReversedByNumberOfMembers();
            this.promptMenu();
            break;
          case GroupsAdminCommands.AddNewGroup:
            this.addGroupPropmt();
            break;
          case GroupsAdminCommands.RemoveGroup:
            this.removeGroupPrompt();
            break;
          case GroupsAdminCommands.UpdateGroup:
            this.updateGroupPropmt();
            break;
        }
      });
  }

  /**
   * Muestra por consola el menú principal para la selección de una opción por parte del usuario
   */
  public async promptMenu() {
    console.clear();
    this.printRequested();
    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(GeneralCommands),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case GeneralCommands.RoutesOptions:
            this.routePrompt();
            this._selector = 1;
            break;
          case GeneralCommands.ChallengeOptions:
            this.challengePrompt();
            this._selector = 2;
            break;
          case GeneralCommands.UserOptions:
            this.userPrompt();
            this._selector = 3;
            break;
          case GeneralCommands.GroupOptions:
            this.groupPrompt();
            this._selector = 4;
            break;
        }
      });
  }
}
