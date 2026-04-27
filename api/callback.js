export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Authorization code가 없습니다.");
  }

  const mallId = process.env.CAFE24_MALL_ID;
  const clientId = process.env.CAFE24_CLIENT_ID;
  const clientSecret = process.env.CAFE24_CLIENT_SECRET;
  const redirectUri = process.env.CAFE24_REDIRECT_URI;

  const tokenUrl = `https://${mallId}.cafe24api.com/api/v2/oauth/token`;

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri
  });

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json({
      message: "카페24 토큰 발급 성공",
      data
    });
  } catch (error) {
    return res.status(500).json({
      message: "토큰 발급 중 오류 발생",
      error: error.message
    });
  }
}
