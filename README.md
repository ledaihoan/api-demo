# Instruction

1. Install nvm `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`
2. Close and open new terminal
3. Use nvm to install node 20: `nvm install 20`
4. `npm install -g pm2`

## Local run

5. Setup Postgresql and set local root (postgres) password.
6. Run project migration

```shell
$ cd /path/to/project
$ npm install
# use the values as setup: %40 is quoted of '@'
# user: postgres, password: Min20241@, db: api_demo, host: localhost / IPv4
$ export DB_CONNECTION_STRING=postgresql://postgres:AdminPass1%40@localhost:5432/api_demo
$ export DB_PASSWORD=Apidemo2024@
$ npm run migrate:latest
```

7. Update .env.development file after done. Replace user with 'api_demo' (service name), password with given
   DB_PASSWORD (special character quote in mind)
8. Run command `npm run start:dev`

## Production deployment

5. Setup Postgresql and set root (postgres) password. Update .env.development
   file https://www.cherryservers.com/blog/install-postgresql-ubuntu-22-04
6. Run project migration

```shell
$ cd /path/to/project
$ npm install
# use the values as setup: %40 is quoted of '@'
# user: postgres, password: Min20241@, db: min_proxy, host: localhost / IPv4
$ export DB_CONNECTION_STRING=postgresql://${ADMIN_USER}:${QUOTE_ADMIN_PASSWORD}@localhost:5432/${DB_NAME}
$ export DB_USER=${DB_NEW_USER}
$ export DB_PASSWORD=${DB_NEW_PASSWORD}
$ npm run migrate:latest
```

7. Update .env.production file after done. Replace user with ${DB_NEW_USER}, password with given ${DB_NEW_PASSWORD} (
   like sample in .env.development)
8. Run command `./runservice.sh production`