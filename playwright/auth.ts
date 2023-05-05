export const defaultEmail = "cveqn33@mailto.plus";

export async function login({ request, baseURL }, email?: string) {
  let _response = await request.post(`${baseURL}/api/auth/login`, {
    data: {
      email: email ? email : defaultEmail,
      password: "Test1est!",
    },
  });

  return await _response.json();
}

export async function loginAdmin({ request, baseURL }) {
  let _response = await request.post(`${baseURL}/api/auth/login`, {
    data: {
      email: "admin@platform.com",
      password: "QW12qw!@",
    },
  });

  return await _response.json();
}

export async function getProfileData({ request, baseURL }, token: string) {
  let _responseProfile = await request.get(`${baseURL}/api/account/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await _responseProfile.json();
}

export const addressDetails = [
  38.998604650203916,
  -76.53187404614857,
  "604 St Mulberry Ct, Annapolis, MD, USA",
];
