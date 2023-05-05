import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { defaultEmail, login } from "../../playwright/auth";
import { submitReport, submittedReports } from "../../playwright/report";
import { writeFileSync, readFileSync, unlinkSync } from "fs";
import { delay } from "../../playwright/delay";

test.describe("recommend partner", async () => {
  let _responseRecommend: any;
  let _responseJson: any;
  let _responsePartnerText: any;
  let start: any;
  let end: any;

  test.beforeAll(async ({ request, baseURL }) => {
    test.setTimeout(200000);
    _responseJson = await login({ request, baseURL });

    writeFileSync(
      "./playwright/attachments/report.pdf",
      `${faker.lorem.paragraphs(8)}`
    );
    const file = readFileSync("./playwright/attachments/report.pdf");

    const _responseReport = await submitReport(
      { request, baseURL },
      _responseJson.accessToken,
      file,
      "report"
    );
    await delay(90000);

    start = new Date();
    _responseRecommend = await request.post(
      `${baseURL}/api/Report/recommend-partner`,
      {
        headers: {
          Authorization: `Bearer ${_responseJson.accessToken}`,
        },
        data: {
          reportId: _responseReport.requestId,
          homeownerEmail: defaultEmail,
          homeownerPhone: faker.phone.number("(222) ###-####"),
        },
      }
    );
    end = new Date();

    _responsePartnerText = await _responseRecommend.text();
  });

  test.afterAll(async () => {
    unlinkSync("./playwright/attachments/report.pdf");
  });

  test("response time should be less than 5000s", async () => {
    expect(end - start).toBeLessThan(5000);
  });

  test("status should equal 200", async () => {
    expect(_responseRecommend.status()).toBe(200);
  });

  test("response body should be string", async () => {
    expect(typeof _responsePartnerText).toBe("string");
  });

  test("check response headers", async () => {
    const headers = _responseRecommend.headers();
    expect(Object.keys(headers)).toContain("content-length");
    expect(headers["content-length"]).toContain("0");
  });
});
