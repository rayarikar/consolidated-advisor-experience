import { IllustrationResult, IllustrationRequest, YearlyProjection, IllustrationSummary, IllustrationAssumptions } from '../types';

// Mock calculation function for life insurance illustrations
export const calculateIllustration = (request: IllustrationRequest): YearlyProjection[] => {
  const projections: YearlyProjection[] = [];
  const { clientInfo, coverageAmount, premiumAmount, productType, premiumMode, assumptions } = request;
  
  // Basic calculation parameters
  const annualPremium = premiumAmount || 0;
  const startAge = clientInfo.age;
  const endAge = request.illustrationEndAge || 100;
  const currentRate = assumptions.currentInterestRate / 100;
  const guaranteedRate = assumptions.guaranteedInterestRate / 100;
  
  // Product-specific factors
  const expenseRatio = productType === 'Term Life' ? 0.15 : 0.25;
  const cashValueStart = productType === 'Term Life' ? 0 : Math.max(0, annualPremium * 0.3);
  const mortalityFactor = clientInfo.smokerStatus === 'Smoker' ? 1.5 : 1.0;
  
  let cumulativePremiums = 0;
  let currentCashValue = 0;
  let guaranteedCashValue = 0;
  
  for (let year = 1; year <= (endAge - startAge); year++) {
    const age = startAge + year - 1;
    const yearlyPremium = year <= 20 ? annualPremium : 0; // Assume 20-pay for permanent insurance
    
    cumulativePremiums += yearlyPremium;
    
    // Mortality cost calculation (simplified)
    const mortalityCost = (coverageAmount * mortalityFactor * Math.pow(1.05, age - startAge)) / 1000;
    const expenseCost = yearlyPremium * expenseRatio;
    
    // Cash value calculations for permanent insurance
    if (productType !== 'Term Life') {
      const netPremium = Math.max(0, yearlyPremium - mortalityCost - expenseCost);
      
      // Current assumptions
      currentCashValue = (currentCashValue + netPremium) * (1 + currentRate);
      
      // Guaranteed assumptions
      guaranteedCashValue = (guaranteedCashValue + netPremium * 0.8) * (1 + guaranteedRate);
      
      // Apply surrender charges for early years
      const surrenderCharge = year <= 10 ? currentCashValue * (0.10 - year * 0.01) : 0;
      currentCashValue = Math.max(0, currentCashValue - surrenderCharge);
    }
    
    // Death benefit calculation
    let deathBenefit = coverageAmount;
    if (productType === 'Universal Life' || productType === 'Variable Universal Life') {
      deathBenefit = Math.max(coverageAmount, currentCashValue * 1.05);
    }
    
    projections.push({
      policyYear: year,
      age: age,
      premiumPaid: yearlyPremium,
      cumulativePremiums: cumulativePremiums,
      deathBenefit: Math.round(deathBenefit),
      cashValue: {
        guaranteed: Math.round(Math.max(0, guaranteedCashValue)),
        current: Math.round(Math.max(0, currentCashValue)),
      },
      netAmount: Math.round(deathBenefit - currentCashValue),
      endOfYearValues: {
        surrenderValue: Math.round(Math.max(0, currentCashValue * 0.95)),
        paidUpValue: Math.round(Math.max(0, currentCashValue * 1.2)),
      },
    });
  }
  
  return projections;
};

