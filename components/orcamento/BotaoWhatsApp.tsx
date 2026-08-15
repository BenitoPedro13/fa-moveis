// spec-design.md §4.1 — binding correction: white on --zap is 1.98:1 and fails WCAG.
// --jacaranda on --zap is 8.01:1. Dark text and icon on the green, always.
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  label?: string;
  /** Below `sm`, keep the accessible name but hide the visible label so the button doesn't
   * force horizontal overflow in tight spaces (the header). Icon + tap target still meet the
   * 44×44 px minimum (spec-design.md §12). */
  compact?: boolean;
  className?: string;
};

export function BotaoWhatsApp({
  href,
  label = "Pedir pelo WhatsApp",
  compact = false,
  className,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[4px] bg-zap px-5 py-3",
        "font-body text-body font-medium text-jacaranda transition-colors hover:brightness-95",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 fill-jacaranda"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7C17.19 3.03 14.7 2 12.04 2Zm0 1.67c2.23 0 4.33.87 5.9 2.44a8.2 8.2 0 0 1 2.44 5.8c0 4.55-3.7 8.24-8.35 8.24a8.3 8.3 0 0 1-4.22-1.15l-.3-.18-3.14.82.84-3.06-.2-.32a8.15 8.15 0 0 1-1.28-4.4c0-4.55 3.7-8.24 8.31-8.24Zm-4.6 4.6c-.17 0-.44.06-.67.32-.23.26-.87.85-.87 2.07 0 1.22.9 2.4 1.02 2.56.12.17 1.73 2.77 4.28 3.77 2.12.83 2.55.66 3.01.62.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.17-.48-.29-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.13-.17.26-.65.81-.79.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.75-.15-.26-.02-.4.11-.53.11-.11.25-.29.38-.44.13-.15.17-.26.25-.43.08-.17.04-.32-.02-.45-.06-.13-.56-1.37-.78-1.87-.2-.49-.41-.42-.56-.43-.15-.01-.31-.01-.48-.01Z" />
      </svg>
      <span className={compact ? "sr-only sm:not-sr-only" : undefined}>{label}</span>
    </a>
  );
}
