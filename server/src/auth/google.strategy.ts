import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { GoogleOauthClient } from './google.client';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];
    const payload = await this.validateToken(token);

    request.user = payload;
    request.token = token;
    request.userId = payload.sub;

    return true;
  }

  async validateToken(token: string): Promise<any> {
    try {
      const ticket = await GoogleOauthClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
