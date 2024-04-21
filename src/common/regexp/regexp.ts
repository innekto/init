export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;

export const userNameRegex =
  /^[A-Z0-9А-Я!@#\$%^&*_+\-=~?][A-Za-z0-9А-Яа-я!@#\$%^&*_+\-=~?]*$/;

export const webUrlsRegexp =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)?$/;
