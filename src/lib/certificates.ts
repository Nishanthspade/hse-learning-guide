/**
 * HSE Learning Guide - Certificate Generation
 * PDF certificate generation with verification codes and QR codes
 */

import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { UNIFIED_LEARNING_PATHS, getLearningPathById } from '../data/unified-standards';
import { UNIFIED_TOPICS, getModuleById } from '../data/unified-standards';
import { UNIFIED_LEARNING_PATHS as LEARNING_PATHS } from '../data/unified-standards';

export interface CertificateData {
  id: string;
  title: string;
  description: string;
  issuedDate: string;
  expiryDate: string | null;
  credentialId: string;
  status: 'earned' | 'in-progress' | 'expired';
  pathwayId: string;
  frameworks: string[];
  skills: string[];
  verificationUrl: string;
  qrCode: string;
  template: 'standard' | 'specialist' | 'adnoc' | 'auditor' | 'preparation';
  recipient: {
    name: string;
    email: string;
  };
  issuedBy: {
    name: string;
    title: string;
    organization: string;
  };
}

export interface CertificateTemplate {
  name: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  logoUrl?: string;
  watermark?: string;
  borderStyle: 'simple' | 'ornate' | 'modern' | 'classic';
  fonts: {
    title: string;
    body: string;
    accent: string;
  };
  layout: 'portrait' | 'landscape';
}

// Certificate templates
export const CERTIFICATE_TEMPLATES: Record<string, CertificateTemplate> = {
  standard: {
    name: 'Standard Certificate',
    backgroundColor: '#ffffff',
    textColor: '#1a252f',
    accentColor: '#1e3a5f',
    borderStyle: 'modern',
    fonts: {
      title: 'Helvetica-Bold',
      body: 'Helvetica',
      accent: 'Helvetica-Bold',
    },
    layout: 'portrait',
  },
  specialist: {
    name: 'Specialist Certificate',
    backgroundColor: '#f8fafc',
    textColor: '#1e3a5f',
    accentColor: '#e86c00',
    borderStyle: 'ornate',
    fonts: {
      title: 'Helvetica-Bold',
      body: 'Helvetica',
      accent: 'Helvetica-Bold',
    },
    layout: 'portrait',
  },
  adnoc: {
    name: 'ADNOC Certificate',
    backgroundColor: '#ffffff',
    textColor: '#1a252f',
    accentColor: '#003366',
    borderStyle: 'ornate',
    fonts: {
      title: 'Helvetica-Bold',
      body: 'Helvetica',
      accent: 'Helvetica-Bold',
    },
    layout: 'portrait',
  },
  auditor: {
    name: 'Auditor Certificate',
    backgroundColor: '#f8fafc',
    textColor: '#1a252f',
    accentColor: '#dc2626',
    borderStyle: 'modern',
    fonts: {
      title: 'Helvetica-Bold',
      body: 'Helvetica',
      accent: 'Helvetica-Bold',
    },
    layout: 'portrait',
  },
  preparation: {
    name: 'Preparation Certificate',
    backgroundColor: '#fefce8',
    textColor: '#1a252f',
    accentColor: '#f59e0b',
    borderStyle: 'modern',
    fonts: {
      title: 'Helvetica-Bold',
      body: 'Helvetica',
      accent: 'Helvetica-Bold',
    },
    layout: 'portrait',
  },
};

/**
 * Generate certificate PDF
 */
