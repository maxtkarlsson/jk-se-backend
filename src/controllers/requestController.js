const Request = require("../models/Request");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.getAllRequests = async (req, res) => {
  const requests = await Request.find();

  return res.json(requests);
};

exports.createRequest = async (req, res) => {
  try {
    const newRequest = await Request.create({
      type: req.body.type,
      productId: req.body.productId,
      email: req.body.email,
      phoneNr: req.body.phoneNr,
      text: req.body.text,
    });

    if (newRequest) {
      const msg = {
        to: "max.karlsson93@gmail.com",
        from: "max.develop123@gmail.com",
        subject: `New ${newRequest.type}`,
        text: `REQUEST ID: </b>${newRequest._id}, PRODUCT ID: ${newRequest.productId}, FROM: ${newRequest.email}, PHONE: ${newRequest.phoneNr}, MESSAGE: ${newRequest.text}`,
        html: `<p>
        <b>REQUEST ID: </b>${newRequest._id},<br>
        <b>PRODUCT ID: </b>${newRequest.productId},<br>
        <b>FROM: </b>${newRequest.email},<br>
        <b>PHONE: </b>${newRequest.phoneNr},<br>
        <b>MESSAGE: </b>${newRequest.text}<br>
        </p>`,
      };

      sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode);
          console.log(response[0].headers);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
