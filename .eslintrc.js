module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      1,
      "single"
    ],
    "semi": [
      1,
      "never"
    ],
    "no-console": 1
  },
  "globals": {
        "$": true,
        "__BROWSER__": true,
        "__DEV__" : true
    }
};
