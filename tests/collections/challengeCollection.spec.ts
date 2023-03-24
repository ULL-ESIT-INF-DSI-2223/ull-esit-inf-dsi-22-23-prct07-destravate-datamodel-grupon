import "mocha";
import { expect } from "chai";
import { ChallengeCollection } from "../../src/collections/challengeCollection";
import { challengeExample } from "../../src/examples/challengeExample";
import { Challenge } from "../../src/classes/challenge";

describe("ChallengeCollection class test", () => {
  it("ChallengeCollection constructor ", () => {
    expect(new ChallengeCollection(challengeExample)).to.be.instanceOf(
      ChallengeCollection
    );
  });

  it("sortByName", () => {
    const collection = new ChallengeCollection(challengeExample);
    collection.sortByName();
    expect((collection.get(0) as Challenge).id).to.be.equal(1);
    expect((collection.get(2) as Challenge).id).to.be.equal(2);
    collection.sortReversedByName();
    expect((collection.get(0) as Challenge).id).to.be.equal(2);
    expect((collection.get(2) as Challenge).id).to.be.equal(1);
  });

  it("sortByKilometers", () => {
    const collection = new ChallengeCollection(challengeExample);
    collection.sortByKilometers();
    expect((collection.get(0) as Challenge).id).to.be.equal(2);
    expect((collection.get(2) as Challenge).id).to.be.equal(3);
    collection.sortReversedByKilometers();
    expect((collection.get(0) as Challenge).id).to.be.equal(3);
    expect((collection.get(2) as Challenge).id).to.be.equal(2);
  });

  it("sortByTotalUsers", () => {
    const collection = new ChallengeCollection(challengeExample);
    collection.sortByTotalUsers();
    expect((collection.get(0) as Challenge).id).to.be.equal(2);
    expect((collection.get(2) as Challenge).id).to.be.equal(3);
    collection.sortReversedByTotalUsers();
    expect((collection.get(0) as Challenge).id).to.be.equal(3);
    expect((collection.get(2) as Challenge).id).to.be.equal(2);
  });
});
