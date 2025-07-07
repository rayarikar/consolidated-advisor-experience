import { mockCases, mockPolicies, mockCommissions, mockNotifications } from './mockData';
import { mockProducts, mockRiders, mockForms } from './marketingData';

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: 'Client' | 'Policy' | 'Case' | 'Product' | 'Form' | 'Commission' | 'Notification' | 'Documentation';
  type: string;
  status?: string;
  date?: string;
  metadata?: Record<string, any>;
  url?: string;
  relevanceScore?: number;
}

// Mock clients data
const mockClients: SearchResult[] = [
  {
    id: 'client-1',
    title: 'Robert Johnson',
    subtitle: 'Premium Client',
    description: '3 active policies, $2.5M total coverage. Last contact: 2 weeks ago',
    category: 'Client',
    type: 'Individual',
    status: 'Active',
    date: '2024-01-15',
    metadata: {
      policyCount: 3,
      totalCoverage: 2500000,
      clientSince: '2018-03-12',
      riskRating: 'Standard',
      lastContact: '2024-06-20',
    },
  },
  {
    id: 'client-2',
    title: 'Sarah Williams',
    subtitle: 'New Client',
    description: '1 term life policy, recently approved application',
    category: 'Client',
    type: 'Individual',
    status: 'Active',
    date: '2024-06-01',
    metadata: {
      policyCount: 1,
      totalCoverage: 500000,
      clientSince: '2024-06-01',
      riskRating: 'Preferred',
      lastContact: '2024-07-01',
    },
  },
  {
    id: 'client-3',
    title: 'Michael Chen',
    subtitle: 'High Net Worth',
    description: '2 universal life policies, estate planning client',
    category: 'Client',
    type: 'Individual',
    status: 'Active',
    date: '2020-09-15',
    metadata: {
      policyCount: 2,
      totalCoverage: 5000000,
      clientSince: '2020-09-15',
      riskRating: 'Standard Plus',
      lastContact: '2024-06-15',
    },
  },
  {
    id: 'client-4',
    title: 'Jennifer Davis',
    subtitle: 'Family Client',
    description: 'Joint policies with spouse, child riders included',
    category: 'Client',
    type: 'Family',
    status: 'Active',
    date: '2019-11-30',
    metadata: {
      policyCount: 2,
      totalCoverage: 1200000,
      clientSince: '2019-11-30',
      riskRating: 'Standard',
      lastContact: '2024-05-10',
    },
  },
];

// Mock documentation data
const mockDocumentation: SearchResult[] = [
  {
    id: 'doc-1',
    title: 'Underwriting Guidelines 2024',
    subtitle: 'Policy Manual',
    description: 'Complete underwriting guidelines for all life insurance products',
    category: 'Documentation',
    type: 'Manual',
    date: '2024-01-01',
    metadata: {
      fileType: 'PDF',
      pages: 156,
      lastUpdated: '2024-01-01',
      version: '2024.1',
    },
  },
  {
    id: 'doc-2',
    title: 'Sales Training Materials',
    subtitle: 'Training Resources',
    description: 'Comprehensive sales training for life insurance products',
    category: 'Documentation',
    type: 'Training',
    date: '2024-02-15',
    metadata: {
      fileType: 'Video + PDF',
      duration: '3 hours',
      lastUpdated: '2024-02-15',
      modules: 8,
    },
  },
  {
    id: 'doc-3',
    title: 'Product Comparison Guide',
    subtitle: 'Reference Material',
    description: 'Side-by-side comparison of all insurance products',
    category: 'Documentation',
    type: 'Reference',
    date: '2024-03-01',
    metadata: {
      fileType: 'Interactive PDF',
      products: 15,
      lastUpdated: '2024-03-01',
      interactive: true,
    },
  },
  {
    id: 'doc-4',
    title: 'Compliance Checklist',
    subtitle: 'Regulatory Guide',
    description: 'State-by-state compliance requirements and procedures',
    category: 'Documentation',
    type: 'Compliance',
    date: '2024-04-01',
    metadata: {
      fileType: 'PDF',
      states: 50,
      lastUpdated: '2024-04-01',
      regulations: 'Current',
    },
  },
];

// Convert existing data to search results format
const convertCasesToSearchResults = (): SearchResult[] => {
  return mockCases.map(c => ({
    id: `case-${c.id}`,
    title: `Case ${c.caseNumber}`,
    subtitle: c.clientName,
    description: `${c.productType} - $${c.coverageAmount.toLocaleString()} coverage`,
    category: 'Case' as const,
    type: c.productType,
    status: c.status,
    date: c.submissionDate,
    metadata: {
      coverageAmount: c.coverageAmount,
      annualPremium: c.annualPremium,
      underwriter: c.underwriter,
      clientEmail: c.clientEmail,
      clientPhone: c.clientPhone,
    },
  }));
};

