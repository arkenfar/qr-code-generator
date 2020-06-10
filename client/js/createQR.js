var QRCode = require("qrcode");
module.exports = async function createQR(qrdata, res) {
  let qr = {
    status: res.status,
    statusCode: res.statusCode,
    data: {
      qrcode: String,
      qrdata: qrdata.toString(),
    },
  };

  await QRCode.toDataURL(qrdata.toString(), { type: "png" }).then((data) => {
    qr.data.qrcode = data.toString();
  });
  return qr;
};
