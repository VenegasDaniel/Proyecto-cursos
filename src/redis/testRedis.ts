import redisService from './redis.service';

async function testRedis() {
  await redisService.set('testKey', { message: 'Hola, Redis!' });
  const value = await redisService.get('testKey');
  console.log('Value from Redis:', value);
}

testRedis();
