import { Ratelimit } from '@upstash/ratelimit';
import redis from '.';

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '1 m'),
});

export default ratelimit;
