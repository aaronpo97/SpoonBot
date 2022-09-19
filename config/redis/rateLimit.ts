import { Ratelimit } from '@upstash/ratelimit';
import redis from '.';

export const nameGenRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '1 m'),
});

export const reviewGenRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(2, '1 m'),
});
