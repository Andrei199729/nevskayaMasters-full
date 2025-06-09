import { celebrate, Joi } from "celebrate";

const validateUrl = (
  value: string,
  helpers: { error: (arg0: string) => any }
) => {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

  if (!regex.test(value)) {
    return helpers.error("Ссылка не валидна");
  }
  return value;
};

export const registerValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    rules: Joi.string().valid("supervisor", "manager").required(),
  }),
});

export const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// export const createCardValid = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().required().custom(validateUrl),
//   }),
// });

// export const userValid = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     about: Joi.string().required().min(2).max(30),
//   }),
// });
