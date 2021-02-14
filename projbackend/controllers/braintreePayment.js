const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "tvsvpkmv6t45rxym",
  publicKey: "yddvymzcddpymx8h",
  privateKey: "d851deb0f8ca3ecf8a57fce491a3b5c0"
});

exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err)
        res.status(500).send(err);
        else
        res.send(response);
      });
}

exports.processPayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err)
          res.status(500).json(err);
          else
          res.json(result);
      });
}