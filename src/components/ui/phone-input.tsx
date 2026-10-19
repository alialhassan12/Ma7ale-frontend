import * as React from "react";
import RPNInput, { type Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ChevronDown } from "lucide-react";
import { cn } from "cn";

export type PhoneInputProps = Omit<
  React.ComponentProps<typeof RPNInput>,
  "onChange"
> & {
  onChange?: (value?: Value) => void;
  className?: string;
};

const PhoneInputInner = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-full w-full flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
PhoneInputInner.displayName = "PhoneInputInner";

const CountrySelectArrow = () => {
  return (
    <ChevronDown className="size-3.5 opacity-60 text-muted-foreground pointer-events-none" />
  );
};

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countrySelectProps, onChange, ...props }, ref) => {
    return (
      <RPNInput
        inputRef={ref}
        inputComponent={PhoneInputInner}
        onChange={onChange || (() => {})}
        countrySelectProps={{
          arrowComponent: CountrySelectArrow,
          ...countrySelectProps,
        }}
        className={cn(
          "flex h-12 w-full items-center rounded-lg border border-input bg-transparent pl-3 pr-2 text-sm transition-colors",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          "dark:bg-input/30",
          // Country trigger styling
          "[&_.PhoneInputCountry]:relative [&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center [&_.PhoneInputCountry]:cursor-pointer [&_.PhoneInputCountry]:gap-1.5 [&_.PhoneInputCountry]:pr-2.5",
          "[&_.PhoneInputCountry]:after:content-[''] [&_.PhoneInputCountry]:after:absolute [&_.PhoneInputCountry]:after:right-0 [&_.PhoneInputCountry]:after:h-5 [&_.PhoneInputCountry]:after:w-px [&_.PhoneInputCountry]:after:bg-border",
          "[&_.PhoneInputCountryIcon]:h-5 [&_.PhoneInputCountryIcon]:w-7 [&_.PhoneInputCountryIcon]:rounded-[3px] [&_.PhoneInputCountryIcon]:overflow-hidden [&_.PhoneInputCountryIcon]:shadow-xs",
          "[&_.PhoneInputCountryIcon--border]:shadow-none",
          // Native select - 100% dark mode friendly via color-scheme
          "[&_.PhoneInputCountrySelect]:cursor-pointer [&_.PhoneInputCountrySelect]:opacity-0",
          "[&_.PhoneInputCountrySelect]:dark:[color-scheme:dark] [&_.PhoneInputCountrySelect]:[color-scheme:light]",
          "[&_.PhoneInputCountrySelect_option]:bg-card [&_.PhoneInputCountrySelect_option]:text-card-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
