import inquirer from "inquirer";

import { UserNormalUserComands } from "./enums/UserMenuCommands";
import { UserLogginRegisterMenu } from "./enums/UserLogginRegisterMenu";
import { UserFriendsAndUsersCommands } from "./enums/UserFriendsAndUsersCommands";
import { UserGoupCommands } from "./enums/UserGoupCommands";
import { UserRouteCommands } from "./enums/UserRouteCommands";
import { UserChallengeCommands } from "./enums/UserChallengeCommands";

import { Activity } from "./types/activity";
import { JsonRouteCollection } from "./databases/JsonRouteCollection";
import { routeExample } from "./examples/routeExample";
import { JsonChallengeCollection } from "./databases/JsonChallengeCollection";
import { challengeExample } from "./examples/challengeExample";
import { JsonGroupCollection } from "./databases/JsonGroupCollection";
import { groupExample } from "./examples/groupExample";
import { Group } from "./classes/group";
import { JsonUserCollection } from "./databases/JsonUserCollection";
import { userExample } from "./examples/userExample";
import { User } from "./classes/user";
import { Statistics } from "./classes/statistics";

export class UserGestor {
  private _route_collection = new JsonRouteCollection(routeExample);
  private _challenge_collection = new JsonChallengeCollection(challengeExample);
  private _group_collection = new JsonGroupCollection(groupExample);
  private _user_collection = new JsonUserCollection(userExample);
  private _selector = -1;
  private _logged = false;
  private _logged_id = "";

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

