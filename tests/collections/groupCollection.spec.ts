import "mocha";
import { expect } from "chai";
import { GroupCollection } from "../../src/collections/groupCollection";
import { groupExample } from "../../src/examples/groupExample";
import { Group } from "../../src/classes/group";

describe("GroupCollection class test", () => {
  it("GroupCollection constructor ", () => {
    expect(new GroupCollection(groupExample)).to.be.instanceOf(GroupCollection);
  });

  it("sortByName", () => {
    const collection = new GroupCollection(groupExample);
    collection.sortByName();
    expect((collection.get(0) as Group).id).to.be.equal(4);
    expect((collection.get(4) as Group).id).to.be.equal(5);
    collection.sortReversedByName();
    expect((collection.get(0) as Group).id).to.be.equal(5);
    expect((collection.get(4) as Group).id).to.be.equal(4);
  });

  it("sortByTotalWeekKilometers", () => {
    const collection = new GroupCollection(groupExample);
    collection.sortByTotalWeekKilometers();
    expect((collection.get(0) as Group).id).to.be.equal(1);
    expect((collection.get(4) as Group).id).to.be.equal(2);
    collection.sortReversedTotalWeekKilometers();
    expect((collection.get(0) as Group).id).to.be.equal(2);
    expect((collection.get(4) as Group).id).to.be.equal(1);
  });

  it("sortByTotalMonthKilometers", () => {
    const collection = new GroupCollection(groupExample);
    collection.sortByTotalMonthKilometers();
    expect((collection.get(0) as Group).id).to.be.equal(1);
    expect((collection.get(4) as Group).id).to.be.equal(4);
    collection.sortReversedTotalMonthKilometers();
    expect((collection.get(0) as Group).id).to.be.equal(4);
    expect((collection.get(4) as Group).id).to.be.equal(1);
  });

  it("sortByTotalYearKilometers", () => {
    const collection = new GroupCollection(groupExample);
    collection.sortByTotalYearKilometers();
    expect((collection.get(0) as Group).id).to.be.equal(1);
    expect((collection.get(4) as Group).id).to.be.equal(4);
    collection.sortReversedTotalYearKilometers();
    expect((collection.get(0) as Group).id).to.be.equal(4);
    expect((collection.get(4) as Group).id).to.be.equal(1);
  });

  it("sortByNumberOfMembers", () => {
    const collection = new GroupCollection(groupExample);
    collection.sortByNumberOfMembers();
    expect((collection.get(0) as Group).id).to.be.equal(1);
    expect((collection.get(4) as Group).id).to.be.equal(5);
    collection.sortReversedByNumberOfMembers();
    expect((collection.get(0) as Group).id).to.be.equal(5);
    expect((collection.get(4) as Group).id).to.be.equal(1);
  });
});
