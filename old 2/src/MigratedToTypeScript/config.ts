import amqp from "amqplib";

const cache: CacheConfig = {
  db: undefined,
  username: undefined,
  password: undefined,
  host: "127.0.0.1",
  port: 6379,
  connect_timeout: 600,
};

const graph: GraphConfig = {
  url: "ws://localhost:8182/gremlin",
  host: undefined,
  username: undefined,
  password: undefined,
  port: undefined,
};

const mailer: MailerConfig = {
  apikey:
    "REDACTED",
};

const mb: amqp.Options.Connect = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  locale: "en_US",
  frameMax: 0,
  heartbeat: 0,
  vhost: "/",
};
