import { ForbiddenException } from '@nestjs/common';

export class AccessDenied extends ForbiddenException {
  constructor() {
    super('Access Denied');
  }
}
