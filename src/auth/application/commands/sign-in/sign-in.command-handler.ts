import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { compare } from 'bcryptjs';

import { SignInCommand } from './sign-in.command';

import { JwtTokensService } from '#auth/application/services/jwt-tokens.service';
import { Tokens } from '#auth/domain/models';
import { UserIntegrationService } from '#user/integration/user-integration.service';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand, Tokens> {
  public constructor(
    private readonly userIntegrationService: UserIntegrationService,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  private readonly logger = new Logger(SignInCommandHandler.name);

  public async execute(command: SignInCommand): Promise<Tokens> {
    const { email, password } = command.input;

    this.logger.debug(`Start signing in user, email: ${email}`);

    const { id: userId, password: hashedPassword, role } = await this.userIntegrationService.findOne({ email });

    if (!(await compare(password, hashedPassword))) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.jwtTokenService.generate({ userId, role });

    this.logger.debug(`User successfully signed in, email: ${email}`);
    return tokens;
  }
}
