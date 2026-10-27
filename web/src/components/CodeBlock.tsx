interface CodeBlockProps {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="code-block" tabIndex={0}>
      <code>{code.trimEnd()}</code>
    </pre>
  )
}
