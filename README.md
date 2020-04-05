# env-install

Using private git repositories that requires authentication is often necessary when running npm install, but you don't want to put keys, tokens or passwords in your code, so instead you can use this module that allows you to define packages with environment variable names to inject your keys, passwords or tokens from either .env vars or process vars.

## Usage

Add this module as a dependency in your projects normal dependencies, and add a `postinstall` script that contains `env-install`.
Then declare your dependencies containing environment variables in `envDependencies`

```
scripts: {
    "postinstall": "env-install"
},
dependencies: {
    "env-install": "1.0.0"
},
envDependencies: {
    "some-secret-module": "git+https://${GITHUB_TOKEN}:x-oauth-basic@github.com/you/privaterepo"
}
```

In the above example `some-secret-module` will be installed like this:

```
GITHUB_TOKEN=abcdefg123456
npm install https://abcdefg123456:x-oauth-basic@github.com/you/privaterepo
```

The variable can be defined either in an .env file or read from process.env.
Priority is given to .env file if the var exists in both places.

Example of a .env file:

```
.env file
GITHUB_TOKEN=abcdefg123456
```
