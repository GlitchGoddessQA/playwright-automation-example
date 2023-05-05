import { addressDetails } from "./auth";

export async function estimatesList({ request, baseURL }, token: string) {
  let _responseEstimates = await request.get(
    `${baseURL}/api/RennovationEstimates/get-estimates-page?pageNumber=&pageSize=`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await _responseEstimates.json();
}

export async function addressInfo({ request, baseURL }, token: string) {
  let _responseInfo = await request.get(
    `${baseURL}/api/RennovationEstimates/get-address?streetAddress=${
      String(addressDetails[2]).split(",")[0]
    }&city=${String(addressDetails[2]).split(",")[1]}&state=${
      String(addressDetails[2]).split(",")[2]
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await _responseInfo.json();
}

export async function createEstimate({ request, baseURL }, token: string) {
  let _responseEstimate = await request.post(
    `${baseURL}/api/RennovationEstimates/save`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        estimateId: undefined,
        finishType: 1,
        fullAddress: addressDetails[2],
        addressLine1: String(addressDetails[2]).split(",")[0],
        city: String(addressDetails[2]).split(",")[1],
        state: String(addressDetails[2]).split(",")[2],
        zip: "21401",
        storiesCount: 1,
        hasBasement: false,
        totalAreaOfHouse: 1234,
        longitude: -74.0072955,
        latitude: 40.7094756,
        addressInfoRawApiResponse: "",
        estimateModel: {
          items: [
            {
              id: 153,
              question: null,
              itemTitle: "Small Kitchen, Refresh",
              itemDescription:
                "Paint cabinets, replace countertops, sink, faucet, garbage disposal, and appliances.",
              iconData:
                "PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjYwNTU0IDI0LjUzMzVIMjQuOTMwNVYxMi44MDAxSDQuNjA1NTRDNC4zMTAwNSAxMi44MDAxIDQuMDcwNjIgMTIuNDcxOCA0LjA3MDYyIDEyLjA2NjdDNC4wNzA2MiAxMS42NjE4IDQuMzEwMDUgMTEuMzMzNSA0LjYwNTU0IDExLjMzMzVIMjUuNDY1MUMyNS43NjA2IDExLjMzMzUgMjYgMTEuNjYxOCAyNiAxMi4wNjY3VjI1LjI2NjVDMjYgMjUuNjcxNyAyNS43NjA2IDI1Ljk5OTkgMjUuNDY1MSAyNS45OTk5SDQuNjA1NTRDNC4zMTAyMyAyNS45OTk5IDQuMDcwOCAyNS42NzE3IDQuMDcwOCAyNS4yNjY1QzQuMDcwOCAyNC44NjE2IDQuMzEwMjQgMjQuNTMzNSA0LjYwNTU0IDI0LjUzMzVaIiBmaWxsPSIjMTc2QzY3Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAuNTM4NCAxNUg5LjI3MTI4QzguOTIxNDUgMTUgOC42Mzc2IDE1LjQwNDkgOC42Mzc2IDE1LjczMzRDOC42Mzc2IDE2LjEzODMgOC45MjEyNCAxNi40NjY4IDkuMjcxMjggMTYuNDY2OEgxMC41Mzg0QzEwLjg4ODMgMTYuNDY2OCAxMS4xNzIxIDE2LjA2MTkgMTEuMTcyMSAxNS43MzM0QzExLjE3MjEgMTUuMzI4NSAxMC44ODg1IDE1IDEwLjUzODQgMTVaIiBmaWxsPSIjMTc2QzY3Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQuOTM4OSAxNy45MzM3SDI1LjE0NjFDMjUuNDQyNyAxNy45MzM3IDI1LjY4MzMgMTguMjYyIDI1LjY4MzMgMTguNjY2OUMyNS42ODMzIDE5LjA3MiAyNS40NDI3IDE5LjQwMDMgMjUuMTQ2MSAxOS40MDAzSDE0LjkzODlDMTQuNjQyMyAxOS40MDAzIDE0LjQwMTggMTkuMDcyIDE0LjQwMTggMTguNjY2OUMxNC40MDE4IDE4LjI2MiAxNC42NDIzIDE3LjkzMzcgMTQuOTM4OSAxNy45MzM3WiIgZmlsbD0iIzE3NkM2NyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwLjY3NTkgMjAuODY2NUgxOS40MDg3QzE5LjA1ODkgMjAuODY2NSAxOC43NzUgMjEuMjcxMyAxOC43NzUgMjEuNTk5OUMxOC43NzUgMjIuMDA0NyAxOS4wNTg3IDIyLjMzMzMgMTkuNDA4NyAyMi4zMzMzSDIwLjY3NTlDMjEuMDI1NyAyMi4zMzMzIDIxLjMwOTYgMjEuOTI4NCAyMS4zMDk2IDIxLjU5OTlDMjEuMzA5NiAyMS4xOTUgMjEuMDI1OSAyMC44NjY1IDIwLjY3NTkgMjAuODY2NVYyMC44NjY1WiIgZmlsbD0iIzE3NkM2NyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwLjY3NTkgMTQuMjY2N0gxOS40MDg3QzE5LjA1ODkgMTQuMjY2NyAxOC43NzUgMTQuNjcxNiAxOC43NzUgMTUuMDAwMUMxOC43NzUgMTUuNDA1IDE5LjA1ODcgMTUuNzMzNSAxOS40MDg3IDE1LjczMzVIMjAuNjc1OUMyMS4wMjU3IDE1LjczMzUgMjEuMzA5NiAxNS4zMjg2IDIxLjMwOTYgMTUuMDAwMUMyMS4zMDk2IDE0LjU5NTIgMjEuMDI1OSAxNC4yNjY3IDIwLjY3NTkgMTQuMjY2N1YxNC4yNjY3WiIgZmlsbD0iIzE3NkM2NyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1LjI2NzQgMjUuMjY2NlY3LjY2MzU5QzE1LjI2NzQgNi40NTE2NiAxNi4xMiA1LjQ2NjU3IDE3LjE2ODIgNS40NjY1N0MxOC4yMTYzIDUuNDY2NTcgMTkuMDY5MSA2LjQ1Mzg2IDE5LjA2OTEgNy42NjM1OUgyMC4zMzYyQzIwLjMzNjIgNS42NDM4MiAxOC45MTYzIDQgMTcuMTY4MiA0QzE1LjQyMDUgNCAxNCA1LjY0MTEyIDE0IDcuNjYzNTlWMjUuMjY2NkgxNS4yNjc0WiIgZmlsbD0iIzE3NkM2NyIvPgo8cmVjdCB3aWR0aD0iMi43Nzk2NSIgaGVpZ2h0PSIxLjQ1NjA5IiByeD0iMC43MjgwNDciIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDEyLjcgOC44NDQ3MykiIGZpbGw9IiMxNzZDNjciLz4KPHJlY3Qgd2lkdGg9IjIuNzc5NjUiIGhlaWdodD0iMS40NTYwOSIgcng9IjAuNzI4MDQ3IiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSA5LjE5OTk1IDguODQ0NzMpIiBmaWxsPSIjMTc2QzY3Ii8+CjxyZWN0IHdpZHRoPSIxLjQ1NDczIiBoZWlnaHQ9IjE0LjYxMTkiIHJ4PSIwLjcyNzM2NSIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgNS40NTQ1OSAxMS4zNjI4KSIgZmlsbD0iIzE3NkM2NyIvPgo8L3N2Zz4K",
              additionalIconHash:
                "1zhXTDhfO9gISnMsKlGrw2deMuquNyQcjFbFliBmsPXobUHU9rfEzvEPthoYTVylmmynOP4KLKyXX+HNk/1Sig==",
              lowItemPrice: 0,
              highItemPrice: 0,
              displayOrder: 1,
              parentId: 15,
              itemType: "ServiceItem",
              onlyForBasement: false,
              onlyForUpstairs: false,
              baseReturnOnInvestment: 377,
              tags: null,
              modifiers: [
                {
                  measurementUnitValue: 1,
                  selectedVariantId: null,
                  modifierToItem: {
                    id: 441,
                    requiredToFillOut: false,
                    defaultValueFormula: "1",
                    defaultValueCalculated: 1,
                    defaultModifierVariantId: null,
                    minimumCount: null,
                    minimumViolationMessage: null,
                    maximumCount: null,
                    maximumViolationMessage: null,
                    generalEstimateItemId: 153,
                    modifierId: 64,
                    displayOrder: 0,
                    modifierDto: {
                      id: 64,
                      name: "Base cost small kitchen refresh",
                      adminName: "Base cost small kitchen refresh",
                      description: null,
                      costOfItemFormula: "13000",
                      costOfItemCalculated: 13000,
                      measurementUnitStep: null,
                      measurementUnit: "Base",
                      hasVariants: false,
                      questionForVariants: null,
                      variants: [],
                      returnOnInvestmentModifier: null,
                    },
                  },
                },
                {
                  measurementUnitValue: 0,
                  selectedVariantId: null,
                  modifierToItem: {
                    id: 443,
                    requiredToFillOut: false,
                    defaultValueFormula: "0",
                    defaultValueCalculated: 0,
                    defaultModifierVariantId: null,
                    minimumCount: null,
                    minimumViolationMessage: null,
                    maximumCount: null,
                    maximumViolationMessage: null,
                    generalEstimateItemId: 153,
                    modifierId: 67,
                    displayOrder: 1,
                    modifierDto: {
                      id: 67,
                      name: "Exclude appliance package",
                      adminName:
                        "Exclude kitchen appliances - small kitchen refresh",
                      description: "Exclude appliance package",
                      costOfItemFormula: "-3000",
                      costOfItemCalculated: -3000,
                      measurementUnitStep: null,
                      measurementUnit: "BooleanPicker",
                      hasVariants: false,
                      questionForVariants: null,
                      variants: [],
                      returnOnInvestmentModifier: null,
                    },
                  },
                },
              ],
              zipMultiplier: 1,
            },
          ],
        },
      },
    }
  );
  return await _responseEstimate.json();
}

export async function getEstimateInfo(
  { request, baseURL },
  token: string,
  estimateId: number
) {
  let estimateInfo = await request.get(
    `${baseURL}/api/RennovationEstimates/get-before-pdf-info?estimateId=${estimateId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await estimateInfo.json();
}
