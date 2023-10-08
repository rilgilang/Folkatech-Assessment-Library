class KafkaBroker {
  constructor(kafka) {
    this.kafka = kafka;
  }
  publish = async (topic, message) => {
    try {
      const producer = this.kafka.producer();

      await producer.connect();
      await producer.send({
        topic: topic,
        messages: [{ value: message }],
      });

      await producer.disconnect();
    } catch (error) {
      console.log("publisher error --> ", error);
    }
  };

  consume = async (topic) => {
    try {
      const consumer = this.kafka.consumer({ groupId: "library-group" });

      await consumer.connect();
      await consumer.subscribe({ topic: topic, fromBeginning: true });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
          });
        },
      });
    } catch (error) {
      console.log("consumer error --> ", error);
    }
  };
}

module.exports = KafkaBroker;
