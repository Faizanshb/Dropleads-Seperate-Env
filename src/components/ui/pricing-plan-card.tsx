"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NumberFlow from "@number-flow/react";
import { Check, Key, Headset, Loader2, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
interface PricingCardProps {
  name: string;
  price: number;
  credits: number;
  perCreditCost: number;
  features: {
    rollover: string;
    apiAccess: boolean;
    support: string;
  };
  isPopular: boolean;
  currency: "USD" | "INR";
  isLoading: boolean;
  isCustomPlan?: boolean; // Add this new prop
  customPlanDetails?: {
    nextBillingDate?: string;
    subscriptionId?: string;
  };
}
export function PricingCard({
  name,
  price,
  credits,
  perCreditCost,
  features,
  isPopular,
  currency,
  isLoading,
  isCustomPlan = false,
  customPlanDetails,
}: PricingCardProps) {
  const getCurrencySymbol = (currency: "USD" | "INR") => {
    switch (currency) {
      case "USD":
        return "$";
      case "INR":
        return "₹";
      default:
        return "$";
    }
  };

  const router = useRouter();
  const onSubscribe = () => {
    // Navigate to the subscription page or handle subscription logic
    router.push("https://app.dropleads.io");
  }
  const getButtonConfig = () => {
    return {
      text: "Subscribe",
      variant: "default" as const,
      disabled: false,
      onClick:  onSubscribe,
      className: "bg-blue-600 hover:bg-blue-700 text-white",
      icon: <ArrowUp className="w-4 h-4" />,
    };
  };
  const buttonConfig = getButtonConfig();
  return (
    <Card
      className={`relative h-full flex flex-col ${
        isPopular ? "border-2 border-blue-600" : "border border-border"
      }  ${
        isCustomPlan ? "border-2 border-orange-400" : ""
      }`}
    >
      {/* Popular Badge */}
      {isPopular && !isCustomPlan && (
        <div className="absolute -top-px left-4 bg-blue-600 hover:bg-blue-700 text-primary-foreground text-xs font-medium px-3 py-1">
          MOST POPULAR
        </div>
      )}
      {/* Custom Plan Badge */}
      {isCustomPlan && (
        <div className="absolute -top-px left-4 bg-orange-600 text-white text-xs font-medium px-3 py-1">
          CUSTOM PLAN
        </div>
      )}
      {/* Current Plan Badge */}
    
      <CardHeader className="p-6 pb-4 space-y-4">
        {/* Plan Name */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {name}
          </h3>
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold text-foreground">
              {getCurrencySymbol(currency)}
            </span>
            <NumberFlow
              value={price}
              className="text-3xl font-bold text-foreground"
              format={{
                style: "decimal",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }}
            />
            <span className="text-sm text-muted-foreground font-medium">
              /month
            </span>
          </div>
        </div>
        {/* Credits */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {isCustomPlan ? "Estimated Credits" : "Monthly Credits"}
            </span>
            <NumberFlow
              value={credits}
              className="text-lg font-semibold text-foreground"
              format={{
                style: "decimal",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">
              {isCustomPlan ? "Est. Per Credit" : "Per Credit"}
            </span>
            <div className="flex items-center gap-0.5">
              <span className="text-xs font-medium text-foreground">
                {getCurrencySymbol(currency)}
              </span>
              <NumberFlow
                value={perCreditCost}
                className="text-xs font-medium text-foreground"
                format={{
                  style: "decimal",
                  minimumFractionDigits: 4,
                  maximumFractionDigits: 4,
                }}
              />
            </div>
          </div>
        </div>
        {/* Custom Plan Details */}
        {isCustomPlan && customPlanDetails?.nextBillingDate && (
          <div className="pt-2 border-t border-orange-200">
            <div className="text-xs text-orange-700">
              Next billing: {customPlanDetails.nextBillingDate}
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-6 pt-0 space-y-4">
        {/* Features */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 text-foreground flex-shrink-0" />
            <div className="text-sm text-foreground">
              <span className="font-medium">Rollover:</span>
              <span className="text-muted-foreground ml-1">
                {features.rollover}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Key className="w-4 h-4 text-foreground flex-shrink-0" />
            <span className="text-sm font-medium text-foreground">
              API Access
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Headset className="w-4 h-4 text-foreground flex-shrink-0" />
            <div className="text-sm text-foreground">
              <span className="font-medium">Support:</span>
              <span className="text-muted-foreground ml-1">
                {features.support}
              </span>
            </div>
          </div>
        </div>
        {/* Custom Plan Details */}
        {isCustomPlan && customPlanDetails?.nextBillingDate && (
          <div className="pt-2 border-t border-orange-200">
            <div className="text-xs text-orange-700">
              Next billing: {customPlanDetails.nextBillingDate}
            </div>
          </div>
        )}
        {/* CTA Button */}
        <div className="mt-auto pt-4">
          <Button
            className={`w-full h-10 font-medium text-sm cursor-pointer ${buttonConfig.className} disabled:opacity-50`}
            onClick={buttonConfig.onClick}
            disabled={isLoading || buttonConfig.disabled}
            variant={buttonConfig.variant}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {buttonConfig.icon}
                {buttonConfig.text}
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
