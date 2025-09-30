import { useState } from 'react';
import { ArrowRight, Link, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface MappingEntry {
  id: string;
  namasteCode: string;
  namasteTerm: string;
  system: string;
  icd11Code: string;
  icd11Term: string;
  biomedicineCode?: string;
  biomedicineTerm?: string;
  mappingStatus: 'verified' | 'pending' | 'conflict';
  confidence: number;
  lastUpdated: string;
}

export default function CodeMapping() {
  const [selectedMapping, setSelectedMapping] = useState<MappingEntry | null>(null);
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending' | 'conflict'>('all');

  const mockMappings: MappingEntry[] = [
    {
      id: '1',
      namasteCode: 'AYU-001234',
      namasteTerm: 'Vataj Jwara',
      system: 'Ayurveda',
      icd11Code: 'TM2.01.01',
      icd11Term: 'Fever due to wind pattern disorder',
      biomedicineCode: '1A00.Z',
      biomedicineTerm: 'Fever, unspecified',
      mappingStatus: 'verified',
      confidence: 95,
      lastUpdated: '2025-01-08'
    },
    {
      id: '2',
      namasteCode: 'SID-002156',
      namasteTerm: 'Pitham Karpam',
      system: 'Siddha',
      icd11Code: 'TM2.02.15',
      icd11Term: 'Bile pattern related gastric disorder',
      biomedicineCode: 'DA02.0',
      biomedicineTerm: 'Functional dyspepsia',
      mappingStatus: 'pending',
      confidence: 88,
      lastUpdated: '2025-01-07'
    },
    {
      id: '3',
      namasteCode: 'UNA-003478',
      namasteTerm: 'Balgham Mizaj',
      system: 'Unani',
      icd11Code: 'TM2.03.22',
      icd11Term: 'Phlegmatic temperament disorder',
      mappingStatus: 'conflict',
      confidence: 72,
      lastUpdated: '2025-01-06'
    }
  ];

  const filteredMappings = filter === 'all' 
    ? mockMappings 
    : mockMappings.filter(mapping => mapping.mappingStatus === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <RefreshCw className="h-5 w-5 text-yellow-500" />;
      case 'conflict':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'conflict':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Code Mapping Management</h2>
        <p className="text-gray-600">Manage NAMASTE to ICD-11 TM2 and Biomedicine code mappings</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'all', label: 'All Mappings' },
          { key: 'verified', label: 'Verified' },
          { key: 'pending', label: 'Pending Review' },
          { key: 'conflict', label: 'Conflicts' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              filter === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mappings List */}
      <div className="space-y-4">
        {filteredMappings.map((mapping) => (
          <div
            key={mapping.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(mapping.mappingStatus)}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(mapping.mappingStatus)}`}>
                  {mapping.mappingStatus.charAt(0).toUpperCase() + mapping.mappingStatus.slice(1)}
                </span>
                <span className="text-sm text-gray-500">Updated: {mapping.lastUpdated}</span>
              </div>
              <div className="text-sm text-gray-600">
                Confidence: {mapping.confidence}%
              </div>
            </div>

            {/* Mapping Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* NAMASTE Code */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 uppercase">NAMASTE</span>
                  <span className="text-xs text-blue-500">{mapping.system}</span>
                </div>
                <div className="font-mono text-sm text-blue-700 mb-1">{mapping.namasteCode}</div>
                <div className="text-sm text-blue-800">{mapping.namasteTerm}</div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>

              {/* ICD-11 Mapping */}
              <div className="space-y-3">
                {/* TM2 Code */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-green-600 uppercase">ICD-11 TM2</span>
                    <Link className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="font-mono text-sm text-green-700 mb-1">{mapping.icd11Code}</div>
                  <div className="text-sm text-green-800">{mapping.icd11Term}</div>
                </div>

                {/* Biomedicine Code */}
                {mapping.biomedicineCode && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-orange-600 uppercase">ICD-11 Biomedicine</span>
                      <Link className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="font-mono text-sm text-orange-700 mb-1">{mapping.biomedicineCode}</div>
                    <div className="text-sm text-orange-800">{mapping.biomedicineTerm}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4 pt-4 border-t">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                Review Mapping
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                Edit
              </button>
              {mapping.mappingStatus === 'pending' && (
                <button className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-green-800">4,521</div>
              <div className="text-sm text-green-600">Verified Mappings</div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <RefreshCw className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-yellow-800">127</div>
              <div className="text-sm text-yellow-600">Pending Review</div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-red-800">23</div>
              <div className="text-sm text-red-600">Conflicts</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Link className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-blue-800">97.2%</div>
              <div className="text-sm text-blue-600">Coverage Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}