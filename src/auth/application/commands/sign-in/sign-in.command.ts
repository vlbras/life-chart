export class SignInCommand {
  public constructor(public readonly input: SignInCommandInput) {}
}

type SignInCommandInput = {
  email: string;
  password: string;
};
