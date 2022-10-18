const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImage = async (req, res) => {
  const newId = uuidv4();
  console.log("TEST", req.files.image);
  let productImage = req.files.image;
  console.log(productImage.name);
  const imagePath = path.join(__dirname, "../public/uploads/" + `${newId}.png`);
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${newId}-${productImage.name}` } });
};

// const uploadProductImage = async (req, res) => {
//   const result = await cloudinary.uploader.upload(
//     req.files.image.tempFilePath,
//     {
//       use_filename: true,
//       folder: "file-upload",
//     }
//   );
//   fs.unlinkSync(req.files.image.tempFilePath);
//   return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
// };

module.exports = {
  uploadProductImage,
};
