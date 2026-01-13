export class ApiError extends Error {
  status: number;
  reason: string;

  constructor(status: number, reason: string) {
    super(reason);
    this.status = status;
    this.reason = reason;
  }
}
