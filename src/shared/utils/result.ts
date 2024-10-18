export class Result<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly error?: string,
    public readonly value?: T,
  ) {}

  static success<U>(value: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  static failure(error: string): Result<null> {
    return new Result(false, error, null);
  }
}
