import React, { useState,useEffect } from 'react';
// import { Card } from '@/components/ui/card';
import { Card } from './ui/card';
import { Sparkles, Star, Phone, Mail, MapPin, Calendar, Clock, User } from 'lucide-react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?page=1&results=1&seed=abc');
        const data = await response.json();
        setUserData(data.results[0]);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-8">
      <Card 
        className="w-full max-w-4xl relative group/card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover/card:opacity-100 animate-gradient-x blur-xl transition-opacity duration-1000"></div>
        
        {/* Main card content */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
          {/* Top rainbow gradient bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
          
          <div className="flex flex-col md:flex-row bg-gradient-to-br from-white/50 to-blue-50/30 relative">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-700"></div>
            
            {/* Left side image */}
            <div className="md:w-64 relative group p-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {userData?.picture?.large ? (
                  <div className="relative overflow-hidden rounded-xl">
                    <img 
                      src={userData.picture.large} 
                      alt="Profile"
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-64 border-2 border-blue-300/50 bg-white/80 rounded-xl shadow-lg 
                                flex items-center justify-center overflow-hidden
                                transform transition-all duration-500 hover:scale-105 hover:rotate-2
                                group-hover:border-transparent backdrop-blur-sm">
                    <User className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <Sparkles className="absolute top-2 right-2 w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                    <Star className="absolute bottom-2 left-2 w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce" />
                    <Star className="absolute top-2 left-4 w-2 h-2 text-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping" />
                  </div>
                )}
              </div>
            </div>

            {/* Right side content */}
            <div className="flex-1 p-8 space-y-6">
              {/* Header */}
              <div className="space-y-2 group">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {userData?.name?.first} {userData?.name?.last}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                  <p className="text-gray-600 capitalize">{userData?.gender}</p>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Phone, label: 'Phone', value: userData?.phone, color: 'blue' },
                  { icon: Mail, label: 'Email', value: userData?.email, color: 'purple' },
                  { icon: MapPin, label: 'Location', value: `${userData?.location?.city}, ${userData?.location?.country}`, color: 'pink' },
                  { icon: Calendar, label: 'Date of Birth', value: new Date(userData?.dob?.date).toLocaleDateString(), color: 'blue' },
                  { icon: Clock, label: 'Registered', value: new Date(userData?.registered?.date).toLocaleDateString(), color: 'purple' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2 group">
                    <label className={`text-sm font-medium bg-gradient-to-r from-${item.color}-600 to-${item.color}-600 bg-clip-text text-transparent flex items-center gap-2`}>
                      {item.label}
                      <div className={`h-px w-8 bg-gradient-to-r from-${item.color}-500 to-transparent group-hover:w-full transition-all duration-300`}></div>
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500 to-${item.color}-500 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                      <div className="relative font-semibold bg-white/80 px-4 py-2 rounded-lg
                                    border border-blue-100 transition-all duration-300
                                    group-hover:translate-x-1 group-hover:border-transparent
                                    hover:shadow-lg hover:bg-white
                                    flex items-center gap-2">
                        <item.icon className={`w-4 h-4 text-${item.color}-500`} />
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;