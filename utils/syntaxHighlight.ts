
const KEYWORDS = [
  'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const',
  'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final', 'finally', 'float',
  'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'native',
  'new', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp',
  'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void',
  'volatile', 'while', 'true', 'false', 'null'
];

const COMMON_CLASSES = [
  'String', 'System', 'Scanner', 'Math', 'Integer', 'Double', 'Boolean', 'Object', 
  'List', 'ArrayList', 'Map', 'HashMap', 'Set', 'HashSet', 'Arrays', 'Collections',
  'File', 'FileWriter', 'IOException', 'Exception', 'Main'
];

// Escape HTML characters to prevent XSS when rendering raw HTML
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const highlightJavaCode = (code: string): string => {
  if (!code) return '';

  // Placeholder maps
  const strings: string[] = [];
  const comments: string[] = [];

  // 1. Extract Comments (Single line // and Multi line /* */)
  // We do this first to avoid matching keywords inside comments
  let processedCode = code.replace(/(\/\/.*)|(\/\*[\s\S]*?\*\/)/g, (match) => {
    comments.push(escapeHtml(match));
    return `__COM_${comments.length - 1}__`;
  });

  // 2. Extract Strings ("...")
  processedCode = processedCode.replace(/(".*?")/g, (match) => {
    strings.push(escapeHtml(match));
    return `__STR_${strings.length - 1}__`;
  });

  // 3. Escape remaining HTML (the actual code structure)
  processedCode = escapeHtml(processedCode);

  // 4. Highlight Keywords and Control Flow
  // Using word boundary \b to match exact words
  const keywordRegex = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g');
  processedCode = processedCode.replace(keywordRegex, '<span class="text-ide-keyword">$1</span>');

  // 5. Highlight Classes/Types
  const classRegex = new RegExp(`\\b(${COMMON_CLASSES.join('|')})\\b`, 'g');
  processedCode = processedCode.replace(classRegex, '<span class="text-ide-class">$1</span>');

  // 6. Highlight Methods (word followed by paren)
  // Exclude keywords like 'if (' or 'for ('
  processedCode = processedCode.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, (match) => {
     if (KEYWORDS.includes(match) || COMMON_CLASSES.includes(match)) return match;
     return `<span class="text-ide-method">${match}</span>`;
  });

  // 7. Highlight Numbers
  processedCode = processedCode.replace(/\b(\d+)\b/g, '<span class="text-ide-number">$1</span>');

  // 8. Restore Strings with Color
  processedCode = processedCode.replace(/__STR_(\d+)__/g, (_, id) => {
    return `<span class="text-ide-string">${strings[parseInt(id)]}</span>`;
  });

  // 9. Restore Comments with Color
  processedCode = processedCode.replace(/__COM_(\d+)__/g, (_, id) => {
    return `<span class="text-ide-comment italic">${comments[parseInt(id)]}</span>`;
  });

  return processedCode;
};
