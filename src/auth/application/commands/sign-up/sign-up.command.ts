export class SignUpCommand {
  public constructor(public readonly input: SignUpCommandInput) {}
}

type SignUpCommandInput = {
  email: string;
  password: string;
};
