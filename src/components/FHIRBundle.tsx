import React, { useState } from 'react';
import { FileText, Download, Upload, Eye, CheckCircle, Clock } from 'lucide-react';

interface FHIRBundle {
  id: string;
  patientId: string;
  patientName: string;
  encounterDate: string;
  namasteCode: string;
  icd11Code: string;
  biomedicineCode?: string;
  status: 'draft' | 'active' | 'completed';
  bundleSize: string;
  lastModified: string;
}

export default function FHIRBundle() {
  const [selectedBundle, setSelectedBundle] = useState<FHIRBundle | null>(null);
  const [showJSON, setShowJSON] = useState(false);

  const mockBundles: FHIRBundle[] = [
    {
      id: 'bundle-001',
      patientId: 'patient-12345',
      patientName: 'Ramesh Kumar',
      encounterDate: '2025-01-08',
      namasteCode: 'AYU-001234',
      icd11Code: 'TM2.01.01',
      biomedicineCode: '1A00.Z',
      status: 'completed',
      bundleSize: '2.4 KB',
      lastModified: '2025-01-08T10:30:00Z'
    },
    {
      id: 'bundle-002',
      patientId: 'patient-67890',
      patientName: 'Priya Sharma',
      encounterDate: '2025-01-08',
      namasteCode: 'SID-002156',
      icd11Code: 'TM2.02.15',
      status: 'active',
      bundleSize: '1.8 KB',
      lastModified: '2025-01-08T09:15:00Z'
    },
    {
      id: 'bundle-003',
      patientId: 'patient-11111',
      patientName: 'Ahmed Ali',
      encounterDate: '2025-01-07',
      namasteCode: 'UNA-003478',
      icd11Code: 'TM2.03.22',
      status: 'draft',
      bundleSize: '1.2 KB',
      lastModified: '2025-01-07T16:45:00Z'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'active':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'draft':
        return <FileText className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sampleFHIRBundle = {
    resourceType: "Bundle",
    id: "bundle-001",
    type: "collection",
    timestamp: "2025-01-08T10:30:00Z",
    entry: [
      {
        resource: {
          resourceType: "Patient",
          id: "patient-12345",
          identifier: [
            {
              system: "https://healthid.ndhm.gov.in",
              value: "ABHA-2024-001234"
            }
          ],
          name: [
            {
              family: "Kumar",
              given: ["Ramesh"]
            }
          ]
        }
      },
      {
        resource: {
          resourceType: "Condition",
          id: "condition-001",
          subject: {
            reference: "Patient/patient-12345"
          },
          code: {
            coding: [
              {
                system: "http://namaste.gov.in/codes",
                code: "AYU-001234",
                display: "Vataj Jwara"
              },
              {
                system: "http://id.who.int/icd/release/11/2022-02",
                code: "TM2.01.01",
                display: "Fever due to wind pattern disorder"
              },
              {
                system: "http://id.who.int/icd/release/11/2022-02",
                code: "1A00.Z",
                display: "Fever, unspecified"
              }
            ]
          },
          clinicalStatus: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                code: "active"
              }
            ]
          }
        }
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">FHIR Bundle Management</h2>
          <p className="text-gray-600">Create, manage, and export FHIR R4 compliant bundles with dual coding</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="h-4 w-4 mr-2" />
            Upload Bundle
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <FileText className="h-4 w-4 mr-2" />
            Create New
          </button>
        </div>
      </div>

      {/* Bundle List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent FHIR Bundles</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {mockBundles.map((bundle) => (
            <div key={bundle.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(bundle.status)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bundle.status)}`}>
                      {bundle.status.charAt(0).toUpperCase() + bundle.status.slice(1)}
                    </span>
                    <span className="text-sm font-mono text-gray-500">{bundle.id}</span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{bundle.patientName}</h4>
                  <p className="text-sm text-gray-600 mb-3">Patient ID: {bundle.patientId} | Encounter: {bundle.encounterDate}</p>
                  
                  {/* Coding Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs font-medium text-blue-600 uppercase mb-1">NAMASTE</div>
                      <div className="text-sm font-mono text-blue-700">{bundle.namasteCode}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-xs font-medium text-green-600 uppercase mb-1">ICD-11 TM2</div>
                      <div className="text-sm font-mono text-green-700">{bundle.icd11Code}</div>
                    </div>
                    {bundle.biomedicineCode && (
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-xs font-medium text-orange-600 uppercase mb-1">Biomedicine</div>
                        <div className="text-sm font-mono text-orange-700">{bundle.biomedicineCode}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Size: {bundle.bundleSize} | Last modified: {new Date(bundle.lastModified).toLocaleString()}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col space-y-2 ml-4">
                  <button 
                    className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                    onClick={() => setSelectedBundle(bundle)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                  <button className="flex items-center px-3 py-1 text-sm text-green-600 hover:text-green-700">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bundle Viewer Modal */}
      {selectedBundle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  FHIR Bundle: {selectedBundle.id}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowJSON(!showJSON)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {showJSON ? 'Hide JSON' : 'Show JSON'}
                  </button>
                  <button
                    onClick={() => setSelectedBundle(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {showJSON ? (
                <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                  {JSON.stringify(sampleFHIRBundle, null, 2)}
                </pre>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Patient Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><strong>Name:</strong> {selectedBundle.patientName}</p>
                      <p><strong>Patient ID:</strong> {selectedBundle.patientId}</p>
                      <p><strong>Encounter Date:</strong> {selectedBundle.encounterDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Dual Coding</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-blue-200 p-4 rounded-lg">
                        <h5 className="font-semibold text-blue-800 mb-2">Traditional Medicine</h5>
                        <p className="text-sm"><strong>NAMASTE:</strong> {selectedBundle.namasteCode}</p>
                        <p className="text-sm"><strong>ICD-11 TM2:</strong> {selectedBundle.icd11Code}</p>
                      </div>
                      {selectedBundle.biomedicineCode && (
                        <div className="border border-orange-200 p-4 rounded-lg">
                          <h5 className="font-semibold text-orange-800 mb-2">Biomedicine</h5>
                          <p className="text-sm"><strong>ICD-11:</strong> {selectedBundle.biomedicineCode}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-800">1,247</div>
          <div className="text-sm text-blue-600">Total Bundles</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-800">1,089</div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-800">127</div>
          <div className="text-sm text-yellow-600">In Progress</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-800">31</div>
          <div className="text-sm text-purple-600">Draft</div>
        </div>
      </div>
    </div>
  );
}