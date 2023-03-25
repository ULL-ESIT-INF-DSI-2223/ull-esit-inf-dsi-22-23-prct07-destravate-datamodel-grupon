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
  constructor(elements: Challenge[]) {
    super(elements);
    this.database = lowdb(new FileSync("./src/databases/challenge.json"));
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

  public addChallenge(challenge: Challenge): boolean {
    const result = super.add(challenge);
    this.storeChallenges();
    return result;
  }
  public removeChallenge(id: number): boolean {
    const result = super.remove(id);
    this.storeChallenges();
    return result;
  }
  public updateChallenge(challenge: Challenge): boolean {
    const result = super.update(challenge);
    this.storeChallenges();
    return result;
  }
  public storeChallenges() {
    this.database.set("challenge", [...this._elements.values()]).write();
  }
}
