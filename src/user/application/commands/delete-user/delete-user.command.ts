export class DeleteUserCommand {
  public constructor(public readonly input: DeleteUserCommandInput) {}
}

type DeleteUserCommandInput = {
  id: string;
};