// Calculate illustration summary
export const calculateSummary = (projections: YearlyProjection[], request: IllustrationRequest): IllustrationSummary => {
  const totalPremiums = projections.reduce((sum, p) => sum + p.premiumPaid, 0);
  const cashAt65 = projections.find(p => p.age === 65)?.cashValue.current || 0;
  const cashAt100 = projections[projections.length - 1]?.cashValue.current || 0;
  const deathAt65 = projections.find(p => p.age === 65)?.deathBenefit || 0;
  
  // Simple IRR calculation (approximation)
  const irr = cashAt65 > totalPremiums ? 
    Math.pow(cashAt65 / totalPremiums, 1 / (65 - request.clientInfo.age)) - 1 : 0;
  
  // Break-even year (when cash value exceeds total premiums)
  const breakEven = projections.find(p => p.cashValue.current > p.cumulativePremiums);
  
  return {
    totalPremiumsPaid: Math.round(totalPremiums),
    cashValueAt65: Math.round(cashAt65),
    cashValueAt100: Math.round(cashAt100),
    deathBenefitAt65: Math.round(deathAt65),
    internalRateOfReturn: Math.round(irr * 10000) / 100, // As percentage
    breakEvenYear: breakEven?.policyYear || 0,
    maximumOutlay: Math.round(totalPremiums),
  };
};

// Sample saved illustrations
export const mockSavedIllustrations: IllustrationResult[] = [
  {
    id: 'ill-001',
    request: {
      id: 'req-001',
      clientInfo: {
        name: 'Robert Johnson',
        age: 35,
        gender: 'Male',
        smokerStatus: 'Non-Smoker',
        healthClass: 'Preferred',
        state: 'NY',
      },
      productId: 'WL-001',
      productName: 'PruLife Protector',
      productType: 'Whole Life',
      coverageAmount: 500000,
      premiumType: 'Target Premium',
      premiumAmount: 8500,
      premiumMode: 'Annual',
      paymentDuration: 'Life',
      illustrationEndAge: 100,
      assumptions: {
        currentInterestRate: 6.5,
        guaranteedInterestRate: 4.0,
        dividendScale: 'Current',
        expenseCharges: 2.5,
        mortalityTable: '2017 CSO',
      },
      options: {
        showGuaranteed: true,
        showCurrent: true,
        includeDividends: true,
        includeLoans: false,
      },
    },
    projections: [], // Will be calculated
    summary: {
      totalPremiumsPaid: 170000,
      cashValueAt65: 285000,
      cashValueAt100: 450000,
      deathBenefitAt65: 500000,
      internalRateOfReturn: 4.2,
      breakEvenYear: 15,
      maximumOutlay: 170000,
    },
    createdDate: '2024-06-15',
    lastModified: '2024-06-15',
    createdBy: 'jadams',
    status: 'Finalized',
    clientApproved: true,
    complianceDisclosures: [
      'This illustration is based on current assumptions and is not guaranteed.',
      'Actual results may vary based on company experience.',
      'Dividends are not guaranteed and may be higher or lower than illustrated.',
    ],
  },
  {
    id: 'ill-002',
    request: {
      id: 'req-002',
      clientInfo: {
        name: 'Sarah Williams',
        age: 28,
        gender: 'Female',
        smokerStatus: 'Non-Smoker',
        healthClass: 'Super Preferred',
        state: 'CA',
      },
      productId: 'TL-001',
      productName: 'PruTerm 30',
      productType: 'Term Life',
      coverageAmount: 750000,
      premiumType: 'Target Premium',
      premiumAmount: 450,
      premiumMode: 'Annual',
      paymentDuration: '20 Years',
      illustrationEndAge: 58,
      assumptions: {
        currentInterestRate: 0,
        guaranteedInterestRate: 0,
        dividendScale: 'Zero',
        expenseCharges: 1.0,
        mortalityTable: '2017 CSO',
      },
      options: {
        showGuaranteed: true,
        showCurrent: false,
        includeDividends: false,
        includeLoans: false,
      },
    },
    projections: [],
    summary: {
      totalPremiumsPaid: 13500,
      cashValueAt65: 0,
      cashValueAt100: 0,
      deathBenefitAt65: 0,
      internalRateOfReturn: 0,
      breakEvenYear: 0,
      maximumOutlay: 13500,
    },
    createdDate: '2024-06-10',
    lastModified: '2024-06-12',
    createdBy: 'jadams',
    status: 'Presented',
    clientApproved: false,
    complianceDisclosures: [
      'This is a term life insurance policy with no cash value.',
      'Premiums are guaranteed level for the initial term period.',
      'Policy will expire at the end of the term unless renewed.',
    ],
  },
  {
    id: 'ill-003',
    request: {
      id: 'req-003',
      clientInfo: {
        name: 'Michael Chen',
        age: 42,
        gender: 'Male',
        smokerStatus: 'Non-Smoker',
        healthClass: 'Standard Plus',
        state: 'TX',
      },
      productId: 'UL-001',
      productName: 'PruLife FlexUL',
      productType: 'Universal Life',
      coverageAmount: 1000000,
      premiumType: 'Target Premium',
      premiumAmount: 12000,
      premiumMode: 'Annual',
      paymentDuration: 'To Age 65',
      illustrationEndAge: 100,
      assumptions: {
        currentInterestRate: 5.5,
        guaranteedInterestRate: 3.5,
        dividendScale: 'Zero',
        expenseCharges: 3.0,
        mortalityTable: '2017 CSO',
      },
      options: {
        showGuaranteed: true,
        showCurrent: true,
        includeDividends: false,
        includeLoans: false,
      },
    },
    projections: [],
    summary: {
      totalPremiumsPaid: 276000,
      cashValueAt65: 425000,
      cashValueAt100: 650000,
      deathBenefitAt65: 1000000,
      internalRateOfReturn: 3.8,
      breakEvenYear: 18,
      maximumOutlay: 276000,
    },
    createdDate: '2024-06-01',
    lastModified: '2024-06-01',
    createdBy: 'jadams',
    status: 'Draft',
    complianceDisclosures: [
      'Universal Life policy values are not guaranteed beyond the guaranteed minimum.',
      'Policy may lapse if insufficient cash value to pay monthly deductions.',
      'Interest rates shown are current and subject to change.',
    ],
  },
];