export async function generateCertificate(
  certificateData: CertificateData,
  templateName: string = 'standard'
): Promise<Blob> {
  const template = CERTIFICATE_TEMPLATES[templateName] || CERTIFICATE_TEMPLATES.standard;
  const doc = new jsPDF({
    orientation: template.layout,
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Generate QR code
  const qrCodeDataUrl = await QRCode.toDataURL(certificateData.verificationUrl, {
    width: 80,
    height: 80,
    margin: 2,
    color: {
      dark: certificateData.template === 'adnoc' ? '#003366' : '#1e3a5f',
      light: '#ffffff',
    },
  });

  // Draw background
  drawBackground(doc, template);

  // Draw border
  drawBorder(doc, template);

  // Draw header/logo
  drawHeader(doc, certificateData, template);

  // Draw certificate title
  drawTitle(doc, certificateData, template);

  // Draw recipient info
  drawRecipientInfo(doc, certificateData, template);

  // Draw certificate details
  drawCertificateDetails(doc, certificateData, template);

  // Draw frameworks/skills
  drawFrameworksAndSkills(doc, certificateData, template);

  // Draw QR code and verification info
  drawQRCode(doc, qrCodeDataUrl, certificateData, template);

  // Draw signatures
  drawSignatures(doc, certificateData, template);

  // Draw footer
  drawFooter(doc, certificateData, template);

  // Add watermark if specified
  if (template.watermark) {
    drawWatermark(doc, template.watermark);
  }

  // Return PDF as blob
  return doc.output('blob');
}

/**
 * Generate certificate for pathway completion
 */
export async function generatePathwayCertificate(
  pathwayId: string,
  userData: { name: string; email: string },
  completionData: {
    completedAt: string;
    score?: number;
    modulesCompleted: number;
    totalModules: number;
  }
): Promise<Blob> {
  const pathway = getLearningPathById(pathwayId);
  if (!pathway) {
    throw new Error(`Pathway not found: ${pathwayId}`);
  }

  // Collect all frameworks from completed modules
  const frameworks = new Set<string>();
  let totalSkills: string[] = [];

  for (const moduleItem of LEARNING_PATHS.find(p => p.id === pathwayId)?.modules || []) {
    const topic = UNIFIED_TOPICS.find(t => t.id === moduleItem.topicId);
    if (topic) {
      Object.keys(topic.frameworks).forEach(fw => frameworks.add(fw));
      totalSkills.push(...topic.learningObjectives);
    }
  }

  // Generate credential ID
  const credentialId = generateCredentialId('HSE', pathway.id);

  const certificateData: CertificateData = {
    id: `cert-${pathwayId}-${Date.now()}`,
    title: pathway.title,
    description: pathway.description,
    issuedDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    credentialId: `HSE-${pathway.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
    status: 'earned',
    pathwayId: pathway.id,
    frameworks: Array.from(frameworks),
    skills: [...new Set(totalSkills)].slice(0, 20),
    verificationUrl: `https://verify.hseknowledge.bank/cert/${credentialId}`,
    qrCode: '',
    template: pathway.template || 'specialist',
    recipient: {
      name: userData.name,
      email: userData.email,
    },
    issuedBy: {
      name: 'HSE Knowledge Bank',
      title: 'Certification Authority',
      organization: 'HSE Learning Guide',
    },
  };

  return generateCertificate(certificateData, pathway.template || 'specialist');
}

/**
 * Generate certificate for module completion
 */
export async function generateModuleCertificate(
  moduleId: string,
  userData: { name: string; email: string },
  completionData: {
    completedAt: string;
    score: number;
    timeSpent: number;
  }
): Promise<Blob> {
  const module = getModuleById(moduleId);
  if (!module) {
    throw new Error(`Module not found: ${moduleId}`);
  }

  const frameworks = new Set<string>();
  Object.keys(module.frameworks).forEach(fw => frameworks.add(fw));

  const credentialId = generateCredentialId('MOD', moduleId);

  const certificateData: CertificateData = {
    id: `cert-${moduleId}-${Date.now()}`,
    title: `${module.title} Completion Certificate`,
    description: `Successfully completed the "${module.title}" module with a score of ${completionData.score}%`,
    issuedDate: new Date(completionData.completedAt).toISOString().split('T')[0],
    expiryDate: null,
    credentialId: `HSE-MOD-${moduleId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
    status: 'earned',
    pathwayId: '',
    frameworks: Array.from(frameworks),
    skills: module.learningObjectives.slice(0, 10),
    verificationUrl: `https://verify.hseknowledge.bank/cert/${credentialId}`,
    qrCode: '',
    template: 'standard',
    recipient: {
      name: userData.name,
      email: userData.email,
    },
    issuedBy: {
      name: 'HSE Knowledge Bank',
      title: 'Certification Authority',
      organization: 'HSE Learning Guide',
    },
  };

  return generateCertificate(certificateData, 'standard');
}

/**
 * Generate verification QR code
 */
export async function generateQRCode(url: string, options: {
  color?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
} = {}): Promise<string> {
  return QRCode.toDataURL(url, {
    width: options.width || 80,
    height: options.height || 80,
    margin: 2,
    color: {
      dark: options.color || '#1e3a5f',
      light: options.backgroundColor || '#ffffff',
    },
  });
}

/**
 * Generate credential ID
 */
function generateCredentialId(prefix: string, identifier: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${identifier.toUpperCase()}-${timestamp}-${random}`;
}

/**
 * Verify certificate authenticity
 */
export async function verifyCertificate(credentialId: string): Promise<{
  valid: boolean;
  certificate?: CertificateData;
  error?: string;
}> {
  // In production, this would call a verification API
  // For now, simulate verification
  const isValidFormat = /^HSE-[A-Z]+-[A-Z0-9]+-[A-Z0-9]+$/.test(credentialId);
  
  if (!isValidFormat) {
    return { valid: false, error: 'Invalid credential ID format' };
  }

  // Simulate API call
  return {
    valid: true,
    certificate: {
      id: `cert-${credentialId}`,
      title: 'Verified Certificate',
      description: 'This certificate has been verified',
      issuedDate: new Date().toISOString().split('T')[0],
      expiryDate: null,
      credentialId,
      status: 'earned',
      pathwayId: '',
      frameworks: [],
      skills: [],
      verificationUrl: `https://verify.hseknowledge.bank/cert/${credentialId}`,
      qrCode: '',
      template: 'standard',
      recipient: { name: 'Verified User', email: 'verified@example.com' },
      issuedBy: {
        name: 'HSE Knowledge Bank',
        title: 'Certification Authority',
        organization: 'HSE Learning Guide',
      },
    },
  };
}