const convertPoliciesToSearchResults = (): SearchResult[] => {
  return mockPolicies.map(p => ({
    id: `policy-${p.id}`,
    title: `Policy ${p.policyNumber}`,
    subtitle: p.clientName,
    description: `${p.productType} - $${p.coverageAmount.toLocaleString()} coverage, ${p.status}`,
    category: 'Policy' as const,
    type: p.productType,
    status: p.status,
    date: p.issueDate,
    metadata: {
      coverageAmount: p.coverageAmount,
      annualPremium: p.annualPremium,
      cashValue: p.cashValue,
      beneficiaries: p.beneficiaries,
    },
  }));
};

const convertProductsToSearchResults = (): SearchResult[] => {
  return mockProducts.map(p => ({
    id: `product-${p.id}`,
    title: p.name,
    subtitle: p.productType,
    description: p.description,
    category: 'Product' as const,
    type: p.productType,
    date: '2024-01-01',
    metadata: {
      targetMarket: p.targetMarket,
      ageRanges: p.ageRanges,
      coverageAmounts: p.coverageAmounts,
      availableRiders: p.availableRiders,
      states: p.states,
    },
  }));
};

const convertRidersToSearchResults = (): SearchResult[] => {
  return mockRiders.map(r => ({
    id: `rider-${r.id}`,
    title: r.name,
    subtitle: `${r.type} Rider`,
    description: r.description,
    category: 'Product' as const,
    type: 'Rider',
    date: '2024-01-01',
    metadata: {
      cost: r.cost,
      compatibleProducts: r.compatibleProducts,
      keyBenefits: r.keyBenefits,
      ageRestrictions: r.ageRestrictions,
    },
  }));
};

const convertFormsToSearchResults = (): SearchResult[] => {
  return mockForms.map(f => ({
    id: `form-${f.id}`,
    title: f.name,
    subtitle: `Form ${f.formNumber}`,
    description: f.description,
    category: 'Form' as const,
    type: f.category,
    date: f.lastUpdated,
    metadata: {
      category: f.category,
      submissionMethod: f.submissionMethod,
      processingTime: f.processingTime,
      requirements: f.requirements,
    },
  }));
};

const convertCommissionsToSearchResults = (): SearchResult[] => {
  return mockCommissions.map(c => ({
    id: `commission-${c.id}`,
    title: `Commission - ${c.clientName}`,
    subtitle: c.commissionType,
    description: `$${c.amount.toLocaleString()} - Policy ${c.policyNumber}`,
    category: 'Commission' as const,
    type: c.commissionType,
    status: c.paymentStatus,
    date: c.paymentDate,
    metadata: {
      amount: c.amount,
      percentage: c.percentage,
      productType: c.productType,
      quarter: c.quarter,
      year: c.year,
    },
  }));
};

const convertNotificationsToSearchResults = (): SearchResult[] => {
  return mockNotifications.map(n => ({
    id: `notification-${n.id}`,
    title: n.title,
    subtitle: n.category,
    description: n.message,
    category: 'Notification' as const,
    type: n.type,
    status: n.isRead ? 'Read' : 'Unread',
    date: n.createdDate,
    metadata: {
      priority: n.priority,
      isActionable: n.isActionable,
      clientName: n.clientName,
      relatedNumber: n.relatedNumber,
      dueDate: n.dueDate,
    },
  }));
};

// Combine all search data
export const getAllSearchResults = (): SearchResult[] => {
  return [
    ...mockClients,
    ...mockDocumentation,
    ...convertCasesToSearchResults(),
    ...convertPoliciesToSearchResults(),
    ...convertProductsToSearchResults(),
    ...convertRidersToSearchResults(),
    ...convertFormsToSearchResults(),
    ...convertCommissionsToSearchResults(),
    ...convertNotificationsToSearchResults(),
  ];
};

// Search function with fuzzy matching
export const searchResults = (query: string): SearchResult[] => {
  if (!query.trim()) return [];

  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  const allResults = getAllSearchResults();

  return allResults
    .map(result => {
      let score = 0;
      const searchableText = [
        result.title,
        result.subtitle,
        result.description,
        result.category,
        result.type,
        result.status,
        JSON.stringify(result.metadata),
      ].join(' ').toLowerCase();

      // Calculate relevance score
      searchTerms.forEach(term => {
        if (result.title.toLowerCase().includes(term)) score += 10;
        if (result.subtitle?.toLowerCase().includes(term)) score += 8;
        if (result.description.toLowerCase().includes(term)) score += 5;
        if (result.category.toLowerCase().includes(term)) score += 3;
        if (result.type.toLowerCase().includes(term)) score += 3;
        if (searchableText.includes(term)) score += 1;
      });

      return { ...result, relevanceScore: score };
    })
    .filter(result => result.relevanceScore > 0)
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, 50); // Limit to top 50 results
};