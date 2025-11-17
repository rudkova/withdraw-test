export function formatUrlToRedisKey(url: string): string {
  return url.replace(/^\//, '').replace(/\//g, ':');
}

export function getUserBalanceCacheKey(userId: string | number): string {
  return `user:balance:${userId}`;
}
