import { Link } from '@prisma/client'
import { urlFormSchema } from '@schemas/urlForm'
import { createMachine, assign } from 'xstate'

export interface CreateLinkMachineContext {
  linkHistory: Link[]
  value: string
  errorMessage: string | null
  retries: number
}

export type CreateLinkMachineEvents =
  | { type: 'CREATE_LINK' }
  | { type: 'UPDATE_INPUT'; value: string }
  | { type: 'RESTART' }
  | { type: 'done.invoke.validateUrl' }
  | { type: 'error.platform.validatingUrl'; data: { message: string } }
  | { type: 'error.platform.creatingLink'; data: { message: string } }
  | { type: 'done.invoke.creatingLink'; data: Link }

export const createLinkMachine = createMachine<CreateLinkMachineContext, CreateLinkMachineEvents>(
  {
    id: 'shortenLink',
    context: {
      linkHistory: [],
      value: '',
      errorMessage: null,
      retries: 0,
    },
    initial: 'idle',
    states: {
      idle: {
        tags: ['showingForm'],
        on: {
          CREATE_LINK: 'validateForm',
          UPDATE_INPUT: {
            actions: ['updateValue', 'clearErrorMessage'],
          },
        },
      },
      validateForm: {
        tags: ['showingForm'],
        invoke: {
          id: 'validatingUrl',
          src: 'validateUrl',
          onDone: {
            target: 'creatingLink',
            actions: ['clearErrorMessage'],
          },
          onError: {
            target: 'idle',
            actions: ['setErrorMessage'],
          },
        },
      },
      creatingLink: {
        tags: ['showingForm'],
        always: [{ cond: 'retriesExceeded', target: 'cannotCreateLink' }],
        invoke: {
          id: 'creatingLink',
          src: 'postLink',
          onDone: {
            target: 'linkCreated',
            actions: ['prependLink'],
          },
          onError: {
            target: 'creatingLink',
            actions: ['incrementRetries', 'setErrorMessage'],
          },
        },
      },
      cannotCreateLink: {
        tags: ['showingForm'],
        type: 'final',
      },
      linkCreated: {
        tags: ['showingResult'],
        exit: ['resetContext'],
        on: {
          RESTART: 'idle',
        },
      },
    },
  },
  {
    guards: {
      retriesExceeded: (ctx) => {
        return ctx.retries !== 0 && ctx.retries >= 2
      },
    },
    services: {
      validateUrl: async (ctx) => {
        const result = urlFormSchema.validate({ url: ctx.value })

        if (result.error) {
          return Promise.reject({ message: 'Must be a valid URL' })
        }

        return result
      },
      postLink: async (ctx) => {
        const res = await fetch('/api/link', {
          method: 'POST',
          body: JSON.stringify({ url: ctx.value }),
          headers: { 'Content-Type': 'application/json' },
        })
        if (res.status === 201) {
          const data = res.json()
          return data
        }

        return Promise.reject({ status: res.status, message: 'Unable to create link. Please try again later.' })
      },
    },
    actions: {
      updateValue: assign((_ctx, evt) => {
        if (evt.type !== 'UPDATE_INPUT') return {}

        return {
          value: evt.value,
        }
      }),
      resetContext: assign((_ctx, evt) => {
        if (evt.type !== 'RESTART') return {}

        return {
          value: '',
          errorMessage: null,
          retries: 0,
        }
      }),
      incrementRetries: assign((ctx) => {
        return {
          retries: ctx.retries + 1,
        }
      }),
      prependLink: assign((ctx, evt) => {
        if (evt.type !== 'done.invoke.creatingLink') return {}

        return {
          linkHistory: [evt.data, ...ctx.linkHistory],
        }
      }),
      clearErrorMessage: assign((_ctx, evt) => {
        if (evt.type !== 'done.invoke.validateUrl') return {}

        return {
          errorMessage: null,
        }
      }),
      setErrorMessage: assign((_ctx, evt) => {
        if (evt.type === 'error.platform.validatingUrl' || evt.type === 'error.platform.creatingLink') {
          return {
            errorMessage: evt.data.message,
          }
        }

        return {}
      }),
    },
  }
)
