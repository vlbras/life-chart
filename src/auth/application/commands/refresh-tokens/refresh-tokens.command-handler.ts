import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RefreshTokensCommand } from './refresh-tokens.command';

import { JwtTokensService } from '#auth/application/services/jwt-tokens.service';
import { Tokens } from '#auth/domain/models';
import { RefreshTokenRepository } from '#auth/infrastructure/repositories';

@CommandHandler(RefreshTokensCommand)
export class RefreshTokensCommandHandler implements ICommandHandler<RefreshTokensCommand, Tokens> {
  public constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  public async execute(command: RefreshTokensCommand): Promise<Tokens> {
    const refreshToken = await this.refreshTokenRepository.findOneAndDelete(command.input.refreshTokenId);

    if (!refreshToken) {
      throw new NotFoundException('Invalid refresh token');
    }

    return this.jwtTokenService.generate({ userId: refreshToken.userId, role: refreshToken.role });
  }
}
