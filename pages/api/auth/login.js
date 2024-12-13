import dbConnect from '@/lib/mongoose';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const Email = 'reader1@example.com';
    const passcode = 'password123';

    if (email === Email && password === passcode) {
      return res.status(200).json({
        token: 'realToken',
        userId: '675b3d475e3b3e32f9185fab',
        email: Email,
      });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(405).json({ message: 'Method not allowed' });
}
