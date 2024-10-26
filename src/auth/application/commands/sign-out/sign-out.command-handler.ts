import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SignOutCommand } from './sign-out.command';

import { RefreshTokenRepository } from '#auth/infrastructure/repositories';

@CommandHandler(SignOutCommand)
export class SignOutCommandHandler implements ICommandHandler<SignOutCommand, void> {
  public constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {}

  public async execute(command: SignOutCommand): Promise<void> {
    await this.refreshTokenRepository.findOneAndDelete(command.input.refreshTokenId);
  }
}
