export class SignOutCommand {
  public constructor(public readonly input: SignOutCommandInput) {}
}

type SignOutCommandInput = {
  refreshTokenId: string;
};
