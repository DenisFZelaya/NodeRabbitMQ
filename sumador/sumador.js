var amqp = require("amqplib/callback_api");

// RabbitMQ connection
amqp.connect("amqp://localhost", function (error0, conecction) {
  if (error0) {
    throw error0;
  }

  conecction.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "sumas";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log("Esperando por mensajes - detener por CTRL + C ", queue);

    channel.consume(
      queue,
      function (msg) {
        var sumar = JSON.parse(msg.content);
        var res = sumar.num1 + sumar.num2;
        console.log("Me solicitaron sumar: " + res);
      },
      {
        noAck: true,
      }
    );
  });
});
