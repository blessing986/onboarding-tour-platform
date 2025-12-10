import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  id: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-linear-to-r from-brand-teal/10 to-brand-sky/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-slate-50 border-2 border-slate-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b-2 border-slate-200">
          <span className="text-xs font-medium text-slate-600 uppercase">
            {language}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-xs text-slate-600 hover:text-brand-teal transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto">
          <Highlight
            theme={themes.nightOwlLight}
            code={code.trim()}
            language={language}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} text-sm`} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {showLineNumbers && (
                      <span className="inline-block w-8 text-slate-400 select-none text-right mr-4">
                        {i + 1}
                      </span>
                    )}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    </div>
  );
}