/**
 * Generate certificate PDF with custom template
 */
export async function generateCustomCertificate(
  data: CertificateData,
  customTemplate?: Partial<CertificateTemplate>
): Promise<Blob> {
  const template = { ...CERTIFICATE_TEMPLATES.standard, ...customTemplate };
  return generateCertificate(data, 'standard');
}

/**
 * Batch generate certificates
 */
export async function generateCertificatesBatch(
  certificates: CertificateData[],
  templateName: string = 'standard'
): Promise<Blob[]> {
  const results: Blob[] = [];
  
  for (const cert of certificates) {
    try {
      const blob = await generateCertificate(cert, templateName);
      results.push(blob);
    } catch (error) {
      console.error(`Failed to generate certificate ${cert.id}:`, error);
      // Continue with other certificates
    }
  }
  
  return results;
}

/**
 * Generate certificate preview (for preview modal)
 */
export async function generateCertificatePreview(
  certificateData: CertificateData,
  templateName: string = 'standard'
): Promise<string> {
  const blob = await generateCertificate(certificateData, templateName);
  return URL.createObjectURL(blob);
}

/**
 * Validate certificate data
 */
export function validateCertificateData(data: CertificateData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Certificate title is required');
  }

  if (!data.recipient?.name || data.recipient.name.trim().length === 0) {
    errors.push('Recipient name is required');
  }

  if (!data.recipient?.email || !isValidEmail(data.recipient.email)) {
    errors.push('Valid recipient email is required');
  }

  if (!data.issuedBy?.name || data.issuedBy.name.trim().length === 0) {
    errors.push('Issuer name is required');
  }

  if (!data.verificationUrl || !isValidUrl(data.verificationUrl)) {
    errors.push('Valid verification URL is required');
  }

  if (!data.issuedDate || !isValidDate(data.issuedDate)) {
    errors.push('Valid issue date is required');
  }

  if (data.expiryDate && !isValidDate(data.expiryDate)) {
    errors.push('Invalid expiry date');
  }

  if (data.expiryDate && data.issuedDate && new Date(data.expiryDate) <= new Date(data.issuedDate)) {
    errors.push('Expiry date must be after issue date');
  }

  if (!data.frameworks || data.frameworks.length === 0) {
    errors.push('At least one framework is required');
  }

  if (!data.skills || data.skills.length === 0) {
    errors.push('At least one skill is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * Generate certificate HTML for preview (without PDF generation)
 */
export function generateCertificateHTML(certificateData: CertificateData): string {
  const template = CERTIFICATE_TEMPLATES.standard;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${certificateData.title} - Certificate</title>
      <style>
        @page { size: A4 portrait; margin: 20mm; }
        body { font-family: Helvetica, Arial, sans-serif; margin: 0; padding: 20mm; color: #1a252f; }
        .certificate { border: 3px solid #1e3a5f; border-radius: 8px; padding: 40px; min-height: 297mm; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(135deg, #1e3a5f, #2c5f7c); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .logo svg { width: 40px; height: 40px; color: white; }
        h1 { font-size: 28px; color: #1e3a5f; margin: 0 0 10px; }
        .subtitle { color: #64748b; font-size: 16px; margin-bottom: 30px; }
        .recipient { font-size: 24px; font-weight: bold; color: #1e3a5f; margin: 20px 0; text-align: center; }
        .details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 30px 0; }
        .detail { padding: 15px; background: #f8fafc; border-radius: 8px; }
        .detail-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
        .detail-value { font-size: 16px; font-weight: 600; color: #1e3a5f; margin-top: 4px; }
        .skills { margin-top: 30px; }
        .skills h3 { font-size: 18px; color: #1e3a5f; margin-bottom: 15px; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag { background: #e0f2fe; color: #0369a1; padding: 6px 12px; border-radius: 20px; font-size: 13px; }
        .qr-section { display: flex; justify-content: space-between; align-items: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e2e8f0; }
        .qr-code { width: 80px; height: 80px; }
        .verification { text-align: right; }
        .verification-url { font-family: monospace; font-size: 12px; color: #64748b; word-break: break-all; }
        .signatures { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e2e8f0; }
        .signature { text-align: center; width: 200px; }
        .signature-line { border-top: 1px solid #cbd5e1; width: 100%; margin-bottom: 8px; }
        .signature-name { font-weight: 600; color: #1e3a5f; }
        .signature-title { font-size: 12px; color: #64748b; }
        @media print { body { padding: 0; } .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="header">
          <div class="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1>Certificate of Completion</h1>
          <p class="subtitle">This certifies that</p>
        </div>
        
        <div class="recipient">{{recipientName}}</div>
        
        <p class="subtitle">has successfully completed the</p>
        <h2 style="font-size: 22px; color: #1e3a5f; margin: 10px 0;">{{certificateTitle}}</h2>
        <p class="subtitle">with a score of {{score}}%</p>
        
        <div class="details">
          <div class="detail">
            <div class="detail-label">Credential ID</div>
            <div class="detail-value">{{credentialId}}</div>
          </div>
          <div class="detail">
            <div class="detail-label">Issued Date</div>
            <div class="detail-value">{{issuedDate}}</div>
          </div>
          <div class="detail">
            <div class="detail-label">Expiry Date</div>
            <div class="detail-value">{{expiryDate || 'No Expiry'}}</div>
          </div>
          <div class="detail">
            <div class="detail-label">Credential ID</div>
            <div class="detail-value">{{credentialId}}</div>
          </div>
        </div>
        
        <div class="skills">
          <h3>Skills Verified</h3>
          <div class="skills-grid">
            {{#each skills}}
            <span class="skill-tag">{{this}}</span>
            {{/each}}
          </div>
        </div>
        
        <div class="qr-section">
          <div class="verification">
            <p style="font-size: 11px; color: #64748b; margin-bottom: 4px;">Verify at:</p>
            <div class="verification-url">{{verificationUrl}}</div>
          </div>
          <div class="qr-code">
            <img src="{{qrCodeDataUrl}}" alt="QR Code" width="80" height="80" />
          </div>
        </div>
        
        <div class="signatures">
          <div class="signature">
            <div class="signature-line"></div>
            <div class="signature-name">{{issuedBy.name}}</div>
            <div class="signature-title">{{issuedBy.title}}</div>
            <div class="signature-title">{{issuedBy.organization}}</div>
          </div>
          <div class="signature">
            <div class="signature-line"></div>
            <div class="signature-name">Recipient</div>
            <div class="signature-title">{{recipientName}}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Certificate verification page HTML
 */
export function generateVerificationPage(certificate: any): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Certificate Verification - HSE Knowledge Bank</title>
      <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
        .verified { color: #059669; font-weight: bold; }
        .badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .badge-success { background: #d1fae5; color: #065f46; }
        .card { border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem; }
      </style>
    </head>
    <body>
      <div style="text-align: center; margin-bottom: 2rem;">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #059669;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 style="margin-top: 1rem; color: #059669;">Certificate Verified</h1>
      </div>
      <div class="card">
        <h2>{{certificate.title}}</h2>
        <p class="text-gray-600">{{certificate.description}}</p>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div><strong>Issued to:</strong> {{recipientName}}</div>
          <div><strong>Issued on:</strong> {{issuedDate}}</div>
          <div><strong>Expires:</strong> {{expiryDate || 'No Expiry'}}</div>
          <div><strong>Credential ID:</strong> {{credentialId}}</div>
        </div>
        <div class="mt-4">
          <span class="badge badge-success">VERIFIED</span>
        </div>
        <div class="mt-4">
          <a href="{{verificationUrl}}" target="_blank" style="color: #2563eb;">View on Verification Portal</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

export { CERTIFICATE_TEMPLATES };
export type { CertificateData, CertificateTemplate };