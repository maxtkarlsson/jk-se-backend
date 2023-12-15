const Request = require("../models/Request");

exports.getAllRequests = async (req, res) => {
  const requests = await Request.find();

  return res.json(requests);
};

exports.createRequest = async (req, res) => {
  const response = await Request.create({
    type: req.body.type,
    productId: req.body.productId,
    email: req.body.email,
    phoneNr: req.body.phoneNr,
    text: req.body.text,
  });
  return res.json(response);
};
