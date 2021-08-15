/* eslint-disable */
//@ts-nocheck
import { rest } from 'msw'

if (typeof window === 'undefined') {
  const { server } = require('./server')
  server.listen()
} else {
  const { worker } = require('./browser')

  window.msw = {
    worker,
    rest,
  }

  worker.start()
}

export {}
