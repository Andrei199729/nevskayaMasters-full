import { celebrate, Joi, Segments } from "celebrate";

const validateUrl = (
  value: string,
  helpers: { error: (arg0: string) => any },
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
    roles: Joi.string().valid("supervisor", "manager").required(),
  }),
});

export const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

export const refreshTokenBodyValidation = celebrate({
  body: Joi.object({
    refreshToken: Joi.string().required().label("Refresh Token"),
  }),
});

export const parameterIdValid = (nameId: string) =>
  celebrate({
    params: Joi.object().keys({
      [nameId]: Joi.string().hex().length(24),
    }),
  });

export const createProductValid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    apartmentId: Joi.string().hex().length(24).required(),
  }),

  [Segments.BODY]: Joi.object().keys({
    nameRoom: Joi.string().min(1).max(100).required(),
    dataProduct: Joi.array().items(Joi.object()).required(),
  }),
});

export const createApplicationValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    dataApplication: Joi.object().required(),
    rooms: Joi.array().items(Joi.string().hex().length(24)).required(),
  }),
});

export const createApartmentValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    dataApplication: Joi.object().required(),
    apartmentId: Joi.string().hex().length(24).required(),
  }),
});

export const parameterIdsValid = (...ids: string[]) =>
  celebrate({
    [Segments.PARAMS]: Joi.object(
      ids.reduce(
        (acc, id) => {
          // числовые параметры
          if (id === "sizeId" || id === "elementId") {
            acc[id] = Joi.number().integer().min(0).required();
          } else {
            // ObjectId
            acc[id] = Joi.string().hex().length(24).required();
          }
          return acc;
        },
        {} as Record<string, any>,
      ),
    ),
  });

export const updateProductValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    dataProduct: Joi.array().items(Joi.object()).required(),
  }),
});

export const updateApartmentsValid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    apartmentId: Joi.string().hex().length(24).required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    dataApplication: Joi.object()
      .pattern(
        Joi.string(), // ключи объекта — любые строки
        Joi.object().required(), // значения — объекты (можно уточнить структуру)
      )
      .required(),
  }),
});
