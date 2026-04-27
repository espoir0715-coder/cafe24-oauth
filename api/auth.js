export default function handler(req, res) {
  const mallId = process.env.CAFE24_MALL_ID;
  const clientId = process.env.CAFE24_CLIENT_ID;
  const redirectUri = process.env.CAFE24_REDIRECT_URI;

  const scope = [
    "mall.read_application",
    "mall.write_application",
    "mall.read_product",
    "mall.write_product",
    "mall.read_order",
    "mall.write_order"
  ].join(",");

  const authUrl =
    `https://${mallId}.cafe24api.com/api/v2/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}`;

  res.redirect(authUrl);
}
