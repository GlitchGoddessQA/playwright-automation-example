import { test, expect, APIResponse } from "@playwright/test";
import { login } from "../../playwright/auth";

test.describe("refresh token with valid data", async () => {
  let _responseRefresh: any;
  let _responseJson: any;
  let _responseRefreshJson: any;
  let start: any;
  let end: any;

  test.beforeAll(async ({ request, baseURL }) => {
    _responseJson = await login({ request, baseURL });

    start = new Date();
    _responseRefresh = await request.post(`${baseURL}/api/auth/rtoken`, {
      data: {
        accessToken: `${_responseJson.accessToken}`,
        refreshToken: `${_responseJson.refreshToken}`,
      },
    });
    end = new Date();

    _responseRefreshJson = await _responseRefresh.json();
  });

  test("response time should be less than 5000s", async () => {
    expect(end - start).toBeLessThan(5000);
  });

  test("status should equal 200", async () => {
    expect(_responseRefresh.status()).toBe(200);
  });

  test("response body should be an object", async () => {
    expect(typeof _responseRefreshJson).toBe("object");
  });

  test("check response headers", async () => {
    const headers = _responseRefresh.headers();
    expect(Object.keys(headers)).toContain("content-type");
    expect(headers["content-type"]).toContain("application/json");
  });

  test("check the response props", async () => {
    const props = Object.keys(_responseRefreshJson);
    expect(props).toContain("accessToken");
    expect(props).toContain("accessTokenExpiration");
    expect(props).toContain("refreshToken");
    expect(props).toContain("emailConfirmed");
    expect(props).toContain("userId");
    expect(props).toContain("partnerCode");
    expect(props).toContain("partnerType");
    expect(props).toContain("partnerCode");
    expect(props).toContain("registrationStates");
  });

  test("access token is updated", async () => {
    expect(_responseJson.accessToken).not.toEqual(
      _responseRefreshJson.accessToken
    );
  });

  test("refresh token is updated", async () => {
    expect(_responseJson.refreshToken).not.toEqual(
      _responseRefreshJson.refreshToken
    );
  });
});
