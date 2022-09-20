import { Ratelimit } from '@upstash/ratelimit';
import redis from '.';

export const nameGenRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, '1 m'),
});

export const reviewGenRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(4, '1 m'),
});
