import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { login } from "../../playwright/auth";
import { writeFileSync, readFileSync, unlinkSync } from "fs";
import { submitReport } from "../../playwright/report";

test.describe("check file before submit, new file", async () => {
  let _responseCheckFile: any;
  let _responseJson: any;
  let _responseFilesJson: any;
  let start: any;
  let end: any;

  test.beforeAll(async ({ request, baseURL }) => {
    _responseJson = await login({ request, baseURL });
    writeFileSync("./playwright/attachments/file.pdf", `${faker.word.verb()}`);

    const file = readFileSync("./playwright/attachments/file.pdf");

    start = new Date();
    _responseCheckFile = await request.post(
      `${baseURL}/api/Report/processed-report-exists`,
      {
        headers: {
          Authorization: `Bearer ${_responseJson.accessToken}`,
        },
        multipart: {
          file: {
            name: "./playwright/attachments/file.pdf",
            mimeType: "application/octet-stream",
            buffer: file,
          },
          hh: false,
          pool: false,
        },
      }
    );
    end = new Date();

    _responseFilesJson = await _responseCheckFile.json();
  });

  test.afterAll(async () => {
    unlinkSync("./playwright/attachments/file.pdf");
  });

  test("response time should be less than 5000s", async () => {
    expect(end - start).toBeLessThan(5000);
  });

  test("status should equal 200", async () => {
    expect(_responseCheckFile.status()).toBe(200);
  });

  test("response body should be an object", async () => {
    expect(typeof _responseFilesJson).toBe("object");
  });

  test("check response headers", async () => {
    const headers = _responseCheckFile.headers();
    expect(Object.keys(headers)).toContain("content-type");
    expect(headers["content-type"]).toContain("application/json");
  });

  test("check response props", async () => {
    const props = Object.keys(_responseFilesJson);
    expect(props).toContain("requestId");
    expect(props).toContain("requestAlreadyExists");
    expect(props).toContain("sameUser");
    expect(props).toContain("address");
    expect(props).toContain("fileName");
    expect(props).toContain("status");
  });

  test("check is already submitted", async () => {
    expect(_responseFilesJson.requestAlreadyExists).toEqual(false);
  });
});

test.describe("check file before submit, submitted file", async () => {
  let _responseCheckFile: any;
  let _responseJson: any;
  let _responseFilesJson: any;
  let start: any;
  let end: any;

  test.beforeAll(async ({ request, baseURL }) => {
    _responseJson = await login({ request, baseURL });

    writeFileSync(
      "./playwright/attachments/report.pdf",
      `${faker.word.verb()}`
    );

    const file = readFileSync("./playwright/attachments/report.pdf");

    await submitReport(
      { request, baseURL },
      _responseJson.accessToken,
      file,
      "report"
    );

    start = new Date();
    _responseCheckFile = await request.post(
      `${baseURL}/api/Report/processed-report-exists`,
      {
        headers: {
          Authorization: `Bearer ${_responseJson.accessToken}`,
        },
        multipart: {
          file: {
            name: "./playwright/attachments/report.pdf",
            mimeType: "application/octet-stream",
            buffer: file,
          },
          hh: false,
          pool: false,
        },
      }
    );
    end = new Date();

    _responseFilesJson = await _responseCheckFile.json();
  });

  test.afterAll(async () => {
    unlinkSync("./playwright/attachments/report.pdf");
  });

  test("response time should be less than 5000s", async () => {
    expect(end - start).toBeLessThan(5000);
  });

  test("status should equal 200", async () => {
    expect(_responseCheckFile.status()).toBe(200);
  });

  test("response body should be an object", async () => {
    expect(typeof _responseFilesJson).toBe("object");
  });

  test("check response headers", async () => {
    const headers = _responseCheckFile.headers();
    expect(Object.keys(headers)).toContain("content-type");
    expect(headers["content-type"]).toContain("application/json");
  });

  test("check response props", async () => {
    const props = Object.keys(_responseFilesJson);
    expect(props).toContain("requestId");
    expect(props).toContain("requestAlreadyExists");
    expect(props).toContain("sameUser");
    expect(props).toContain("address");
    expect(props).toContain("fileName");
    expect(props).toContain("status");
  });

  test("check is already submitted", async () => {
    expect(_responseFilesJson.requestAlreadyExists).toEqual(true);
  });
});
