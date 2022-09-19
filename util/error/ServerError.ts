export default class ServerError extends Error {
  constructor(public message: string, public status: number) {
    super();
  }
}
