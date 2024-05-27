module.exports = {
  preset: "jest-expo",
  testEnvironment: "jsdom",
  // roots: ['<rootDir>/src'],
  testRegex: "/__tests__/.*\\.spec\\.tsx$",
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
    "\\.(css|less)$": "identity-obj-proxy"
  },
};
