import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SignUpCommand } from './sign-up.command';

import { JwtTokensService } from '#auth/application/services/jwt-tokens.service';
import { Tokens } from '#auth/domain/models';
import { UserRoles } from '#common';
import { UserIntegrationService } from '#user/integration/user-integration.service';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand, Tokens> {
  public constructor(
    private readonly userIntegrationService: UserIntegrationService,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  public async execute(command: SignUpCommand): Promise<Tokens> {
    const userId = await this.userIntegrationService.create(command.input);
    return this.jwtTokenService.generate({ userId, role: UserRoles.CUSTOMER });
  }
}
