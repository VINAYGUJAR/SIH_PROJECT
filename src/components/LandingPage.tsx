import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Database, Zap, Users, Globe, ChevronRight, Star } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Database className="w-8 h-8 text-blue-600" />,
      title: "NAMASTE Integration",
      description: "4,500+ standardized terminologies for Ayurveda, Siddha, and Unani disorders"
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "WHO ICD-11 TM2",
      description: "529 disorder categories and 196 pattern codes aligned with global standards"
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      title: "FHIR R4 Compliance",
      description: "Full compliance with India's 2016 EHR Standards and international protocols"
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "Real-time Search",
      description: "Instant auto-complete and dual coding for efficient clinical documentation"
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "ABHA Integration",
      description: "Secure OAuth 2.0 authentication with India's health ID system"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Audit Ready",
      description: "Complete audit trails and consent management for regulatory compliance"
    }
  ];

  const stats = [
    { number: "4,500+", label: "NAMASTE Codes" },
    { number: "529", label: "ICD-11 TM2 Categories" },
    { number: "100%", label: "FHIR Compliance" },
    { number: "24/7", label: "System Availability" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">NAMASTE-ICD11</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#compliance" className="text-gray-700 hover:text-blue-600 transition-colors">Compliance</a>
            </nav>
            <button 
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bridging Traditional Medicine
              <span className="text-blue-600"> & Modern Healthcare</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Integrate NAMASTE terminologies and WHO ICD-11 TM2 codes into your EMR system. 
              Enable dual coding, ensure FHIR compliance, and support India's digital health transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Integration Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to implement traditional medicine coding in your EMR system
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section id="compliance" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  India's 2016 EHR Standards Compliant
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">FHIR R4 API Implementation</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">SNOMED CT & LOINC Semantics</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">ISO 22600 Access Control</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">ABHA-linked OAuth 2.0</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Comprehensive Audit Trails</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Integration Benefits</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Seamless traditional-modern medicine correlation</li>
                  <li>• Insurance claim compatibility with ICD-11</li>
                  <li>• Real-time morbidity analytics</li>
                  <li>• International reporting standards alignment</li>
                  <li>• Reduced documentation errors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold">NAMASTE-ICD11 Platform</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering India's digital health transformation through integrated traditional medicine coding
            </p>
            <div className="text-sm text-gray-500">
              © 2025 NAMASTE-ICD11 Integration Platform. Built for India's healthcare ecosystem.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}