import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  MessageSquare,
  Search,
  Menu,
  Calendar,
  Clock,
  Users,
  HelpCircle,
  Settings,
  UserPlus,
  BellDot
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NotificationItem = ({ title, time, isUnread }) => (
  <div className={`p-3 hover:bg-gray-50 cursor-pointer ${isUnread ? 'bg-blue-50/50' : ''}`}>
    <div className="flex gap-3 items-start">
      <div className={`w-2 h-2 mt-2 rounded-full ${isUnread ? 'bg-blue-500' : 'bg-transparent'}`} />
      <div className="flex-1">
        <p className="text-sm text-gray-800 font-medium">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  </div>
);

const DashboardHeader = ({ onMenuClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddUserDropdown, setShowAddUserDropdown] = useState(false);

  // Role-specific actions
  const roleActions = {
    admin: [
      {
        icon: <UserPlus size={18} />,
        label: 'Add New User',
        onClick: () => setShowAddUserDropdown(!showAddUserDropdown),
        dropdown: true
      },
      { icon: <Settings size={18} />, label: 'Settings', onClick: () => navigate('/dashboard/admin/settings') }
    ],
    employee: [
      { icon: <Clock size={18} />, label: 'Time Sheet', onClick: () => navigate('/dashboard/employee/timesheet') },
      { icon: <Calendar size={18} />, label: 'Schedule', onClick: () => navigate('/dashboard/employee/schedule') }
    ],
    intern: [
      { icon: <Clock size={18} />, label: 'Log Hours', onClick: () => navigate('/dashboard/intern/timelog') },
      { icon: <Users size={18} />, label: 'My Mentors', onClick: () => navigate('/dashboard/intern/mentorship') }
    ]
  };

  const currentActions = roleActions[user?.role] || [];

  const handleAddUser = (type) => {
    setShowAddUserDropdown(false);
    navigate(`/dashboard/admin/users/add/${type}`);
  };

  return (
    <div className="px-4 h-16 flex items-center justify-between border-gray-200 w-full">
      {/* Left section with menu and search */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className='text-xl capitalize font-bold'>{user.role} Portal</h1>
        </div>

        <div className="hidden sm:flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none focus:outline-none text-sm w-48 lg:w-64"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Quick Actions */}
        <div className="hidden md:flex items-center gap-2 mr-2">
          {currentActions.map((action, index) => (
            <div key={index} className="relative">
              <button
                onClick={action.onClick}
                className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
              
              {/* Add User Dropdown */}
              {action.dropdown && showAddUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={() => handleAddUser('employee')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Add Employee
                  </button>
                  <button
                    onClick={() => handleAddUser('intern')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Add Intern
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Rest of the header components */}
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg">
          <HelpCircle size={20} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            {user?.role === 'admin' ? <BellDot size={20} /> : <Bell size={20} />}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {user?.role === 'admin' && (
                  <NotificationItem
                    title="New employee onboarding pending"
                    time="5 minutes ago"
                    isUnread
                  />
                )}
                <NotificationItem
                  title="Team meeting scheduled for tomorrow"
                  time="1 hour ago"
                  isUnread
                />
                <NotificationItem
                  title="Project deadline reminder"
                  time="2 hours ago"
                  isUnread={false}
                />
              </div>
              <div className="px-4 py-2 border-t border-gray-100">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg">
          <MessageSquare size={20} />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;