require("dotenv").config;
const given = require("../../steps/given");
const when = require("../../steps/when");
const then = require("../../steps/then");
const chance = require("chance").Chance();

describe("Given an authenticated user", () => {
  let user;
  beforeAll(async () => {
    user = await given.an_authenticated_user();
  });

  describe("When they send a tweet", () => {
    let tweet;
    const text = chance.string({ length: 16 });
    beforeAll(async () => {
      tweet = await when.a_user_calls_tweet(user, text);
    });

    it("Should return the new tweet", () => {
      expect(tweet).toMatchObject({
        text,
        replies: 0,
        likes: 0,
        retweets: 0,
      });
    });

    it("They will see the new tweet when they calls getTweets", async () => {
      const { tweets, nextToken } = await when.a_user_calls_getTweets(
        user,
        user.username,
        25
      );

      expect(nextToken).toBeNull();
      expect(tweets.length).toEqual(1);
      expect(tweets[0]).toEqual(tweet);
    });

    it("They cannot ask for more than 25 tweets in a page", async () => {
      await expect(
        when.a_user_calls_getTweets(user, user.username, 26)
      ).rejects.toMatchObject({
        message: expect.stringContaining("max limit is 25"),
      });
    });
  });
});
