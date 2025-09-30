import { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import Fuse from "fuse.js";

interface MappingEntry {
  id: string;
  namasteCode: string;
  namasteTerm: string;
  system: string;
  icd11Code: string;
  icd11Term: string;
  biomedicineCode?: string;
  biomedicineTerm?: string;
  mappingStatus: "verified" | "pending" | "conflict";
  confidence: number;
  lastUpdated: string;
}

export default function CodeMapping() {
  const [mappings, setMappings] = useState<MappingEntry[]>([]);
  const [filter, setFilter] = useState<"all" | "verified" | "pending" | "conflict">("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // 🔹 Load JSON from public folder
  useEffect(() => {
    fetch("./mock_mappings.json") // ✅ fetch from public root
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setMappings(data))
      .catch((err) => console.error("❌ Failed to load mappings:", err));
  }, []);

  // 🔹 Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // 🔎 Fuzzy Search
  const fuse = new Fuse(mappings, {
    keys: [
      "namasteCode",
      "namasteTerm",
      "icd11Code",
      "icd11Term",
      "biomedicineCode",
      "biomedicineTerm",
    ],
    threshold: 0.35,
    ignoreLocation: true,
  });

  const searchResults = debouncedSearch
    ? fuse.search(debouncedSearch).map((r) => r.item)
    : mappings;

  // 🔹 Apply filter
  const filteredMappings =
    filter === "all"
      ? searchResults
      : searchResults.filter((m) => m.mappingStatus === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <RefreshCw className="h-5 w-5 text-yellow-500" />;
      case "conflict":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "conflict":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Code Mapping Management</h2>
        <p className="text-gray-600">
          Manage NAMASTE to ICD-11 TM2 and Biomedicine code mappings
        </p>
      </div>

      {/* 🔎 Search Box */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search by code or term..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: "all", label: "All Mappings" },
          { key: "verified", label: "Verified" },
          { key: "pending", label: "Pending Review" },
          { key: "conflict", label: "Conflicts" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              filter === tab.key
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mappings List */}
      <div className="space-y-4">
        {filteredMappings.length === 0 ? (
          <p className="text-gray-500">No matching mappings found.</p>
        ) : (
          filteredMappings.map((mapping) => (
            <div
              key={mapping.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(mapping.mappingStatus)}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      mapping.mappingStatus
                    )}`}
                  >
                    {mapping.mappingStatus.charAt(0).toUpperCase() +
                      mapping.mappingStatus.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Updated: {mapping.lastUpdated}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Confidence: {mapping.confidence}%
                </div>
              </div>

              {/* Mapping Details */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700">NAMASTE</h4>
                  <p className="text-gray-900">{mapping.namasteTerm}</p>
                  <p className="text-gray-500">{mapping.namasteCode}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">ICD-11</h4>
                  <p className="text-gray-900">{mapping.icd11Term}</p>
                  <p className="text-gray-500">{mapping.icd11Code}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Biomedicine</h4>
                  <p className="text-gray-900">{mapping.biomedicineTerm || "-"}</p>
                  <p className="text-gray-500">{mapping.biomedicineCode || "-"}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
