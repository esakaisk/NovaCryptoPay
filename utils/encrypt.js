const crypto = require("crypto");
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 chars
const IV = Buffer.alloc(16, 0);

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(ENCRYPTION_KEY), IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};
