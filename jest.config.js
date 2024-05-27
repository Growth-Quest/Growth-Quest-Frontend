module.exports = {
  preset: "jest-expo",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  // roots: ['<rootDir>/src'],
  testRegex: "/__tests__/(?:__components__|__endpoints__)/.*\\.spec\\.ts$",
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
