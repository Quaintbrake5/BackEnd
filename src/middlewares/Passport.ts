import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from '../config/db';


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, displayName, emails, photos } = profile;
        const email = emails && emails[0]?.value;
        const photo = photos && photos[0]?.value;

        if (!email) {
          return done(new Error('No email found in the Google profile'));
        }

        // Find or create the user in the database
        let user = await db.user.findUnique({ where: { email: email } });

        if (!user) {
          user = await db.user.create({
            data: {
              firstName: displayName,
              email: email,
              password: 'googleUser'

            },
          });
        }

        // Generate a JWT token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            displayName: user.firstName
          },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' }
        );

        // Pass the token to the client
        return done(null, token);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
