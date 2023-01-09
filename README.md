# simple-mock

## Initial Setup

- Create `.env` file by copying and renaming `.env.eample`.

## Local development

*NOTE* evelated previlages (`sudo` for mac) required to access state file. State will not save if not used.

- Start live reload session (recommended): `sudo yarn start`
- Start static instance: `sudo yarn static`

## Docker

*NOTE* run `yarn build` beforehand.

```sh
docker build . -t [NameOfMock]:[Version] --build-arg _HTTPS_MODE=[Boolean] --build-arg _MOCK_REFERENCE=[NameOfMock] --platform linux/amd64
```

```sh
docker build . -t some-mock:1.0 --build-arg _HTTPS_MODE=false --build-arg _MOCK_REFERENCE=SOME_MOCK --platform linux/amd64
```
