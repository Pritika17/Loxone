"use client"

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function Dashboard() {
  const [lightStatus, setLightStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLightStatus();
  }, []);

  const fetchLightStatus = async () => {
    try {
      const response = await fetch('/api/loxone');
      const data = await response.json();
      setLightStatus(data.status === '1');
    } catch (error) {
      console.error('Error fetching light status:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLight = async () => {
    setLoading(true);
    try {
      const action = lightStatus ? 'off' : 'on';
      const response = await fetch('/api/loxone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();
      setLightStatus(data.status === '1');
    } catch (error) {
      console.error('Error toggling light:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-gray-800 rounded-xl shadow-2xl text-white"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Loxone Light Control</h1>
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            animate={{ rotate: lightStatus ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-yellow-300 mb-4"
          >
            {lightStatus ? <Sun size={48} /> : <Moon size={48} />}
          </motion.div>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold">
              {lightStatus ? 'ON' : 'OFF'}
            </span>
            <Switch
              checked={lightStatus}
              onCheckedChange={toggleLight}
              disabled={loading}
              className="data-[state=checked]:bg-blue-500"
            />
          </div>
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-6 h-6 border-t-2 border-blue-500 rounded-full"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}