export const API_BASE_URL = "https://dev.moydomonline.ru/api";

const API_VERSIONS = {
  1: "v1.0",
  2: "v2.0",
};

const API_PATHS = {
  AUTH: "/auth",
  APPEALS: "/appeals",
  GEO: "/geo",
};

export const ENDPOINTS = {
  LOGIN: `${API_PATHS.AUTH}/login/`,
  APPEALS: `${API_PATHS.APPEALS}/${API_VERSIONS[1]}/appeals/`,
  USER_PREMISES: `${API_PATHS.GEO}/${API_VERSIONS[2]}/user-premises/`,
  APARTMENTS: `${API_PATHS.GEO}/${API_VERSIONS[1]}/apartments/`,
};
