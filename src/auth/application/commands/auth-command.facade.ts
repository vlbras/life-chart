import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { RefreshTokensCommand, SignInCommand, SignOutCommand, SignUpCommand } from '.';

import { Tokens } from '#auth/domain/models';

@Injectable()
export class AuthCommandFacade {
  public constructor(private readonly commandBud: CommandBus) {}

  public async signUp(command: SignUpCommand): Promise<Tokens> {
    return this.commandBud.execute(command);
  }

  public async signIn(command: SignInCommand): Promise<Tokens> {
    return this.commandBud.execute(command);
  }

  public async signOut(command: SignOutCommand): Promise<void> {
    await this.commandBud.execute(command);
  }

  public async refreshTokens(command: RefreshTokensCommand): Promise<Tokens> {
    return this.commandBud.execute(command);
  }
}
