import { test, expect } from "@playwright/test";
import { login } from "../../playwright/auth";

test.describe("get profile data", async () => {
  let _responseProfile: any;
  let _responseJson: any;
  let _responseProfileJson: any;
  let start: any;
  let end: any;

  test.beforeAll(async ({ request, baseURL }) => {
    _responseJson = await login({ request, baseURL });

    start = new Date();
    _responseProfile = await request.get(`${baseURL}/api/account/profile`, {
      headers: {
        Authorization: `Bearer ${_responseJson.accessToken}`,
      },
    });
    end = new Date();

    _responseProfileJson = await _responseProfile.json();
  });

  test("response time should be less than 5000s", async () => {
    expect(end - start).toBeLessThan(5000);
  });

  test("status should equal 200", async () => {
    expect(_responseProfile.status()).toBe(200);
  });

  test("response body should be an object", async () => {
    expect(typeof _responseProfileJson).toBe("object");
  });

  test("check response headers", async () => {
    const headers = _responseProfile.headers();
    expect(Object.keys(headers)).toContain("content-type");
    expect(headers["content-type"]).toContain("application/json");
  });

  test("check the response props", async () => {
    const props = Object.keys(_responseProfileJson);
    expect(props).toContain("id");
    expect(props).toContain("firstName");
    expect(props).toContain("lastName");
    expect(props).toContain("email");
    expect(props).toContain("phoneNumber");
    expect(props).toContain("address1");
    expect(props).toContain("userRoles");
    expect(props).toContain("brokerage");
    expect(props).toContain("hasBiometricAuthentication");
  });
});
