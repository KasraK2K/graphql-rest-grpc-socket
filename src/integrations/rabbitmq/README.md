```bash
docker run -it --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management
```

```typescript
/* -------------------------------------------------------------------------- */
/*                                  Consumer                                  */
/* -------------------------------------------------------------------------- */
import rabbitMQ from './integrations/rabbitmq'
const callback = async (message: Record<string, any>) =>
    console.log(`this is callback message: ${message.text}`)
rabbitMQ.ack.consumer(callback, { queue: 'queue-name' })
/* -------------------------------------------------------------------------- */
```

```typescript
/* -------------------------------------------------------------------------- */
/*                                  Producer                                  */
/* -------------------------------------------------------------------------- */
import rabbitMQ from './integrations/rabbitmq'
rabbitMQ.ack.producer(
    { text: 'Hello, world!', id: Math.round(Math.random() * 1000) },
    { queue: 'queue-name', closeConnectionAfter: 2000 }
)
/* -------------------------------------------------------------------------- */
```
