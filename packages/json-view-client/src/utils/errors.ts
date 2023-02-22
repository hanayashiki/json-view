export interface Position {
  line: number;
  column: number;
}

export type ParseLooseJsonErrorCode = "SyntaxError";

export class ParseLooseJsonError extends Error {
  constructor(
    public loc: Position | undefined,
    public code: ParseLooseJsonErrorCode,
    message: string
  ) {
    super(message);
  }
}
