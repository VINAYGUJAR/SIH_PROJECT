import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Copy, CheckCircle, AlertCircle } from 'lucide-react';

interface SearchResult {
  id: string;
  namasteCode: string;
  term: string;
  system: 'ayurveda' | 'siddha' | 'unani';
  icd11Code?: string;
  icd11Term?: string;
  whoTerminology?: string;
  confidence: number;
}

export default function SearchInterface() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  // Mock data for demonstration
  const mockResults: SearchResult[] = [
    {
      id: '1',
      namasteCode: 'AYU-001234',
      term: 'Vataj Jwara',
      system: 'ayurveda',
      icd11Code: 'TM2.01.01',
      icd11Term: 'Fever due to wind pattern disorder',
      whoTerminology: 'Vata Predominant Fever Pattern',
      confidence: 95
    },
    {
      id: '2',
      namasteCode: 'SID-002156',
      term: 'Pitham Karpam',
      system: 'siddha',
      icd11Code: 'TM2.02.15',
      icd11Term: 'Bile pattern related gastric disorder',
      whoTerminology: 'Pitta Digestive Pattern Disturbance',
      confidence: 88
    },
    {
      id: '3',
      namasteCode: 'UNA-003478',
      term: 'Balgham Mizaj',
      system: 'unani',
      icd11Code: 'TM2.03.22',
      icd11Term: 'Phlegmatic temperament disorder',
      whoTerminology: 'Kapha Constitutional Imbalance',
      confidence: 92
    }
  ];

  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setSearchResults(
          mockResults.filter(result => 
            result.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.namasteCode.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setIsSearching(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const getSystemColor = (system: string) => {
    switch (system) {
      case 'ayurveda': return 'bg-green-100 text-green-800';
      case 'siddha': return 'bg-blue-100 text-blue-800';
      case 'unani': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Code Search & Lookup</h2>
        <p className="text-gray-600">Search NAMASTE codes and find corresponding WHO ICD-11 TM2 mappings</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by NAMASTE code, term, or description..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Searching terminology database...</span>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Search Results ({searchResults.length})</h3>
          
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedResult(result)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSystemColor(result.system)}`}>
                      {result.system.charAt(0).toUpperCase() + result.system.slice(1)}
                    </span>
                    <span className="text-sm font-mono text-gray-600">{result.namasteCode}</span>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{result.term}</h4>
                  
                  {result.icd11Code && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-blue-700">ICD-11 TM2 Mapping:</span>
                        <span className="text-sm font-mono text-blue-600">{result.icd11Code}</span>
                      </div>
                      <p className="text-sm text-blue-800">{result.icd11Term}</p>
                    </div>
                  )}
                  
                  {result.whoTerminology && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <span className="text-sm font-medium text-green-700">WHO Terminology:</span>
                      <p className="text-sm text-green-800">{result.whoTerminology}</p>
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-1">
                    {result.confidence >= 90 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span className="text-sm text-gray-600">{result.confidence}% match</span>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(result.namasteCode);
                    }}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchTerm.length > 2 && !isSearching && searchResults.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">Try searching with different keywords or NAMASTE codes</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">Ayurveda Codes</h4>
          <p className="text-sm text-green-700">2,450 standardized terminologies</p>
          <button className="mt-2 text-sm text-green-600 hover:text-green-700 flex items-center">
            Browse all <ExternalLink className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Siddha Codes</h4>
          <p className="text-sm text-blue-700">1,200 standardized terminologies</p>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center">
            Browse all <ExternalLink className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2">Unani Codes</h4>
          <p className="text-sm text-orange-700">871 standardized terminologies</p>
          <button className="mt-2 text-sm text-orange-600 hover:text-orange-700 flex items-center">
            Browse all <ExternalLink className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}