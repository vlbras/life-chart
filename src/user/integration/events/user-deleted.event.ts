export class UserDeletedEvent {
  public constructor(public readonly userId: string) {}
}

export const userDeletedNS = 'user.deleted';
