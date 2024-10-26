import { From, Nested, Secret } from '@unifig/core';
import { IsEmail, MinLength } from 'class-validator';

export class DefaultAdminOptions {
  @From({ key: 'DEFAULT_ADMIN_EMAIL' })
  @IsEmail()
  public email: string;

  @From('DEFAULT_ADMIN_PASSWORD')
  @Secret()
  @MinLength(8)
  public password: string;
}

export class DefaultCustomerOptions {
  @From({ key: 'DEFAULT_CUSTOMER_EMAIL' })
  @IsEmail()
  public email: string;

  @From('DEFAULT_CUSTOMER_PASSWORD')
  @Secret()
  @MinLength(8)
  public password: string;
}

export class SeedOptions {
  @Nested(() => DefaultAdminOptions)
  public admin: DefaultAdminOptions;

  @Nested(() => DefaultCustomerOptions)
  public customer: DefaultCustomerOptions;
}
