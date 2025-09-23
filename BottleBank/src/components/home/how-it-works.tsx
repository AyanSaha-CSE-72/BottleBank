import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "রেজিস্টার করুন",
    description: "গ্রাহক বা দোকানদার হিসেবে রেজিস্টার করুন",
  },
  {
    title: "বোতল জমা দিন",
    description: "দোকানে গিয়ে বোতল জমা দিন বা গ্রহণ করুন",
  },
  {
    title: "পুরস্কার নিন",
    description: "পয়েন্ট জমা করে পুরস্কার রিডিম করুন",
  },
];

export function HowItWorks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-center">কিভাবে কাজ করে</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full size-8 flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
