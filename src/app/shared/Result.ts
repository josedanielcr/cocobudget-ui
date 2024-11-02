export class Result<T> {
  constructor(
    public value: T | null,
    public isSuccess: boolean,
    public error: Error
  ) {}

  get isFailure(): boolean {
    return !this.isSuccess;
  }

  static success<T>(value: T): Result<T> {
    return new Result(value, true, { code: "", message: "" });
  }

  static failure<T>(error: Error): Result<T> {
    return new Result<T>(null as any, false, error); // Ensures compatibility with any T
  }
}

export interface Error {
  code: string;
  message: string;
}
