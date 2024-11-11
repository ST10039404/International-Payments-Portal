import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export const sanitizeInput = (req, res, next) => {
  try {
    if (req.body) {
      const sanitizeValue = (value) => {
        if (typeof value === 'string') {
          return DOMPurify.sanitize(value.trim());
        } else if (typeof value === 'object' && value !== null) {
          return Object.keys(value).reduce((acc, key) => {
            acc[key] = sanitizeValue(value[key]);
            return acc;
          }, Array.isArray(value) ? [] : {});
        }
        return value;
      };

      req.body = sanitizeValue(req.body);
    }
    next();
  } catch (error) {
    console.error('Sanitization error:', error);
    next(error);
  }
};
