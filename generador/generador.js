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

    var num1 = Math.round(Math.random() * 100);
    var num2 = Math.round(Math.random() * 100);

    var msj = JSON.stringify({
      num1: num1,
      num2: num2,
    });

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msj));

    console.log("Solicito la suma de: " + num1 + " " + num2);
  });

  setTimeout(function () {
    conecction.close();
    process.exit(0);
  }, 500);
});
