import { test, expect } from "@playwright/test";
import { login } from "../../playwright/auth";

test.describe("get submitted files", async () => {
  let _responseFiles: any;
  let _responseJson: any;
  let _responseFilesJson: any;
  let start: any;
  let end: any;

  test.beforeAll(async ({ request, baseURL }) => {
    _responseJson = await login({ request, baseURL });

    start = new Date();
    _responseFiles = await request.get(
      `${baseURL}/api/Report/submitted-files?pageNumber=&pageSize=`,
      {
        headers: {
          Authorization: `Bearer ${_responseJson.accessToken}`,
        },
      }
    );
    end = new Date();
    _responseFilesJson = await _responseFiles.json();
  });

  test("response time should be less than 5000s", async () => {
    expect(end - start).toBeLessThan(5000);
  });

  test("status should equal 200", async () => {
    expect(_responseFiles.status()).toBe(200);
  });

  test("response body should be an object", async () => {
    expect(typeof _responseFilesJson).toBe("object");
  });

  test("check response headers", async () => {
    const headers = _responseFiles.headers();
    expect(Object.keys(headers)).toContain("content-type");
    expect(headers["content-type"]).toContain("application/json");
  });

  test("check the response props", async () => {
    _responseFilesJson.data.forEach((file) => {
      const props = Object.keys(file);
      expect(props).toContain("requestId");
      expect(props).toContain("address");
      expect(props).toContain("status");
      expect(props).toContain("fileName");
      expect(props).toContain("city");
      expect(props).toContain("state");
      expect(props).toContain("zip");
      expect(props).toContain("createdDate");
      expect(props).toContain("bidRequestDate");
      expect(props).toContain("requestedReportRequestingProposalUserType");
    });
  });
});