  private async promptMenu() {
    console.clear();

    this.printRequested();

    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(UserNormalUserComands),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case UserNormalUserComands.RoutesOptions:
            this.RoutePrompt();
            this._selector = 1;
            break;
          case UserNormalUserComands.ChallengeOptions:
            this._selector = 2;
            break;
          case UserNormalUserComands.UserOptions:
            this.UserPrompt();
            this._selector = 3;
            break;
          case UserNormalUserComands.GroupOptions:
            this.GroupPrompt();
            this._selector = 4;
            break;
        }
      });
  }

  private async UserPrompt() {
    console.clear();
    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(UserFriendsAndUsersCommands),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case UserFriendsAndUsersCommands.ShowUserAlphabetically:
            this._user_collection.sortByName();
            this.promptMenu();
            break;
          case UserFriendsAndUsersCommands.ShowUserReversedAlphabetically:
            this._user_collection.sortReversedByName();
            this.promptMenu();
            break;
          case UserFriendsAndUsersCommands.ShowUsersByWeekKilometers:
            this._user_collection.sortByWeekKilometers();
            this.promptMenu();
            break;
          case UserFriendsAndUsersCommands.ShowUsersByWeekKilometersReversed:
            this._user_collection.sortReversedMonthKilometers();
            this.promptMenu();
            break;
          case UserFriendsAndUsersCommands.ShowUsersByMonthKilometers:
            this._user_collection.sortByMonthKilometers();
            this.promptMenu();
            break;
          case UserFriendsAndUsersCommands.ShowUsersByMonthKilometersReversed:
            this._user_collection.sortReversedMonthKilometers();
            this.promptMenu();
            break;
          case UserFriendsAndUsersCommands.ShowUsersByYearKilometers:
            this._user_collection.sortByYearKilometers();
            this.promptMenu();
            break;
          case UserFriendsAndUsersCommands.ShowUsersByYearKilometersReversed:
            this._user_collection.sortReversedYearKilometers();
            this.promptMenu();
            break;
          case UserFriendsAndUsersCommands.AddFriend:
            this.addFriendPrompt();
            break;
          case UserFriendsAndUsersCommands.RemoveFriend:
            this.remmoveFriend();
            break;
        }
      });
  }
  private async addFriendPrompt() {
    const sleep = (ms: number | undefined) =>
      new Promise((r) => setTimeout(r, ms));
    console.clear();
    let found = false;
    let found_id = "";
    while (!found) {
      await inquirer
        .prompt({
          type: "input",
          name: "addFriend",
          message: "Introduce id of friend:",
        })
        .then((answers) => {
          if (
            this._user_collection.hasID(answers["addFriend"]) &&
            answers["addFriend"] !== this._logged_id
          ) {
            found = true;
            found_id = answers["addFriend"];
          } else {
            console.log("User not found or you cant add this user");
          }
        });
    }
    console.log("User added successfully");

    for (let i = 0; i < this._user_collection.elements.length; i++) {
      if (this._user_collection.elements[i].id === this._logged_id) {
        this._user_collection.elements[i].addFriend(found_id);
      }
      if (this._user_collection.elements[i].id === found_id) {
        this._user_collection.elements[i].addFriend(this._logged_id);
      }
    }
    await sleep(1000);
    this._user_collection.storeUsers();
    this.promptMenu();
  }
  private async remmoveFriend() {
    const sleep = (ms: number | undefined) =>
      new Promise((r) => setTimeout(r, ms));
    console.clear();
    let found = false;
    let found_id = "";
    let numberFriends = 0;
    for (let i = 0; i < this._user_collection.elements.length; i++) {
      if (this._user_collection.elements[i].id === this._logged_id) {
        numberFriends = this._user_collection.elements[i].friends.length;
      }
    }
    if (numberFriends > 0) {
      while (!found) {
        await inquirer
          .prompt({
            type: "input",
            name: "addFriend",
            message: "Introduce id of friend:",
          })
          .then((answers) => {
            if (
              this._user_collection.hasID(answers["addFriend"]) &&
              answers["addFriend"] !== this._logged_id
            ) {
              found = true;
              found_id = answers["addFriend"];
            } else {
              console.log("User not found on your friend list");
            }
          });
      }
      console.log("User removed successfully");

      for (let i = 0; i < this._user_collection.elements.length; i++) {
        if (this._user_collection.elements[i].id === this._logged_id) {
          this._user_collection.elements[i].removeFriend(found_id);
        }
        if (this._user_collection.elements[i].id === found_id) {
          this._user_collection.elements[i].removeFriend(this._logged_id);
        }
      }
      await sleep(1000);
      this._user_collection.storeUsers();
    } else {
      console.log("You dont have friends");
      await sleep(1000);
    }

    this.promptMenu();
  }

  private async JoinGrouppPrompt() {
    console.clear();
    const sleep = (ms: number | undefined) =>
      new Promise((r) => setTimeout(r, ms));
    let found = false;
    let found_id = -1;
    while (!found) {
      await inquirer
        .prompt({
          type: "input",
          name: "joinGroup",
          message: "Introduce id of group:",
        })
        .then((answers) => {
          if (this._group_collection.hasID(parseInt(answers["joinGroup"]))) {
            found = true;
            found_id = parseInt(answers["joinGroup"]);
          } else {
            console.log("Group not found or you cant join this group");
          }
        });

      if (
        found &&
        this._group_collection
          .getByID(found_id)
          ?.members_id.includes(this._logged_id)
      ) {
        found = false;
        console.log("You are already in this group");
      }
    }
    console.log("Group joined successfully");

    for (let i = 0; i < this._group_collection.elements.length; i++) {
      if (this._group_collection.elements[i].id === found_id) {
        this._group_collection.elements[i].addMember(
          this._user_collection.getByID(this._logged_id) as User
        );
        if (this._user_collection.getByID(this._logged_id) === undefined) {
          console.log("WARNING");
          sleep(1000);
        }
      }
    }
    this._user_collection.getByID(this._logged_id)?.addGroup(found_id);

    this._user_collection.storeUsers();
    this._group_collection.storeGroups();
    this.promptMenu();
  }
  private async LeaveGrouppPrompt() {
    console.clear();
    let found = false;
    let found_id = -1;
    while (!found) {
      await inquirer
        .prompt({
          type: "input",
          name: "leaveGroup",
          message: "Introduce id of group:",
        })
        .then((answers) => {
          if (this._group_collection.hasID(parseInt(answers["leaveGroup"]))) {
            found = true;
            found_id = parseInt(answers["leaveGroup"]);
          } else {
            console.log("Group not found");
          }
        });

      if (found) {
        for (
          let i = 0;
          i < this._group_collection.elements.length && found;
          i++
        ) {
          if (
            this._group_collection.elements[i].id === found_id &&
            !this._group_collection.elements[i].members_id.includes(
              this._logged_id
            )
          ) {
            found = false;
            console.log("You are not on this group");
          }
        }
      }
    }
    console.log("Group left successfully");

    for (let i = 0; i < this._group_collection.elements.length; i++) {
      if (this._group_collection.elements[i].id === found_id) {
        this._group_collection.elements[i].removeMember(this._logged_id);
      }
    }
    for (let i = 0; i < this._user_collection.elements.length; i++) {
      if (this._user_collection.elements[i].id === this._logged_id) {
        this._user_collection.elements[i].removeGroup(found_id);
      }
    }

    this._user_collection.storeUsers();
    this._group_collection.storeGroups();
    this.promptMenu();
  }

  private async CreateGroupPrompt() {
    console.clear();
    let GroupID = -1;
    let GroupName = "default";
    const GroupFavouriteRoutes: number[] = [];

    while (GroupID < 0) {
      await inquirer
        .prompt({
          type: "input",
          name: "GroupID",
          message: "Introduce new group id:",
        })
        .then((answers) => {
          if (
            /^\d+$/.test(answers["GroupID"]) &&
            !this._group_collection.hasID(Number(answers["GroupID"]))
          ) {
            GroupID = Number(answers["GroupID"]);
          } else {
            console.log("ID not valid or taken, try again");
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
    let auxUser: User = new User(
      "",
      "",
      "Running",
      [],
      [],
      new Statistics(0, 0, 0, 0, 0, 0),
      [],
      [],
      []
    );
    for (let i = 0; i < this._user_collection.elements.length; i++) {
      if (this._user_collection.elements[i].id === this._logged_id) {
        auxUser = this._user_collection.elements[i];
      }
    }

    const GroupToAdd = new Group(
      GroupID,
      GroupName,
      [auxUser],
      GroupFavouriteRoutes,
      []
    );
    GroupToAdd.addAdmin(this._logged_id);
    this._group_collection.addGroup(GroupToAdd);
    this._user_collection.getByID(this._logged_id)?.addGroup(GroupID);
    this._user_collection.storeUsers();
    this._group_collection.storeGroups();
    this.promptMenu();
  }
  private async DeleteGroupPrompt() {
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
          if (
            /^\d+$/.test(answers["removeID"]) &&
            this._user_collection
              .getByID(this._logged_id)
              ?.groups.includes(Number(answers["removeID"])) &&
            this._group_collection
              .getByID(Number(answers["removeID"]))
              ?.admins.includes(this._logged_id)
          ) {
            flag = this._group_collection.removeGroup(
              Number(answers["removeID"])
            );
            foundedID = Number(answers["removeID"]);
          } else {
            console.log("You dont have autority to do that");
          }
        });
    }
    for (let i = 0; i < this._user_collection.elements.length; i++) {
      this._user_collection.elements[i].removeGroup(foundedID);
    }
    this._user_collection.storeUsers();
    this._group_collection.storeGroups();
    this.promptMenu();
  }

  private async GroupPrompt() {
    console.clear();
    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(UserGoupCommands),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case UserGoupCommands.ShowGroupsAlphabetically:
            this._group_collection.sortByName();
            this.promptMenu();
            break;
          case UserGoupCommands.ShowGroupsAlphabeticallyReversed:
            this._group_collection.sortReversedByName();
            this.promptMenu();
            break;
          case UserGoupCommands.ShowGroupsByWeekKilometers:
            this._group_collection.sortByTotalWeekKilometers();
            this.promptMenu();
            break;
          case UserGoupCommands.ShowGroupsByWeekKilometersReversed:
            this._group_collection.sortReversedTotalWeekKilometers();
            this.promptMenu();
            break;
          case UserGoupCommands.ShowGroupsByMonthKilometers:
            this._group_collection.sortByTotalMonthKilometers();
            this.promptMenu();
            break;
          case UserGoupCommands.ShowGroupsByMonthKilometersReversed:
            this._group_collection.sortReversedTotalMonthKilometers();
            this.promptMenu();
            break;
          case UserGoupCommands.ShowGroupsByYearKilometers:
            this._group_collection.sortByTotalYearKilometers();
            this.promptMenu();
            break;
          case UserGoupCommands.ShowGroupsByYearKilometersReversed:
            this._group_collection.sortReversedTotalYearKilometers();
            this.promptMenu();
            break;
          case UserGoupCommands.ShowGroupsByNumberOfMembers:
            this._group_collection.sortByNumberOfMembers();
            this.promptMenu();
            break;
          case UserGoupCommands.ShowGroupsByNumberOfMembersReversed:
            this._group_collection.sortReversedByNumberOfMembers();
            this.promptMenu();
            break;
          case UserGoupCommands.JoinGroup:
            this.JoinGrouppPrompt();
            break;
          case UserGoupCommands.LeaveGroup:
            this.LeaveGrouppPrompt();
            break;
          case UserGoupCommands.CreateGoup:
            this.CreateGroupPrompt();
            break;
          case UserGoupCommands.DeleteGroup:
            this.DeleteGroupPrompt();
            break;
        }
      });
  }
  private async RoutePrompt() {
    console.clear();
    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(UserRouteCommands),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case UserRouteCommands.ShowRoutesAlphabetically:
            this._route_collection.sortAlphabetically();
            this.promptMenu();
            break;
          case UserRouteCommands.ShowRoutesReversedAlphabetically:
            this._route_collection.sortReversedAlphabetically();
            this.promptMenu();
            break;
          case UserRouteCommands.ShowRoutesByVisitors:
            this._route_collection.sortByNumberUsers();
            this.promptMenu();
            break;
          case UserRouteCommands.ShowRoutesByVisitorsReversed:
            this._route_collection.sortReversedByNumberUsers();
            this.promptMenu();
            break;

          case UserRouteCommands.ShowRoutesByLength:
            this._route_collection.sortByLenght();
            this.promptMenu();
            break;
          case UserRouteCommands.ShowRoutesByLengthReversed:
            this._route_collection.sortReversedByLenght();
            this.promptMenu();
            break;
        }
      });
  }
  private async ChallengePrompt() {
    console.clear();
    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(UserChallengeCommands),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case UserChallengeCommands.ShowChallengeAlphabetically:
            this._challenge_collection.sortByName();
            this.promptMenu();
            break;
          case UserChallengeCommands.ShowChallengeReversedAlphabetically:
            this._challenge_collection.sortReversedByName();
            this.promptMenu();
            break;
          case UserChallengeCommands.ShowChallengeByKilometers:
            this._challenge_collection.sortByKilometers();
            this.promptMenu();
            break;
          case UserChallengeCommands.ShowChallengeByKilometersReversed:
            this._challenge_collection.sortReversedByKilometers();
            this.promptMenu();
            break;
          case UserChallengeCommands.ShowChallengeByTotalUsers:
            this._challenge_collection.sortByTotalUsers();
            this.promptMenu();
            break;
          case UserChallengeCommands.ShowChallengeByTotalUsersReversed:
            this._challenge_collection.sortReversedByTotalUsers();
            this.promptMenu();
            break;
        }
      });
  }

  private async promptRegister() {
    console.clear();
    let UserID = "";
    let UserName = "";
    let UaerActivity: Activity = "Running";
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
          name: "UaerActivity",
          message: "Introduce user activity:",
        })
        .then((answers) => {
          if (
            answers["UaerActivity"] !== "" &&
            ["Bicycle", "Running"].includes(answers["UaerActivity"])
          ) {
            UaerActivity = answers["UaerActivity"];
            flag = false;
          } else {
            console.log("Invalid activity try again");
          }
        });
    }

    const UserToAdd = new User(
      UserID,
      UserName,
      UaerActivity,
      Userfriends,
      Usergroups,
      Userstatistics,
      Userfavourite_routes,
      Useractive_challenges,
      Userhistorical
    );
    this._user_collection.addUser(UserToAdd);
    this._logged_id = UserID;
    this._logged = true;
    this.promptMenu();
  }
  private async promptLoggin() {
    console.clear();
    while (!this._logged) {
      await inquirer
        .prompt({
          type: "input",
          name: "loogin",
          message: "Introduce tu id:",
        })
        .then((answers) => {
          if (this._user_collection.hasID(answers["loogin"])) {
            this._logged = true;
            this._logged_id = answers["loogin"];
          } else {
            console.log("User not found");
          }
        });
    }
    this.promptMenu();
  }
  public async promptInitialMenu() {
    console.clear();

    this.printRequested();

    await inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(UserLogginRegisterMenu),
      })
      .then((answers) => {
        switch (answers["command"]) {
          case UserLogginRegisterMenu.Register:
            this.promptRegister();
            break;
          case UserLogginRegisterMenu.Loggin:
            this.promptLoggin();
            break;
        }
      });
  }
}
