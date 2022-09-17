import { Ratelimit } from '@upstash/ratelimit';
import redis from '.';

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '1 m'),
});

export default rateLimit;
