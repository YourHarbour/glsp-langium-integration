# glsp-langium integration

This repository serves the development of an integration framework between [GLSP](https://github.com/eclipse-glsp/glsp) and [Langium](https://github.com/eclipse-langium/langium).

It is based on a fork of https://github.com/eclipse-glsp/glsp-examples/tree/master.

## Authors

-   Andreas ([@Sakrafux](https://github.com/Sakrafux))
-   BoFan ([@YourHarbour](https://github.com/YourHarbour))

## Prerequisites

The following libraries/frameworks need to be installed on your system:

-   [Node.js](https://nodejs.org/en/) `>=20`
-   [Yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable) `>=1.7.0 < 2.x.x`
-   [Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) `>=17`
-   [Maven](https://maven.apache.org/) `>=3.6.0`

The examples are heavily interwoven with Eclipse Theia, so please also check the [prerequisites of Theia](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites).

## Directories

For orientation, the following directories are of importance:
- `framework` - Contains the actual GLSP-Langium-Integration code, which is published as the npm package `glsp-langium-integration`.
- `example` - Contains a simple adjusted version of the GLSP official workflow template, which makes use of the GLSP-Langium-Integration.

## Building the example

Move to the example:

```
cd example
```

Install all dependencies

```
yarn install
cd glsp-client
yarn install
cd ..
```

Build the application (both server and client) and start it:

```
yarn run build
yarn run start

or 

yarn run start:build
```

Build (and start) the application using docker:

```
yarn run docker:build
yarn run docker:run
```
