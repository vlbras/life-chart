import { UserRoles } from '#common';

export class UpdateUserCommand {
  public constructor(public readonly input: UpdateUserCommandInput) {}
}

type UpdateUserCommandInput = {
  id: string;
  email?: string;
  password?: string;
  role?: UserRoles;
};
