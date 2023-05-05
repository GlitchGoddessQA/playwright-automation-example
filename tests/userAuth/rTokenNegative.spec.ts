import { test, expect, APIResponse } from "@playwright/test";
import { defaultEmail } from "../../playwright/auth";

test.describe("refresh token with invalid data", () => {
  const dataRefresh = [
    ["", ""],
    // ["test", "test"],
  ];

  dataRefresh.forEach((el, i) => {
    let _response: APIResponse;
    let _responseRefresh: APIResponse;
    let _responseJson: any;
    let _responseRefreshJson: any;
    let headers: object;
    let start: any;
    let end: any;

    test.beforeAll(async ({ request, baseURL }) => {
      start = new Date();
      _response = await request.post(`${baseURL}/api/auth/login`, {
        data: {
          email: defaultEmail,
          password: "Test1est!",
        },
      });
      end = new Date();

      _responseJson = await _response.json();

      _responseRefresh = await request.post(`${baseURL}/api/auth/rtoken`, {
        data: {
          accessToken: el[0],
          refreshToken: el[1],
        },
      });

      _responseRefreshJson = await _responseRefresh.json();
      headers = _responseRefresh.headers();
    });

    test(`response time should be less than 5000s [${i}]`, async () => {
      expect(end - start).toBeLessThan(5000);
    });

    test(`status should equal 400 [${i}]`, async () => {
      expect(_responseRefresh.status()).toBe(400);
    });

    if (el[0] === "" && el[1] === "") {
      test(`check content-type [${i}]`, async () => {
        expect(Object.keys(headers)).toContain("content-type");
        expect(headers["content-type"]).toContain("application/problem+json");
      });

      test("check validation message", async () => {
        expect(_responseRefreshJson.errors.AccessToken).toEqual([
          "AccessToken is required",
        ]);
        expect(_responseRefreshJson.errors.RefreshToken).toEqual([
          "RefreshToken is required",
        ]);
      });
    } else {
      test(`check content-type [${i}]`, async () => {
        expect(Object.keys(headers)).toContain("content-type");
        expect(headers["content-type"]).toContain("text/plain");
      });

      test(`check response message [${i}]`, async () => {
        _response.text().then((el) => {
          expect(el).toContain("Incorrect login or password");
        });
      });
    }
  });
});
