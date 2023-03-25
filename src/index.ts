import inquirer from "inquirer";

import { RouteCollection } from "./collections/routeCollection";
import { routeExample1 } from "./examples/routeExample";
import { challengeExample } from "./examples/challengeExample";
import { ChallengeCollection } from "./collections/challengeCollection";

const route_collection = new RouteCollection(routeExample1);
const user_collection = new ChallengeCollection(challengeExample);

enum Commands {
  RoutesOptions = "Show options for Routes",

  Quit = "Quit",
}
enum RouteComandOptions {
  ShowRoutesAlphabetically = "Show Routes alphabetically",
  ShowRoutesReversedAlphabetically = "Show Routes alphabetically reversed",
  ShowRoutesByVisitors = "Show Routes order by number of visitors",
  ShowRoutesByVisitorsReversed = "Show Routes order by number of visitors reversed",
  ShowRoutesByLength = "Show Routes order by number of Length",
  ShowRoutesByLengthReversed = "Show Routes order by number of Length reversed",
}

function printRequested(selection: number): void {
  switch (selection) {
    case 1:
      console.log(route_collection.toString());
      break;
    default:
      break;
  }
}

let selector = -1;
async function RoutePrompt() {
  console.clear();
  await inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(RouteComandOptions),
    })
    .then((answers) => {
      switch (answers["command"]) {
        case RouteComandOptions.ShowRoutesAlphabetically:
          selector = 1;
          route_collection.sortAlphabetically();
          promptUser();
          break;
        case RouteComandOptions.ShowRoutesReversedAlphabetically:
          route_collection.sortReversedAlphabetically();
          selector = 1;
          promptUser();
          break;
        case RouteComandOptions.ShowRoutesByVisitors:
          route_collection.sortByNumberUsers();
          selector = 1;
          promptUser();
          break;
        case RouteComandOptions.ShowRoutesByVisitorsReversed:
          route_collection.sortReversedByNumberUsers();
          selector = 1;
          promptUser();
          break;

        case RouteComandOptions.ShowRoutesByLength:
          route_collection.sortByNumberUsers();
          selector = 1;
          promptUser();
          break;
        case RouteComandOptions.ShowRoutesByLengthReversed:
          route_collection.sortReversedByNumberUsers();
          selector = 1;
          promptUser();
          break;
      }
    });
}

async function promptUser() {
  console.clear();
  printRequested(selector);

  await inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands),
    })
    .then((answers) => {
      switch (answers["command"]) {
        case Commands.RoutesOptions:
          RoutePrompt();
      }
    });
}

promptUser();
