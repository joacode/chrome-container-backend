export class AccountAlreadyExistError extends Error {
  constructor() {
    super('Acconunt already exist error');
  }
}
