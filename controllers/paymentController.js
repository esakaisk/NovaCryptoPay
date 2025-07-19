const { generateWallet } = require("../services/walletService");
const redis = require("../services/redisClient");

exports.createSession = async (req, res) => {
  const { chain, amount, currency } = req.body;
  if (!chain || !amount) return res.status(400).json({ error: "Missing params" });

  const wallet = await generateWallet(chain);

  const sessionId = `session:${Date.now()}`;
  const sessionData = {
    chain, amount, currency, address: wallet.address,
    privateKeyEncrypted: wallet.privateKeyEncrypted, status: "pending"
  };

  await redis.set(sessionId, JSON.stringify(sessionData), "EX", 14400); // 4h TTL
  res.json({ session_id: sessionId, address: wallet.address, expires_in: 14400 });
};

exports.getStatus = async (req, res) => {
  const data = await redis.get(req.params.id);
  if (!data) return res.json({ status: "expired" });
  const parsed = JSON.parse(data);
  res.json({ status: parsed.status });
};
