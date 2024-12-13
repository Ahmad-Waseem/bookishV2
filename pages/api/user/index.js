import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { useAuth } from "@/context/AuthContext";


export default async function handler(req, res) {
    await dbConnect();

    const user = req.headers['user-id'];
    const useId = user;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    switch (req.method) {
        case 'GET':
            const user = await User.findById(user);
            return res.status(200).json({ searchHistory: user?.searchHistory || [] });

        case 'POST':
            const { query } = req.body;
            if (!query) return res.status(400).json({ message: 'Query is required' });

            const updatedUser = await User.findByIdAndUpdate(
                useId,
                { $addToSet: { searchHistory: query } },
                { new: true }
            );
            return res.status(200).json({ message: 'Query added successfully', searchHistory: updatedUser.searchHistory });

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
