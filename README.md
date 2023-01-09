# simple-mock

## Initial Setup

- Create `.env` file by copying and renaming `.env.eample`.

## Local development

*NOTE* evelated previlages (`sudo` for mac) required to access state file. State will not save if not used.

- Start live reload session (recommended): `sudo yarn start`
- Start static instance: `sudo yarn static`

## Docker

*NOTE* run `yarn build` beforehand.

- Build: `docker build . -t [NameOfMock]:[Version] --build-arg _HTTPS_MODE=[Boolean] --build-arg _MOCK_REFERENCE=[NameOfMock] --platform linux/amd64`
- Run: `docker run -i --rm -p 8080:8080 -v $PWD/state.json:/state.json [NameOfMock]:[Version]`

### Full example

```sh
docker build . -t some-mock:1.0 --build-arg _HTTPS_MODE=false --build-arg _MOCK_REFERENCE=SOME_MOCK --platform linux/amd64
docker run -i --rm -p 8080:8080 -v $PWD/state.json:/state.json some-mock:1.0
```
