import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RefreshToken } from './decorators/refresh-toke.decorator';
import { SignInDto, SignUpDto } from './dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { TokensModel } from './models/tokens.model';

import {
  AuthCommandFacade,
  RefreshTokensCommand,
  SignInCommand,
  SignOutCommand,
  SignUpCommand,
} from '#auth/application/commands';
import { Public } from '#common';

@Public()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authCommandFacade: AuthCommandFacade) {}

  @ApiOperation({ summary: 'Sign Up' })
  @ApiCreatedResponse({ type: TokensModel })
  @Post('sign-up')
  public signUp(@Body() signUpDto: SignUpDto): Promise<TokensModel> {
    const command = new SignUpCommand(signUpDto);
    return this.authCommandFacade.signUp(command);
  }

  @ApiOperation({ summary: 'Sign In' })
  @ApiOkResponse({ type: TokensModel })
  @Post('sign-in')
  @HttpCode(200)
  public signIn(@Body() signInDto: SignInDto): Promise<TokensModel> {
    const command = new SignInCommand(signInDto);
    return this.authCommandFacade.signIn(command);
  }

  @ApiOperation({ summary: 'Sign Out' })
  @UseGuards(RefreshTokenGuard)
  @Post('sign-out')
  @HttpCode(200)
  public signOut(@RefreshToken('id') refreshTokenId: string): void {
    const command = new SignOutCommand({ refreshTokenId });
    this.authCommandFacade.signOut(command);
  }

  @ApiOperation({ summary: 'Refresh Tokens' })
  @ApiOkResponse({ type: TokensModel })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-tokens')
  @HttpCode(200)
  public refreshTokens(@RefreshToken('id') refreshTokenId: string): Promise<TokensModel> {
    const command = new RefreshTokensCommand({ refreshTokenId });
    return this.authCommandFacade.refreshTokens(command);
  }
}
