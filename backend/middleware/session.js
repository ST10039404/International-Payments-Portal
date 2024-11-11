import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
};

export const createSessionMiddleware = async () => {
  if (!mongoose.connection.readyState) {
    throw new Error('Database connection not established');
  }

  return session({
    ...sessionConfig,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      collectionName: 'sessions',
      ttl: 24 * 60 * 60,
      crypto: {
        secret: process.env.MONGO_STORE_SECRET || 'your-secret-key'
      }
    })
  });
};
