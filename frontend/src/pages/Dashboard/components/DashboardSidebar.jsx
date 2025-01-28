import { Button } from '@/components/ui/button';
import { SIDEBAR_ITEMS } from '@/lib/DashboardSidebarConfig';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const DashboardSidebar = ({ open, setOpen, role }) => {
  const items = SIDEBAR_ITEMS[role] || [];
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* DashboardSidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and Header */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b bg-gray-50">
            <span className="text-xl font-semibold text-gray-800 capitalize">
              {role} Portal
            </span>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 overflow-y-auto">
            <div className="px-3 py-4">
              {/* Navigation Groups */}
              <div className="space-y-8">
                {/* Main Navigation */}
                <div className="space-y-1">
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 mr-3 ${
                        isActive(item.href) ? 'text-primary-foreground' : 'text-gray-500'
                      }`} />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Footer Section */}
          <div className="border-t p-4">
            <div className="space-y-4">
              {/* User Profile Preview */}
              <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {role.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 capitalize">{role} User</p>
                  <p className="text-xs text-gray-500">user@example.com</p>
                </div>
              </div>

              {/* Logout Button */}
              <Button 
                variant="" 
                className="w-full flex items-center justify-center"
                onClick={() => {
                  // Add logout logic here
                  console.log('Logout clicked');
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;