import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityConfigService {
  constructor(private http: HttpClient) {}

  private readonly securityHeaders = {
    'Content-Security-Policy': 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data: https://fonts.gstatic.com; " +
      "connect-src 'self' https://o4508276569538560.ingest.de.sentry.io; " +
      "frame-ancestors 'none'; " +
      "form-action 'self';",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };

  getSecurityHeaders() {
    return this.securityHeaders;
  }

  private readonly patterns = {
    accountNumber: /^[0-9]{10}$/,
    swiftCode: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
    name: /^[a-zA-Z ]{2,50}$/,
    amount: /^\d+(\.\d{1,2})?$/
  } as const;

  validateInput(input: string, pattern: keyof typeof this.patterns): boolean {
    return this.patterns[pattern]?.test(input) ?? false;
  }

  sanitizeInput(input: string): string {
    return input.replace(/[<>'"]/g, '');
  }
} 