import * as yup from "yup";

export type ValidationResult<T> =
  | { success: true; data: T; errors: Record<string, string> }
  | { success: false; errors: Record<string, string> };

export async function validateWithSchema<T>(
  schema: yup.Schema<T>,
  values: unknown
): Promise<ValidationResult<T>> {
  try {
    const data = await schema.validate(values, { abortEarly: false });
    return { success: true, data, errors: {} };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      if (err.inner.length > 0) {
        for (const issue of err.inner) {
          if (issue.path && !errors[issue.path]) {
            errors[issue.path] = issue.message;
          }
        }
      } else if (err.path) {
        errors[err.path] = err.message;
      } else if (err.message) {
        errors._form = err.message;
      }
      return { success: false, errors };
    }
    throw err;
  }
}

