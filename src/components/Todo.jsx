import { SHOW_TODOS } from '../lib/shared';

// Unconfirmed copy.
//   default: shown underlined in dev, removed in production (or replaced by `fallback`)
//   keep:    shown underlined in dev, shown as plain text in production (drafts that read fine)
export default function Todo({ children, as = 'span', fallback = null, keep = false, className = '', ...rest }) {
  const Tag = as;
  if (SHOW_TODOS) return <Tag className={`todo ${className}`.trim()} {...rest}>{children}</Tag>;
  if (keep) return <Tag className={className || undefined} {...rest}>{children}</Tag>;
  return fallback;
}
