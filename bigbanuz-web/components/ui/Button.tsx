import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  target?: never;
  rel?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: never;
  disabled?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sun-gradient text-white shadow-sun-glow hover:bg-sun-gradient-hover hover:shadow-sun-glow-lg active:shadow-sun-glow",
  secondary:
    "bg-charcoal-gradient text-white border border-white/10 hover:bg-charcoal-gradient-hover active:bg-charcoal-gradient",
  outline:
    "border-2 border-amber-700 text-amber-700 hover:bg-amber-700/10 active:bg-amber-700/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-small",
  md: "px-7 py-3.5 text-body",
  lg: "px-10 py-[18px] text-body font-semibold tracking-wide",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full hover:-translate-y-0.5 transition-all duration-normal focus:outline-none focus:ring-2 focus:ring-sun/40 focus:ring-offset-2";

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in props && props.href) {
    const isExternal =
      props.href.startsWith("http") || props.href.startsWith("https://wa.me");

    if (isExternal) {
      return (
        <a
          href={props.href}
          target={props.target || "_blank"}
          rel={props.rel || "noopener noreferrer"}
          className={styles}
          onClick={props.onClick}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={props.href} className={styles} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const { onClick, type, disabled } = props as ButtonAsButton;

  return (
    <button
      type={type || "button"}
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
