import { validator$, Joi } from '@marblejs/middleware-joi';

export const loginValidator$ = validator$({
  body: Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
  })
});
