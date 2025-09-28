
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Briefcase, Plus, Search } from 'lucide-react';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    } else {
      router.push('/');
    }
  }, [router]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const { role, details } = userData;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome, {details.fullName}</h1>
        <p className="text-xl text-gray-400 mb-8">Your personalized {role} dashboard.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
            className="bg-gray-800/50 border border-blue-500/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Your Information</h2>
            <div className="space-y-2">
              <p><strong>Role:</strong> {role}</p>
              {role === 'Landowner' ? (
                <>
                  <p><strong>Farm Name:</strong> {details.farmName}</p>
                  <p><strong>Crop Type:</strong> {details.cropType}</p>
                </>
              ) : (
                <p><strong>Company:</strong> {details.companyName}</p>
              )}
              <p><strong>Location:</strong> {details.location}</p>
              <p className="text-sm text-gray-500"><strong>Wallet:</strong> {userData.walletAddress}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
            className="bg-gray-800/50 border border-purple-500/20 rounded-2xl p-8 flex flex-col items-center justify-center"
          >
            {role === 'Landowner' ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold"
              >
                <Plus /> Add Property
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold"
              >
                <Search /> Browse Listings
              </motion.button>
            )}
            <p className="mt-4 text-gray-400">Future functionality coming soon!</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
