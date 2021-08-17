#!/bin/sh
yarn prisma migrate deploy && yarn start -p 3001
