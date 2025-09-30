import { useState } from 'react';
import { Shield, User, Clock, FileText, Eye, Filter } from 'lucide-react';


interface AuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'warning' | 'error';
}

export default function AuditTrail() {
  const [filter, setFilter] = useState<'all' | 'success' | 'warning' | 'error'>('all');
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  const mockAuditEvents: AuditEvent[] = [
    {
      id: 'audit-001',
      timestamp: '2025-01-08T10:30:15Z',
      userId: 'user-12345',
      userName: 'Dr. Rajesh Kumar',
      action: 'SEARCH_TERMINOLOGY',
      resource: 'NAMASTE Codes',
      details: 'Searched for "Vataj Jwara" - returned 3 results',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success'
    },
    {
      id: 'audit-002',
      timestamp: '2025-01-08T10:25:42Z',
      userId: 'user-12345',
      userName: 'Dr. Rajesh Kumar',
      action: 'CREATE_FHIR_BUNDLE',
      resource: 'Bundle/bundle-001',
      details: 'Created FHIR bundle with dual coding for patient-12345',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success'
    },
    {
      id: 'audit-003',
      timestamp: '2025-01-08T10:20:18Z',
      userId: 'user-67890',
      userName: 'Dr. Priya Sharma',
      action: 'MAPPING_VERIFICATION',
      resource: 'CodeMapping/mapping-156',
      details: 'Verified NAMASTE-ICD11 mapping for SID-002156',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success'
    },
    {
      id: 'audit-004',
      timestamp: '2025-01-08T10:15:33Z',
      userId: 'user-11111',
      userName: 'Dr. Ahmed Ali',
      action: 'LOGIN_ATTEMPT',
      resource: 'Authentication',
      details: 'Failed login attempt - invalid credentials',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      status: 'error'
    },
    {
      id: 'audit-005',
      timestamp: '2025-01-08T10:10:27Z',
      userId: 'user-11111',
      userName: 'Dr. Ahmed Ali',
      action: 'DATA_EXPORT',
      resource: 'Bundle/bundle-003',
      details: 'Exported FHIR bundle - unusual file size detected',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      status: 'warning'
    }
  ];

  const filteredEvents = filter === 'all' 
    ? mockAuditEvents 
    : mockAuditEvents.filter(event => event.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <div className="h-2 w-2 bg-green-500 rounded-full"></div>;
      case 'warning':
        return <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>;
      case 'error':
        return <div className="h-2 w-2 bg-red-500 rounded-full"></div>;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-800 bg-green-100';
      case 'warning':
        return 'text-yellow-800 bg-yellow-100';
      case 'error':
        return 'text-red-800 bg-red-100';
      default:
        return 'text-gray-800 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Audit Trail & Compliance</h2>
          <p className="text-gray-600">Complete audit logs for ISO 22600 compliance and regulatory reporting</p>
        </div>
        <div className="flex items-center space-x-3">
          <Filter className="h-5 w-5 text-gray-400" />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Events</option>
            <option value="success">Success</option>
            <option value="warning">Warnings</option>
            <option value="error">Errors</option>
          </select>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-green-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-green-800">Compliance Status: Active</h3>
            <p className="text-sm text-green-700">
              All audit requirements met for India's 2016 EHR Standards (ISO 22600, FHIR R4)
            </p>
          </div>
        </div>
      </div>

      {/* Audit Events */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Audit Events</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Status Indicator */}
                  <div className="mt-1.5">
                    {getStatusIcon(event.status)}
                  </div>
                  
                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status.toUpperCase()}
                      </span>
                      <span className="text-sm font-mono text-gray-500">{event.id}</span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(event.timestamp).toLocaleString()}
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{event.action}</h4>
                    <p className="text-sm text-gray-600 mb-2">{event.details}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {event.userName}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FileText className="h-4 w-4 mr-2" />
                        {event.resource}
                      </div>
                      <div className="text-gray-500 font-mono">
                        {event.ipAddress}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* View Details */}
                <button 
                  className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                  onClick={() => setSelectedEvent(event)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Audit Event Details
                </h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event ID</label>
                  <p className="text-sm font-mono text-gray-900">{selectedEvent.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timestamp</label>
                  <p className="text-sm text-gray-900">{new Date(selectedEvent.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                  <p className="text-sm text-gray-900">{selectedEvent.userName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                  <p className="text-sm text-gray-900">{selectedEvent.action}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resource</label>
                  <p className="text-sm text-gray-900">{selectedEvent.resource}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                  <p className="text-sm font-mono text-gray-900">{selectedEvent.ipAddress}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{selectedEvent.details}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Agent</label>
                <p className="text-xs font-mono text-gray-600 bg-gray-50 p-2 rounded break-all">{selectedEvent.userAgent}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-800">2,847</div>
          <div className="text-sm text-blue-600">Total Events Today</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-800">2,698</div>
          <div className="text-sm text-green-600">Successful Operations</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-800">127</div>
          <div className="text-sm text-yellow-600">Warnings</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-800">22</div>
          <div className="text-sm text-red-600">Failed Attempts</div>
        </div>
      </div>
    </div>
  );
}