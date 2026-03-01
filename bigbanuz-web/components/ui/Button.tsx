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
    "bg-golden text-ocean-deep hover:bg-[#c4955e] active:bg-[#b88a55]",
  secondary:
    "bg-ocean-deep text-white hover:bg-ocean-mid active:bg-[#0d3058]",
  outline:
    "border-2 border-ocean-mid text-ocean-mid hover:bg-ocean-mid hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-small",
  md: "px-6 py-3 text-body",
  lg: "px-8 py-4 text-body font-semibold",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-normal focus:outline-none focus:ring-2 focus:ring-ocean-mid focus:ring-offset-2";

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
