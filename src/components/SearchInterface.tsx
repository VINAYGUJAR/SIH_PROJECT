import { useState, useEffect } from 'react';
import { Search, Copy, CheckCircle, AlertCircle } from 'lucide-react';

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
// before: const [ setSelectedResult] = useState<SearchResult | null>(null);
const [_selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  // Mock data
  const mockResults: SearchResult[] = [
    {
      id: '1',
      namasteCode: 'AYU-001234',
      term: 'Vataj Jwara',
      system: 'ayurveda',
      icd11Code: 'TM2.01.01',
      icd11Term: 'Fever due to wind pattern disorder',
      whoTerminology: 'Vata Predominant Fever Pattern',
      confidence: 95,
    },
    {
      id: '2',
      namasteCode: 'SID-002156',
      term: 'Pitham Karpam',
      system: 'siddha',
      icd11Code: 'TM2.02.15',
      icd11Term: 'Bile pattern related gastric disorder',
      whoTerminology: 'Pitta Digestive Pattern Disturbance',
      confidence: 88,
    },

  {
    id: '4',
    namasteCode: 'HOM-000004',
    term: 'Pitham Karpam',
    system: 'ayurveda',
    icd11Code: 'TM8.55.07',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Digestive Flow Disorder',
    confidence: 96,
  },

  {
    id: '6',
    namasteCode: 'HOM-000006',
    term: 'Vatham Balance',
    system: 'unani',
    icd11Code: 'TM9.07.24',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 92,
  },
  {
    id: '7',
    namasteCode: 'UNA-000007',
    term: 'Pitham Karpam',
    system: 'ayurveda',
    icd11Code: 'TM8.69.37',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 80,
  },
  {
    id: '8',
    namasteCode: 'SID-000008',
    term: 'Pitham Karpam',
    system: 'siddha',
    icd11Code: 'TM3.75.42',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 76,
  },

  {
    id: '10',
    namasteCode: 'HOM-000010',
    term: 'Pitham Karpam',
    system: 'ayurveda',
    icd11Code: 'TM4.41.29',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 74,
  },
  {
    id: '11',
    namasteCode: 'UNA-000011',
    term: 'Vataj Jwara',
    system: 'ayurveda',
    icd11Code: 'TM3.84.21',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 77,
  },
  {
    id: '12',
    namasteCode: 'HOM-000012',
    term: 'Vatham Balance',
    system: 'siddha',
    icd11Code: 'TM2.29.78',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 86,
  },
  {
    id: '13',
    namasteCode: 'AYU-000013',
    term: 'Kapha Imbalance',
    system: 'siddha',
    icd11Code: 'TM2.15.46',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Digestive Flow Disorder',
    confidence: 71,
  },
  {
    id: '14',
    namasteCode: 'SID-000014',
    term: 'Srothas Dysfunction',
    system: 'ayurveda',
    icd11Code: 'TM0.30.80',
    icd11Term: 'Gastrointestinal dysfunction',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 78,
  },
  {
    id: '15',
    namasteCode: 'AYU-000015',
    term: 'Kapha Imbalance',
    system: 'ayurveda',
    icd11Code: 'TM3.41.02',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 71,
  },
  {
    id: '16',
    namasteCode: 'HOM-000016',
    term: 'Srothas Dysfunction',
    system: 'siddha',
    icd11Code: 'TM4.60.75',
    icd11Term: 'Bile pattern related gastric disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 83,
  },
  {
    id: '17',
    namasteCode: 'UNA-000017',
    term: 'Vatham Balance',
    system: 'siddha',
    icd11Code: 'TM5.51.23',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 96,
  },
  {
    id: '18',
    namasteCode: 'AYU-000018',
    term: 'Agni Weakness',
    system: 'siddha',
    icd11Code: 'TM0.55.74',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 93,
  },
  {
    id: '19',
    namasteCode: 'AYU-000019',
    term: 'Vataj Jwara',
    system: 'unani',
    icd11Code: 'TM3.05.30',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 96,
  },

  {
    id: '21',
    namasteCode: 'UNA-000021',
    term: 'Vatham Balance',
    system: 'siddha',
    icd11Code: 'TM2.11.24',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 93,
  },
  {
    id: '22',
    namasteCode: 'UNA-000022',
    term: 'Kapha Imbalance',
    system: 'unani',
    icd11Code: 'TM3.96.63',
    icd11Term: 'Gastrointestinal dysfunction',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 86,
  },
 

  {
    id: '25',
    namasteCode: 'AYU-000025',
    term: 'Vataj Jwara',
    system: 'siddha',
    icd11Code: 'TM8.50.14',
    icd11Term: 'Liver function disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 89,
  },
  {
    id: '26',
    namasteCode: 'SID-000026',
    term: 'Srothas Dysfunction',
    system: 'ayurveda',
    icd11Code: 'TM7.70.91',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Digestive Flow Disorder',
    confidence: 72,
  },
  {
    id: '27',
    namasteCode: 'HOM-000027',
    term: 'Kapha Imbalance',
    system: 'siddha',
    icd11Code: 'TM9.49.32',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 88,
  },
  {
    id: '28',
    namasteCode: 'SID-000028',
    term: 'Pitham Karpam',
    system: 'siddha',
    icd11Code: 'TM4.96.81',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 85,
  },
  {
    id: '29',
    namasteCode: 'HOM-000029',
    term: 'Vatham Balance',
    system: 'siddha',
    icd11Code: 'TM0.59.53',
    icd11Term: 'Gastrointestinal dysfunction',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 82,
  },
  {
    id: '30',
    namasteCode: 'UNA-000030',
    term: 'Vatham Balance',
    system: 'siddha',
    icd11Code: 'TM8.56.86',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 79,
  },
  {
    id: '31',
    namasteCode: 'UNA-000031',
    term: 'Kapha Imbalance',
    system: 'unani',
    icd11Code: 'TM3.41.42',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 87,
  },
  {
    id: '32',
    namasteCode: 'AYU-000032',
    term: 'Pitham Karpam',
    system: 'siddha',
    icd11Code: 'TM0.07.58',
    icd11Term: 'Gastrointestinal dysfunction',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 80,
  },
  {
    id: '33',
    namasteCode: 'HOM-000033',
    term: 'Vatham Balance',
    system: 'siddha',
    icd11Code: 'TM8.28.14',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 98,
  },
  {
    id: '34',
    namasteCode: 'AYU-000034',
    term: 'Pitham Karpam',
    system: 'siddha',
    icd11Code: 'TM6.96.95',
    icd11Term: 'Gastrointestinal dysfunction',
    whoTerminology: 'Digestive Flow Disorder',
    confidence: 96,
  },
  {
    id: '35',
    namasteCode: 'UNA-000035',
    term: 'Srothas Dysfunction',
    system: 'siddha',
    icd11Code: 'TM6.69.22',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 90,
  },
  {
    id: '36',
    namasteCode: 'SID-000036',
    term: 'Pitham Karpam',
    system: 'ayurveda',
    icd11Code: 'TM1.02.77',
    icd11Term: 'Liver function disorder',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 80,
  },
  {
    id: '37',
    namasteCode: 'AYU-000037',
    term: 'Pitham Karpam',
    system: 'siddha',
    icd11Code: 'TM5.07.18',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 95,
  },
  {
    id: '38',
    namasteCode: 'SID-000038',
    term: 'Kapha Imbalance',
    system: 'ayurveda',
    icd11Code: 'TM3.92.20',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 74,
  },
  {
    id: '39',
    namasteCode: 'SID-000039',
    term: 'Srothas Dysfunction',
    system: 'unani',
    icd11Code: 'TM6.77.22',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 90,
  },
  {
    id: '40',
    namasteCode: 'AYU-000040',
    term: 'Kapha Imbalance',
    system: 'unani',
    icd11Code: 'TM6.65.13',
    icd11Term: 'Bile pattern related gastric disorder',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 80,
  },
  {
    id: '41',
    namasteCode: 'SID-000041',
    term: 'Kapha Imbalance',
    system: 'siddha',
    icd11Code: 'TM7.44.64',
    icd11Term: 'Gastrointestinal dysfunction',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 98,
  },
  
  {
    id: '43',
    namasteCode: 'HOM-000043',
    term: 'Pitham Karpam',
    system: 'unani',
    icd11Code: 'TM5.10.00',
    icd11Term: 'Liver function disorder',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 78,
  },
  {
    id: '44',
    namasteCode: 'UNA-000044',
    term: 'Vataj Jwara',
    system: 'siddha',
    icd11Code: 'TM5.69.55',
    icd11Term: 'Liver function disorder',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 86,
  },
  {
    id: '45',
    namasteCode: 'HOM-000045',
    term: 'Pitham Karpam',
    system: 'unani',
    icd11Code: 'TM0.37.42',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 97,
  },
  {
    id: '46',
    namasteCode: 'AYU-000046',
    term: 'Kapha Imbalance',
    system: 'siddha',
    icd11Code: 'TM4.16.57',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 84,
  },
  {
    id: '47',
    namasteCode: 'HOM-000047',
    term: 'Vataj Jwara',
    system: 'unani',
    icd11Code: 'TM5.86.76',
    icd11Term: 'Gastrointestinal dysfunction',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 72,
  },
  {
    id: '48',
    namasteCode: 'SID-000048',
    term: 'Agni Weakness',
    system: 'siddha',
    icd11Code: 'TM6.03.81',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 85,
  },
  {
    id: '49',
    namasteCode: 'UNA-000049',
    term: 'Pitham Karpam',
    system: 'siddha',
    icd11Code: 'TM2.50.82',
    icd11Term: 'Bile pattern related gastric disorder',
    whoTerminology: 'Digestive Flow Disorder',
    confidence: 73,
  },
  {
    id: '50',
    namasteCode: 'HOM-000050',
    term: 'Agni Weakness',
    system: 'siddha',
    icd11Code: 'TM6.49.09',
    icd11Term: 'Liver function disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 91,
  },
  {
    id: '51',
    namasteCode: 'AYU-000051',
    term: 'Vataj Jwara',
    system: 'ayurveda',
    icd11Code: 'TM4.25.80',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 88,
  },
  {
    id: '52',
    namasteCode: 'HOM-000052',
    term: 'Kapha Imbalance',
    system: 'unani',
    icd11Code: 'TM2.13.50',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 96,
  },
  {
    id: '53',
    namasteCode: 'SID-000053',
    term: 'Agni Weakness',
    system: 'ayurveda',
    icd11Code: 'TM1.22.53',
    icd11Term: 'Gastrointestinal dysfunction',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 92,
  },
  {
    id: '54',
    namasteCode: 'HOM-000054',
    term: 'Agni Weakness',
    system: 'siddha',
    icd11Code: 'TM6.08.67',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Digestive Flow Disorder',
    confidence: 91,
  },
  {
    id: '55',
    namasteCode: 'SID-000055',
    term: 'Kapha Imbalance',
    system: 'ayurveda',
    icd11Code: 'TM2.18.71',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 92,
  },

  {
    id: '57',
    namasteCode: 'UNA-000057',
    term: 'Pitham Karpam',
    system: 'unani',
    icd11Code: 'TM7.49.28',
    icd11Term: 'Bile pattern related gastric disorder',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 80,
  },
  {
    id: '58',
    namasteCode: 'HOM-000058',
    term: 'Pitham Karpam',
    system: 'ayurveda',
    icd11Code: 'TM2.39.31',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Digestive Flow Disorder',
    confidence: 91,
  },
  {
    id: '59',
    namasteCode: 'SID-000059',
    term: 'Vatham Balance',
    system: 'unani',
    icd11Code: 'TM9.78.13',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 84,
  },
  {
    id: '60',
    namasteCode: 'SID-000060',
    term: 'Srothas Dysfunction',
    system: 'ayurveda',
    icd11Code: 'TM2.05.76',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 76,
  },


  {
    id: '63',
    namasteCode: 'UNA-000063',
    term: 'Vatham Balance',
    system: 'ayurveda',
    icd11Code: 'TM6.81.45',
    icd11Term: 'Bile pattern related gastric disorder',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 99,
  },
 
  {
    id: '66',
    namasteCode: 'HOM-000066',
    term: 'Agni Weakness',
    system: 'siddha',
    icd11Code: 'TM2.88.90',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Digestive Flow Disorder',
    confidence: 96,
  },
  {
    id: '67',
    namasteCode: 'UNA-000067',
    term: 'Agni Weakness',
    system: 'unani',
    icd11Code: 'TM1.22.95',
    icd11Term: 'Bile pattern related gastric disorder',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 88,
  },
  {
    id: '68',
    namasteCode: 'SID-000068',
    term: 'Srothas Dysfunction',
    system: 'unani',
    icd11Code: 'TM0.92.83',
    icd11Term: 'Bile pattern related gastric disorder',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 78,
  },
  {
    id: '69',
    namasteCode: 'SID-000069',
    term: 'Srothas Dysfunction',
    system: 'siddha',
    icd11Code: 'TM3.73.35',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 83,
  },
  {
    id: '70',
    namasteCode: 'HOM-000070',
    term: 'Kapha Imbalance',
    system: 'siddha',
    icd11Code: 'TM5.77.37',
    icd11Term: 'Liver function disorder',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 89,
  },
  {
    id: '71',
    namasteCode: 'UNA-000071',
    term: 'Vatham Balance',
    system: 'siddha',
    icd11Code: 'TM4.04.10',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 95,
  },
  {
    id: '72',
    namasteCode: 'UNA-000072',
    term: 'Vatham Balance',
    system: 'unani',
    icd11Code: 'TM7.99.35',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Digestive Flow Disorder',
    confidence: 75,
  },
 
  {
    id: '75',
    namasteCode: 'SID-000075',
    term: 'Kapha Imbalance',
    system: 'siddha',
    icd11Code: 'TM9.72.14',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 98,
  },
  {
    id: '76',
    namasteCode: 'UNA-000076',
    term: 'Srothas Dysfunction',
    system: 'ayurveda',
    icd11Code: 'TM5.41.15',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Vata Predominant Fever Pattern',
    confidence: 73,
  },
  {
    id: '77',
    namasteCode: 'SID-000077',
    term: 'Vatham Balance',
    system: 'ayurveda',
    icd11Code: 'TM5.34.68',
    icd11Term: 'Bile pattern related gastric disorder',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 75,
  },
  {
    id: '78',
    namasteCode: 'UNA-000078',
    term: 'Vataj Jwara',
    system: 'siddha',
    icd11Code: 'TM8.52.81',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 77,
  },
  {
    id: '79',
    namasteCode: 'AYU-000079',
    term: 'Vataj Jwara',
    system: 'ayurveda',
    icd11Code: 'TM3.10.00',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 98,
  },
  {
    id: '80',
    namasteCode: 'SID-000080',
    term: 'Pitham Karpam',
    system: 'unani',
    icd11Code: 'TM3.74.14',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 89,
  },
  
  {
    id: '82',
    namasteCode: 'UNA-000082',
    term: 'Vatham Balance',
    system: 'unani',
    icd11Code: 'TM0.01.36',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 81,
  },
  {
    id: '83',
    namasteCode: 'UNA-000083',
    term: 'Srothas Dysfunction',
    system: 'ayurveda',
    icd11Code: 'TM8.27.95',
    icd11Term: 'Gastrointestinal dysfunction',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 93,
  },
  {
    id: '84',
    namasteCode: 'SID-000084',
    term: 'Vataj Jwara',
    system: 'unani',
    icd11Code: 'TM4.08.89',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 89,
  },
  {
    id: '85',
    namasteCode: 'AYU-000085',
    term: 'Vataj Jwara',
    system: 'ayurveda',
    icd11Code: 'TM4.71.68',
    icd11Term: 'Liver function disorder',
    whoTerminology: 'Kapha Accumulation Issue',
    confidence: 70,
  },
  {
    id: '86',
    namasteCode: 'AYU-000086',
    term: 'Kapha Imbalance',
    system: 'unani',
    icd11Code: 'TM8.22.56',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 95,
  },
  {
    id: '87',
    namasteCode: 'HOM-000087',
    term: 'Vatham Balance',
    system: 'ayurveda',
    icd11Code: 'TM0.08.55',
    icd11Term: 'Bile pattern related gastric disorder',
    whoTerminology: 'Digestive Flow Disorder',
    confidence: 83,
  },

  {
    id: '89',
    namasteCode: 'UNA-000089',
    term: 'Vatham Balance',
    system: 'siddha',
    icd11Code: 'TM1.67.31',
    icd11Term: 'Digestive enzyme imbalance',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 99,
  },
 

  {
    id: '95',
    namasteCode: 'HOM-000095',
    term: 'Vatham Balance',
    system: 'unani',
    icd11Code: 'TM1.05.87',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 85,
  },
  {
    id: '96',
    namasteCode: 'SID-000096',
    term: 'Vataj Jwara',
    system: 'ayurveda',
    icd11Code: 'TM1.63.97',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 87,
  },
  {
    id: '97',
    namasteCode: 'UNA-000097',
    term: 'Vatham Balance',
    system: 'siddha',
    icd11Code: 'TM0.99.78',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Metabolic Pattern Disturbance',
    confidence: 86,
  },
  {
    id: '98',
    namasteCode: 'HOM-000098',
    term: 'Pitham Karpam',
    system: 'siddha',
    icd11Code: 'TM4.83.65',
    icd11Term: 'Liver function disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 82,
  },
  {
    id: '99',
    namasteCode: 'AYU-000099',
    term: 'Pitham Karpam',
    system: 'siddha',
    icd11Code: 'TM0.17.94',
    icd11Term: 'Fever due to wind pattern disorder',
    whoTerminology: 'Pitta Digestive Pattern Disturbance',
    confidence: 85,
  },
  {
    id: '100',
    namasteCode: 'AYU-000100',
    term: 'Pitham Karpam',
    system: 'unani',
    icd11Code: 'TM9.13.19',
    icd11Term: 'Metabolic disorder',
    whoTerminology: 'Vata Metabolic Imbalance',
    confidence: 91,
  },





    
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
      }, 500);

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
      {/* Header */}
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
          {searchResults.map(result => (
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
    </div>
  );
}
