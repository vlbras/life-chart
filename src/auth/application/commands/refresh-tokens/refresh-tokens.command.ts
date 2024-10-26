export class RefreshTokensCommand {
  public constructor(public readonly input: RefreshTokensCommandInput) {}
}

type RefreshTokensCommandInput = {
  refreshTokenId: string;
};
