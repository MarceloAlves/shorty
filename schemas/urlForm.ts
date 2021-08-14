import Joi from 'joi'

export const urlFormSchema = Joi.object({
  url: Joi.string().uri().required(),
})
