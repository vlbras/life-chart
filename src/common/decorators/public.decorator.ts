import { SetMetadata } from '@nestjs/common';

export const Public = (): any => SetMetadata(isPublicMetadataKey, true);

export const isPublicMetadataKey = 'isPublic';
