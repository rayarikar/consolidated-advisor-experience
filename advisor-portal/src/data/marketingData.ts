import { InsuranceProduct, Rider, InsuranceForm } from '../types';

export const mockProducts: InsuranceProduct[] = [
  {
    id: '1',
    name: 'PruLife Term Select',
    productType: 'Term Life',
    category: 'Individual',
    description: 'Affordable term life insurance with competitive rates and flexible terms. Perfect for young families and budget-conscious clients.',
    keyFeatures: [
      '10, 15, 20, 30-year level premiums',
      'Conversion options without medical exam',
      'Waiver of premium rider available',
      'Competitive rates for all risk classes'
    ],
    targetMarket: ['Young families', 'First-time buyers', 'Budget-conscious clients'],
    ageRanges: { min: 18, max: 75 },
    coverageAmounts: { min: 100000, max: 10000000 },
    premiumStructure: 'Level',
    underwritingClass: 'Full Underwriting',
    availableRiders: ['Waiver of Premium', 'Accidental Death', 'Term Conversion'],
    states: ['NY', 'CA', 'TX', 'FL', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'],
    competitiveAdvantages: [
      'Best-in-class conversion options',
      'No medical exam up to $500K for qualified applicants',
      'Simplified underwriting process'
    ],
    illustration: 'https://forms.prudential.com/illustrations/term-select',
    rateBook: 'https://forms.prudential.com/rates/term-select-2024'
  },
  {
    id: '2',
    name: 'PruLife Whole Life Pro',
    productType: 'Whole Life',
    category: 'Individual',
    description: 'Traditional whole life insurance with guaranteed cash value growth and lifetime protection. Build wealth while protecting your family.',
    keyFeatures: [
      'Guaranteed death benefit',
      'Guaranteed cash value growth',
      'Dividend potential',
      'Policy loans available',
      'Paid-up additions rider'
    ],
    targetMarket: ['High net worth individuals', 'Estate planning clients', 'Conservative investors'],
    ageRanges: { min: 0, max: 85 },
    coverageAmounts: { min: 50000, max: 25000000 },
    premiumStructure: 'Level',
    underwritingClass: 'Full Underwriting',
    availableRiders: ['Paid-up Additions', 'Waiver of Premium', 'Accidental Death', 'Child Term'],
    states: ['NY', 'CA', 'TX', 'FL', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA'],
    competitiveAdvantages: [
      'Strong dividend history',
      'Flexible premium payment options',
      'Excellent cash value growth'
    ],
    illustration: 'https://forms.prudential.com/illustrations/whole-life-pro',
    rateBook: 'https://forms.prudential.com/rates/whole-life-pro-2024'
  },
  {
    id: '3',
    name: 'PruLife Universal Advantage',
    productType: 'Universal Life',
    category: 'Individual',
    description: 'Flexible universal life insurance with adjustable premiums and death benefits. Ideal for clients seeking investment control.',
    keyFeatures: [
      'Flexible premium payments',
      'Adjustable death benefit',
      'Multiple investment options',
      'No-lapse guarantee available',
      'Partial withdrawals allowed'
    ],
    targetMarket: ['Business owners', 'High earners', 'Sophisticated investors'],
    ageRanges: { min: 18, max: 80 },
    coverageAmounts: { min: 100000, max: 50000000 },
    premiumStructure: 'Flexible',
    underwritingClass: 'Full Underwriting',
    availableRiders: ['No-Lapse Guarantee', 'Waiver of Premium', 'Long-Term Care', 'Chronic Illness'],
    states: ['NY', 'CA', 'TX', 'FL', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'AZ'],
    competitiveAdvantages: [
      'Industry-leading investment options',
      'Competitive cost of insurance',
      'Flexible design features'
    ],
    illustration: 'https://forms.prudential.com/illustrations/universal-advantage',
    rateBook: 'https://forms.prudential.com/rates/universal-advantage-2024'
  },
  {
    id: '4',
    name: 'PruLife Variable Universal Elite',
    productType: 'Variable Universal Life',
    category: 'Individual',
    description: 'Variable universal life with access to professionally managed investment portfolios. Maximum growth potential with insurance protection.',
    keyFeatures: [
      'Professional portfolio management',
      'Variable investment returns',
      'Tax-deferred growth',
      'Flexible premiums and benefits',
      'Death benefit guarantees available'
    ],
    targetMarket: ['High net worth clients', 'Investment-oriented buyers', 'Estate planning'],
    ageRanges: { min: 18, max: 75 },
    coverageAmounts: { min: 250000, max: 100000000 },
    premiumStructure: 'Flexible',
    underwritingClass: 'Full Underwriting',
    availableRiders: ['No-Lapse Guarantee', 'Waiver of Premium', 'Long-Term Care', 'Overlay'],
    states: ['NY', 'CA', 'TX', 'FL', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'AZ', 'CO'],
    competitiveAdvantages: [
      'Award-winning investment options',
      'Low internal fees',
      'Comprehensive guarantee options'
    ],
    illustration: 'https://forms.prudential.com/illustrations/variable-universal-elite',
    rateBook: 'https://forms.prudential.com/rates/variable-universal-elite-2024'
  },
  {
    id: '5',
    name: 'PruLife Index Advantage',
    productType: 'Indexed Universal Life',
    category: 'Individual',
    description: 'Indexed universal life insurance linked to market performance with downside protection. Growth potential without market risk.',
    keyFeatures: [
      'Market upside participation',
      'Downside protection (0% floor)',
      'Multiple index options',
      'Flexible premiums',
      'No-lapse guarantee rider'
    ],
    targetMarket: ['Risk-averse investors', 'Market-conscious buyers', 'Retirement planning'],
    ageRanges: { min: 18, max: 80 },
    coverageAmounts: { min: 100000, max: 25000000 },
    premiumStructure: 'Flexible',
    underwritingClass: 'Simplified Issue',
    availableRiders: ['No-Lapse Guarantee', 'Waiver of Premium', 'Long-Term Care', 'Accelerated Death Benefit'],
    states: ['NY', 'CA', 'TX', 'FL', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'AZ', 'CO', 'OR'],
    competitiveAdvantages: [
      'Multiple index crediting methods',
      'Competitive caps and participation rates',
      'Strong guarantees'
    ],
    illustration: 'https://forms.prudential.com/illustrations/index-advantage',
    rateBook: 'https://forms.prudential.com/rates/index-advantage-2024'
  },
  {
    id: '6',
    name: 'PruLife Guaranteed Issue',
    productType: 'Whole Life',
    category: 'Individual',
    description: 'Simplified whole life insurance with no medical exam required. Guaranteed acceptance for qualified applicants.',
    keyFeatures: [
      'No medical exam required',
      'Guaranteed acceptance (ages 50-85)',
      'Graded death benefit first 2 years',
      'Cash value accumulation',
      'Level premiums for life'
    ],
    targetMarket: ['Seniors', 'Health-impaired clients', 'Final expense needs'],
    ageRanges: { min: 50, max: 85 },
    coverageAmounts: { min: 5000, max: 50000 },
    premiumStructure: 'Level',
    underwritingClass: 'Guaranteed Issue',
    availableRiders: ['Accidental Death'],
    states: ['NY', 'CA', 'TX', 'FL', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'],
    competitiveAdvantages: [
      'Fast approval process',
      'No health questions',
      'Competitive rates for guaranteed issue'
    ],
    illustration: 'https://forms.prudential.com/illustrations/guaranteed-issue',
    rateBook: 'https://forms.prudential.com/rates/guaranteed-issue-2024'
  }
];

export const mockRiders: Rider[] = [
  {
    id: '1',
    name: 'Waiver of Premium',
    type: 'Waiver',
    description: 'Waives premium payments if the insured becomes totally disabled, keeping the policy in force without additional cost.',
    cost: 'Additional Premium',
    compatibleProducts: ['1', '2', '3', '4', '5'],
    ageRestrictions: { min: 18, max: 60 },
    keyBenefits: [
      'Premium payments waived during total disability',
      'Policy remains in full force',
      'Cash value continues to grow',
      'No additional underwriting at claim time'
    ],
    exclusions: ['Self-inflicted injuries', 'War or military service', 'Illegal activities']
  },
  {
    id: '2',
    name: 'Accidental Death Benefit',
    type: 'Benefit',
    description: 'Provides additional death benefit if death occurs as a result of an accident, doubling the protection for your family.',
    cost: 'Additional Premium',
    compatibleProducts: ['1', '2', '3', '4', '5', '6'],
    ageRestrictions: { min: 18, max: 70 },
    coverageLimits: { min: 25000, max: 2000000 },
    keyBenefits: [
      'Double indemnity for accidental death',
      'Coverage for travel accidents',
      'Includes occupational accidents',
      'Worldwide coverage'
    ],
    exclusions: ['Suicide', 'War', 'Aviation (non-commercial)', 'Illegal activities', 'Drug/alcohol related']
  },
  {
    id: '3',
    name: 'Long-Term Care Rider',
    type: 'Long-Term Care',
    description: 'Accelerates death benefit to pay for qualified long-term care expenses when the insured cannot perform activities of daily living.',
    cost: 'Included',
    compatibleProducts: ['3', '4', '5'],
    ageRestrictions: { min: 18, max: 75 },
    keyBenefits: [
      'Up to 4% of death benefit annually',
      'Covers home care, assisted living, nursing home',
      'No elimination period',
      'Flexible benefit payments'
    ],
    exclusions: ['Pre-existing conditions (first 6 months)', 'Self-inflicted injuries', 'Drug/alcohol abuse']
  },
  {
    id: '4',
    name: 'Chronic Illness Rider',
    type: 'Accelerated Death Benefit',
    description: 'Provides accelerated death benefit payments when diagnosed with a chronic illness that requires substantial assistance.',
    cost: 'Included',
    compatibleProducts: ['3', '4', '5'],
    ageRestrictions: { min: 18, max: 75 },
    keyBenefits: [
      'Up to 2% of death benefit monthly',
      'Covers chronic illness expenses',
      'Flexible payment options',
      'Tax-free benefits'
    ],
    exclusions: ['Pre-existing conditions', 'Mental/nervous disorders', 'Self-inflicted conditions']
  },
  {
    id: '5',
    name: 'Child Term Rider',
    type: 'Benefit',
    description: 'Provides term life insurance coverage on the insured\'s children, with guaranteed conversion options at age 25.',
    cost: 'Additional Premium',
    compatibleProducts: ['2', '3', '4'],
    ageRestrictions: { min: 15, max: 25 },
    coverageLimits: { min: 5000, max: 50000 },
    keyBenefits: [
      'Coverage for all children under one rider',
      'Guaranteed conversion at age 25',
      'No medical exam for conversion',
      'Affordable protection'
    ],
    exclusions: ['Suicide (first 2 years)', 'War', 'Aviation accidents']
  },
  {
    id: '6',
    name: 'Return of Premium Rider',
    type: 'Benefit',
    description: 'Returns all premiums paid if the insured survives the term period, providing a "money-back guarantee" on term coverage.',
    cost: 'Additional Premium',
    compatibleProducts: ['1'],
    keyBenefits: [
      'Full premium refund if insured survives term',
      'Partial refund for early surrender',
      'Tax-free return of premiums',
      'Encourages policy persistence'
    ],
    exclusions: ['Partial withdrawal penalties', 'Loan interest charges']
  }
];

export const mockForms: InsuranceForm[] = [
  {
    id: '1',
    name: 'Life Insurance Application',
    formNumber: 'PRU-APP-001',
    category: 'New Business',
    type: 'Application',
    description: 'Comprehensive life insurance application for all individual life products. Includes medical history, financial information, and beneficiary details.',
    applicableProducts: ['1', '2', '3', '4', '5'],
    submissionMethod: 'Electronic',
    processingTime: '5-10 business days',
    externalUrl: 'https://forms.prudential.com/new-business/application',
    internalForm: false,
    lastUpdated: '2024-01-15',
    version: '2024.1',
    requirements: [
      'Valid government-issued ID',
      'Social Security number',
      'Medical exam (if required)',
      'Financial documentation',
      'Beneficiary information'
    ],
    relatedForms: ['PRU-MED-001', 'PRU-FIN-001']
  },
  {
    id: '2',
    name: 'Medical Examination Request',
    formNumber: 'PRU-MED-001',
    category: 'New Business',
    type: 'Request',
    description: 'Request form for scheduling medical examinations required for life insurance underwriting.',
    applicableProducts: ['1', '2', '3', '4', '5'],
    submissionMethod: 'Both',
    processingTime: '2-3 business days',
    externalUrl: 'https://forms.prudential.com/medical/exam-request',
    internalForm: false,
    lastUpdated: '2024-01-10',
    version: '2024.1',
    requirements: [
      'Completed application',
      'Preferred examination location',
      'Contact information',
      'Special scheduling requirements'
    ]
  },
  {
    id: '3',
    name: 'Beneficiary Change Form',
    formNumber: 'PRU-SVC-010',
    category: 'Policy Service',
    type: 'Amendment',
    description: 'Form to change primary or contingent beneficiaries on existing life insurance policies.',
    applicableProducts: ['1', '2', '3', '4', '5', '6'],
    submissionMethod: 'Both',
    processingTime: '3-5 business days',
    internalForm: true,
    lastUpdated: '2024-02-01',
    version: '2024.1',
    requirements: [
      'Policy number',
      'Policyholder signature',
      'New beneficiary information',
      'Notarization (if required)',
      'Current beneficiary acknowledgment'
    ],
    relatedForms: ['PRU-SVC-011']
  },
  {
    id: '4',
    name: 'Address Change Form',
    formNumber: 'PRU-SVC-005',
    category: 'Policy Service',
    type: 'Amendment',
    description: 'Simple form to update policyholder address and contact information.',
    applicableProducts: ['1', '2', '3', '4', '5', '6'],
    submissionMethod: 'Electronic',
    processingTime: '1-2 business days',
    internalForm: true,
    lastUpdated: '2024-01-20',
    version: '2024.1',
    requirements: [
      'Policy number',
      'New address',
      'Effective date',
      'Policyholder signature'
    ]
  },
  {
    id: '5',
    name: 'Policy Loan Request',
    formNumber: 'PRU-SVC-020',
    category: 'Policy Service',
    type: 'Request',
    description: 'Request form for taking a loan against the cash value of a permanent life insurance policy.',
    applicableProducts: ['2', '3', '4', '5'],
    submissionMethod: 'Both',
    processingTime: '5-7 business days',
    internalForm: true,
    lastUpdated: '2024-01-25',
    version: '2024.1',
    requirements: [
      'Policy with sufficient cash value',
      'Loan amount specification',
      'Repayment terms selection',
      'Policyholder signature',
      'Current policy status verification'
    ]
  },
  {
    id: '6',
    name: 'Death Claim Form',
    formNumber: 'PRU-CLM-001',
    category: 'Claims',
    type: 'Request',
    description: 'Primary form for initiating death benefit claims on life insurance policies.',
    applicableProducts: ['1', '2', '3', '4', '5', '6'],
    submissionMethod: 'Both',
    processingTime: '10-15 business days',
    externalUrl: 'https://forms.prudential.com/claims/death-benefit',
    internalForm: false,
    lastUpdated: '2024-01-30',
    version: '2024.1',
    requirements: [
      'Certified death certificate',
      'Policy number',
      'Beneficiary identification',
      'Cause of death information',
      'Attending physician statement (if required)'
    ],
    relatedForms: ['PRU-CLM-002', 'PRU-CLM-003']
  },
  {
    id: '7',
    name: 'Premium Payment Authorization',
    formNumber: 'PRU-SVC-015',
    category: 'Policy Service',
    type: 'Authorization',
    description: 'Authorization form for automatic premium payments via bank draft or credit card.',
    applicableProducts: ['1', '2', '3', '4', '5', '6'],
    submissionMethod: 'Electronic',
    processingTime: '3-5 business days',
    internalForm: true,
    lastUpdated: '2024-02-05',
    version: '2024.1',
    requirements: [
      'Bank account or credit card information',
      'Payment frequency selection',
      'Authorization signature',
      'Voided check (for bank draft)',
      'Effective date'
    ]
  },
  {
    id: '8',
    name: 'Financial Questionnaire',
    formNumber: 'PRU-FIN-001',
    category: 'New Business',
    type: 'Declaration',
    description: 'Detailed financial questionnaire required for large face amount applications or high-income clients.',
    applicableProducts: ['3', '4', '5'],
    submissionMethod: 'Both',
    processingTime: '3-5 business days',
    internalForm: false,
    lastUpdated: '2024-01-12',
    version: '2024.1',
    requirements: [
      'Income documentation',
      'Net worth statement',
      'Business financial statements',
      'Tax returns (last 2 years)',
      'CPA verification (if applicable)'
    ],
    relatedForms: ['PRU-APP-001']
  },
  {
    id: '9',
    name: 'Replacement Notice',
    formNumber: 'PRU-REP-001',
    category: 'Compliance',
    type: 'Declaration',
    description: 'Required notice form when new life insurance policy will replace existing coverage.',
    applicableProducts: ['1', '2', '3', '4', '5'],
    submissionMethod: 'Both',
    processingTime: '1-2 business days',
    internalForm: false,
    lastUpdated: '2024-01-08',
    version: '2024.1',
    requirements: [
      'Details of existing policy',
      'Comparison illustration',
      'Client acknowledgment',
      'Agent certification',
      'State-specific requirements'
    ]
  },
  {
    id: '10',
    name: 'Guaranteed Issue Application',
    formNumber: 'PRU-GI-001',
    category: 'New Business',
    type: 'Application',
    description: 'Simplified application for guaranteed issue life insurance products with no medical underwriting.',
    applicableProducts: ['6'],
    submissionMethod: 'Electronic',
    processingTime: '1-3 business days',
    externalUrl: 'https://forms.prudential.com/guaranteed-issue/application',
    internalForm: false,
    lastUpdated: '2024-02-10',
    version: '2024.1',
    requirements: [
      'Age verification',
      'State residency confirmation',
      'Basic identity information',
      'Beneficiary designation',
      'Premium payment method'
    ]
  }
];