// Initialize projections for mock data
mockSavedIllustrations.forEach(illustration => {
  illustration.projections = calculateIllustration(illustration.request);
  illustration.summary = calculateSummary(illustration.projections, illustration.request);
});

// Product options for illustration wizard
export const availableProducts = [
  {
    id: 'TL-001',
    name: 'PruTerm 10',
    type: 'Term Life',
    description: '10-year level term life insurance',
    minCoverage: 50000,
    maxCoverage: 10000000,
  },
  {
    id: 'TL-002',
    name: 'PruTerm 20',
    type: 'Term Life',
    description: '20-year level term life insurance',
    minCoverage: 50000,
    maxCoverage: 10000000,
  },
  {
    id: 'TL-003',
    name: 'PruTerm 30',
    type: 'Term Life',
    description: '30-year level term life insurance',
    minCoverage: 50000,
    maxCoverage: 10000000,
  },
  {
    id: 'WL-001',
    name: 'PruLife Protector',
    type: 'Whole Life',
    description: 'Participating whole life with dividends',
    minCoverage: 25000,
    maxCoverage: 5000000,
  },
  {
    id: 'UL-001',
    name: 'PruLife FlexUL',
    type: 'Universal Life',
    description: 'Flexible universal life insurance',
    minCoverage: 50000,
    maxCoverage: 15000000,
  },
  {
    id: 'VUL-001',
    name: 'PruLife Variable UL',
    type: 'Variable Universal Life',
    description: 'Variable universal life with investment options',
    minCoverage: 100000,
    maxCoverage: 20000000,
  },
  {
    id: 'IUL-001',
    name: 'PruLife Indexed UL',
    type: 'Indexed Universal Life',
    description: 'Indexed universal life linked to market performance',
    minCoverage: 100000,
    maxCoverage: 15000000,
  },
];

// Default illustration assumptions
export const defaultAssumptions: IllustrationAssumptions = {
  currentInterestRate: 6.0,
  guaranteedInterestRate: 4.0,
  dividendScale: 'Current',
  expenseCharges: 2.5,
  mortalityTable: '2017 CSO',
};

// US States for client information
export const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];