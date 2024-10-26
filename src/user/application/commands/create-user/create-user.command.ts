import { UserRoles } from '#common';

export class CreateUserCommand {
  public constructor(public readonly input: CreateUserCommandInput) {}
}

type CreateUserCommandInput = {
  email: string;
  password: string;
  role?: UserRoles;
};
