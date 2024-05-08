export const adminLogin = {
  'application/json': {
    example: {
      token: 'string',
      tokenExpires: 1111111,
      refreshToken: 'string',
      user: {
        id: 1,
        email: 'testemail@mail.com',
        name: 'admin admin',
        role: 'admin',
        emailVerified: true,
        isOnline: true,
      },
    },
  },
};
