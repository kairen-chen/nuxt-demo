module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json',"ts", "tsx"],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub"
  },
  "collectCoverage": true,
  "collectCoverageFrom": [
      "<rootDir>/components/**/*.vue",
      "<rootDir>/pages/**/*.vue"
  ],
  setupFilesAfterEnv: ['<rootDir>jest.setup.js'],
}