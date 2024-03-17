export const Helper = {
  checkPassword(password: string): boolean {
    const regexExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return regexExp.test(password);
  },
};
