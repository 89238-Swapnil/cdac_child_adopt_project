import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Home, 
  Building2, 
  Users, 
  FileText,
  Settings
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isParent, isOrphanage, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const parentNavItems = [
    { to: '/parent/dashboard', label: 'Dashboard', icon: Home },
    { to: '/orphanages', label: 'Orphanages', icon: Building2 },
    { to: '/children', label: 'Children', icon: Users },
    { to: '/my-requests', label: 'My Requests', icon: FileText },
  ];

  const orphanageNavItems = [
    { to: '/orphanage/dashboard', label: 'Dashboard', icon: Home },
    { to: '/manage-children', label: 'Manage Children', icon: Users },
    { to: '/adoption-requests', label: 'Adoption Requests', icon: FileText },
  ];

  const getNavItems = () => {
    if (isParent()) return parentNavItems;
    if (isOrphanage()) return orphanageNavItems;
    return [];
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Child Adoption System</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated() && (
              <>
                {getNavItems().map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <div className="flex items-center space-x-1">
                  <Link to="/register/parent">
                    <Button variant="outline" size="sm">Register as Parent</Button>
                  </Link>
                  <Link to="/register/orphanage">
                    <Button size="sm">Register as Orphanage</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {isAuthenticated() ? (
                <>
                  {getNavItems().map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={closeMenu}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMenu}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register/parent"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMenu}
                  >
                    Register as Parent
                  </Link>
                  <Link
                    to="/register/orphanage"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMenu}
                  >
                    Register as Orphanage
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

