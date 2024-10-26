export class FindUserQuery {
  public constructor(public readonly input: FindUserQueryInput) {}
}

type FindUserQueryInput = {
  id?: string;
  email?: string;
};
