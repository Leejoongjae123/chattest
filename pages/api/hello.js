// pages/api/hello.js

export default function handler(req, res) {
  // GET 요청에 대한 처리
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello, World!' });
  } else {
    // 다른 HTTP 메서드에 대한 처리
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
