# simple-mock

## Initial Setup

- Create `.env` file by copying and renaming `.env.eample`.

## Local development

*NOTE* evelated previlages (`sudo` for mac) required to access state file. State will not save if not used.

- Start live reload session (recommended): `sudo yarn start`
  - ...OR Start static instance: `sudo yarn static`
- Confirm by navigation to `http://localhost:2000` in a browser.
  - ...OR import and run the `Mock.postman_collection.json` postman collection.

## State

- State is stored in a json file specifed via the `STATE_FILE` environment variable.
- State can be accessed via the browser at `http://localhost:2000/state`.

## Run via [Docker](https://www.docker.com/)

- Build: `docker build . -t [NameOfMock]:[Version] --build-arg _HTTPS_MODE=[Boolean] --build-arg _MOCK_REFERENCE=[NameOfMock] --platform linux/amd64`
- Run: `docker run -i --rm -p 8080:8080 -p 2000:2000 -v $PWD/state.json:/state.json [NameOfMock]:[Version]`

#### Example

```sh
yarn build
docker build . -t some-mock:1.0 --build-arg _HTTPS_MODE=false --build-arg _MOCK_REFERENCE=SOME_MOCK --platform linux/amd64
docker run -i --rm -p 8080:8080 -p 2000:2000 -v $PWD/state.json:/state.json some-mock:1.0
```

## Run via [Docker-Compose](https://docs.docker.com/compose/)

- Run Locally: `MOCK_REFERENCE=mock-face MOCK_VERSION=1.0 docker-compose up --build --force-recreate mock`
  - Access API via `curl http://localhost:8080/health`
- ...OR Expose to the internet via [Ngrok](https://ngrok.com/): `MOCK_REFERENCE=mock-face MOCK_VERSION=1.0 docker-compose up --build --force-recreate ngrok_mock`
  - Access API via `curl $(docker logs ngrok_mock | xargs)/health`
- Stop: `docker-compose down` or ctr+c
