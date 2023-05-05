import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { login, getProfileData } from "../../playwright/auth";

test.describe("refresh token with valid data", async () => {
  let _responseProfile: any;
  let _responsePutProfile: any;
  let _responseJson: any;
  let start: any;
  let end: any;

  test.beforeAll(async ({ request, baseURL }) => {
    _responseJson = await login({ request, baseURL });
    _responseProfile = await getProfileData(
      { request, baseURL },
      _responseJson.accessToken
    );

    start = new Date();
    _responsePutProfile = await request.put(`${baseURL}/api/account`, {
      headers: {
        Authorization: `Bearer ${_responseJson.accessToken}`,
      },
      data: {
        firstName: `${faker.name.firstName()}`,
        lastName: `${faker.name.lastName()}`,
        phoneNumber: `${faker.phone.number("(222) ###-####")}`,
      },
    });
    end = new Date();
  });

  test("response time should be less than 5000s", async () => {
    expect(end - start).toBeLessThan(5000);
  });

  test("status should equal 204", async () => {
    expect(_responsePutProfile.status()).toBe(204);
  });

  test("check response headers", async () => {
    const headers = _responsePutProfile.headers();
    expect(Object.keys(headers)).not.toContain("content-type");
  });

  test("first name is updated", async ({ request, baseURL }) => {
    let _newProfileData = await getProfileData(
      { request, baseURL },
      _responseJson.accessToken
    );
    expect(_responseProfile.firstName).not.toEqual(_newProfileData.firstName);
  });

  test("last name is updated", async ({ request, baseURL }) => {
    let _newProfileData = await getProfileData(
      { request, baseURL },
      _responseJson.accessToken
    );
    expect(_responseProfile.lastName).not.toEqual(_newProfileData.lastName);
  });
});
