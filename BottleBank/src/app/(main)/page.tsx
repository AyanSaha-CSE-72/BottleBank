import { Button } from "@/components/ui/button";
import { HowItWorks } from "@/components/home/how-it-works";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary font-headline">
          প্লাস্টিক বোতল ফেরত দিন, পুরস্কার পান
        </h1>
        <p className="text-muted-foreground mt-2">
          পরিবেশ রক্ষা করুন এবং পুরস্কার অর্জন করুন
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-center">দ্রুত শুরু করুন</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button asChild size="lg">
            <Link href="/login">
              <LogIn className="mr-2" /> লগ ইন
            </Link>
          </Button>
          <Button asChild size="lg" variant="accent">
            <Link href="/register">
              <UserPlus className="mr-2" /> রেজিস্টার
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      <HowItWorks />
    </div>
  );
}
