import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import { Profile } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID:
        '694819970026-fqpf6j3lohj5esf4b1d27747nskoltur.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:7000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
    });
    return user || null;
  }
}
