import inquirer from "inquirer";
import { RouteCollection } from "./collections/routeCollection";
import { routeExample1 } from "./examples/routeExample";

const route_collection = new RouteCollection(routeExample1);

enum Commands {
  ShowRoutes = "Show Routes",
  Quit = "Quit",
}
enum RoutesChoices {
  sortAlphabetically = "Alphabetically",
  sortReversedAlphabetically = "Alphabetically reversed order",
  Menu = "Menu",
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

function showRoutesPrompt(): void {
  console.clear();

  inquirer
    .prompt({
      type: "list",
      name: "showRoutesPrompt",
      message: "Choose option:",
      choices: Object.values(RoutesChoices),
    })
    .then((answers) => {
      switch (answers["command"]) {
        case RoutesChoices.sortAlphabetically:
          route_collection.sortAlphabetically();
          promptUser();
          break;
        case RoutesChoices.sortReversedAlphabetically:
          route_collection.sortReversedAlphabetically();
          promptUser();
          break;
        case RoutesChoices.Menu:
          promptUser();
      }
    });
}

function promptUser(): void {
  console.clear();
  printRequested(selector);
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands),
    })
    .then((answers) => {
      switch (answers["command"]) {
        case Commands.ShowRoutes:
          selector = 1;
          showRoutesPrompt();
          break;
      }
    });
}

promptUser();
