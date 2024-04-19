# Changelog

## v1.0.1

- Fix section comparison (which allows same section names)
  - This fixes `NtExecutableResource.from` which an error occurs for some executable binaries.

## v1.0.0

- Change the library to native ES module
  - CommonJS scripts now requires to use `pe-library/cjs` module to use the library.

## v0.4.0

- Add support for ES module loading in Node.js environment

## v0.3.0

- Add support for 'unparsable' resource data
  - Use `ignoreUnparsableData` parameter on `from` method of `NtExecutableResource`.

## v0.2.1

- Fix version information (no classes/types are changed)

## v0.2.0

- Add `NtExecutableResource` class and related types

## v0.1.3

- Export `calculateCheckSumForPE` function

## v0.1.2

- Remove `@internal` specifier for some methods

## v0.1.1

- Export `NtExecutableSection` and `NtExecutableFromOptions` types

## v0.1.0

Initial version (almost cloned from [resedit-js](https://github.com/jet2jet/resedit-js))
