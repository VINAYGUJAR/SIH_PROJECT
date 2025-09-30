import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Search, 
  Database, 
  FileText, 
  Settings, 
  LogOut, 
  Globe,
  ShieldCheck,
  Activity,
  Users,
  TrendingUp,
  Download,
  Plus
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import SearchInterface from './SearchInterface';
import CodeMapping from './CodeMapping';
import FHIRBundle from './FHIRBundle';
import AuditTrail from './AuditTrail';

type TabType = 'search' | 'mapping' | 'fhir' | 'audit';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('search');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { icon: <Database className="h-8 w-8 text-blue-600" />, title: "NAMASTE Codes", value: "4,521", change: "+12 today" },
    { icon: <Globe className="h-8 w-8 text-green-600" />, title: "ICD-11 Mappings", value: "529", change: "100% coverage" },
    { icon: <FileText className="h-8 w-8 text-orange-600" />, title: "FHIR Bundles", value: "1,247", change: "+89 today" },
    { icon: <ShieldCheck className="h-8 w-8 text-purple-600" />, title: "Compliance", value: "100%", change: "All standards met" }
  ];

  const tabs = [
    { id: 'search', label: 'Code Search', icon: <Search className="h-5 w-5" /> },
    { id: 'mapping', label: 'Code Mapping', icon: <Database className="h-5 w-5" /> },
    { id: 'fhir', label: 'FHIR Bundles', icon: <FileText className="h-5 w-5" /> },
    { id: 'audit', label: 'Audit Trail', icon: <Activity className="h-5 w-5" /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'search':
        return <SearchInterface />;
      case 'mapping':
        return <CodeMapping />;
      case 'fhir':
        return <FHIRBundle />;
      case 'audit':
        return <AuditTrail />;
      default:
        return <SearchInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">NAMASTE-ICD11 Platform</h1>
                <p className="text-sm text-gray-500">Traditional Medicine Integration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* User Info Banner */}
      <div className="bg-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-blue-800">
              <ShieldCheck className="h-4 w-4 mr-2" />
              ABHA ID: {user?.abhaId} | Organization: {user?.organization}
            </div>
            <div className="text-sm text-blue-600">
              Session expires in: 45 minutes
            </div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Tab Navigation */}
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}