import "mocha";
import { expect } from "chai";
import { UserCollection } from "../../src/collections/userCollection";
import { userExample } from "../../src/examples/userExample";
import { User } from "../../src/classes/user";

describe("UserCollection class test", () => {
  it("UserCollection constructor ", () => {
    expect(new UserCollection(userExample)).to.be.instanceOf(UserCollection);
  });

  it("sortByName", () => {
    const collection = new UserCollection(userExample);
    collection.sortByName();
    expect((collection.get(0) as User).id).to.be.equal("alehandro");
    expect((collection.get(19) as User).id).to.be.equal("tomasote");
    collection.sortReversedByName();
    expect((collection.get(0) as User).id).to.be.equal("tomasote");
    expect((collection.get(19) as User).id).to.be.equal("alehandro");
  });

  it("sortByWeekKilometers", () => {
    const collection = new UserCollection(userExample);
    collection.sortByWeekKilometers();
    expect((collection.get(0) as User).id).to.be.equal("pepapi");
    expect((collection.get(19) as User).id).to.be.equal("cupcake");
    collection.sortReversedWeekKilometers();
    expect((collection.get(0) as User).id).to.be.equal("cupcake");
    expect((collection.get(19) as User).id).to.be.equal("pepapi");
  });

  it("sortByMonthKilometers", () => {
    const collection = new UserCollection(userExample);
    collection.sortByMonthKilometers();
    expect((collection.get(0) as User).id).to.be.equal("pepapi");
    expect((collection.get(19) as User).id).to.be.equal("lucaspelucas");
    collection.sortReversedMonthKilometers();
    expect((collection.get(0) as User).id).to.be.equal("lucaspelucas");
    expect((collection.get(19) as User).id).to.be.equal("pepapi");
  });

  it("sortByYearKilometers", () => {
    const collection = new UserCollection(userExample);
    collection.sortByYearKilometers();
    expect((collection.get(0) as User).id).to.be.equal("miau");
    expect((collection.get(19) as User).id).to.be.equal("elpepe");
    collection.sortReversedYearKilometers();
    expect((collection.get(0) as User).id).to.be.equal("elpepe");
    expect((collection.get(19) as User).id).to.be.equal("miau");
  });
});
