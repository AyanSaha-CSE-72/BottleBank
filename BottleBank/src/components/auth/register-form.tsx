"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Customer, Shopkeeper } from "@/lib/types";

export function RegisterForm() {
  const [userType, setUserType] = useState<"customer" | "shopkeeper">("customer");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let newUser;
    if (userType === "customer") {
      const customerData: Partial<Customer> = {
        type: "customer",
        name: data.customerName as string,
        email: data.customerEmail as string,
        phone: data.customerPhone as string,
        password: data.customerPassword as string,
      };
      newUser = register(customerData);
    } else {
      const shopData: Partial<Shopkeeper> = {
        type: "shopkeeper",
        shopName: data.shopName as string,
        shopId: data.shopId as string,
        nid: data.shopNid as string,
        email: `${(data.shopId as string).toLowerCase()}@fresh.com`,
        phone: data.shopPhone as string,
        password: data.shopPassword as string,
      };
      newUser = register(shopData);
    }

    if (newUser) {
      toast({
        title: "রেজিস্ট্রেশন সফল হয়েছে",
        description: "আপনার ড্যাশবোর্ডে আপনাকে স্বাগতম!",
      });
      router.push("/dashboard");
    } else {
      setError("এই ইমেইল দিয়ে ইতিমধ্যে রেজিস্টার করা আছে।");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">রেজিস্টার</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={userType} onValueChange={(value) => setUserType(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">গ্রাহক</TabsTrigger>
            <TabsTrigger value="shopkeeper">দোকানদার</TabsTrigger>
          </TabsList>
          <form onSubmit={handleSubmit} className="mt-4">
            {error && (
                <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <TabsContent value="customer" className="m-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name">পুরো নাম</Label>
                <Input id="customer-name" name="customerName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-email">ইমেইল ঠিকানা</Label>
                <Input id="customer-email" name="customerEmail" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-phone">মোবাইল নম্বর</Label>
                <Input id="customer-phone" name="customerPhone" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-password">পাসওয়ার্ড</Label>
                <Input id="customer-password" name="customerPassword" type="password" required />
              </div>
            </TabsContent>
            <TabsContent value="shopkeeper" className="m-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shop-name">দোকানের নাম</Label>
                <Input id="shop-name" name="shopName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-id">দোকান আইডি</Label>
                <Input id="shop-id" name="shopId" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-nid">এনআইডি নম্বর</Label>
                <Input id="shop-nid" name="shopNid" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-phone">মোবাইল নম্বর</Label>
                <Input id="shop-phone" name="shopPhone" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shop-password">পাসওয়ার্ড</Label>
                <Input id="shop-password" name="shopPassword" type="password" required />
              </div>
            </TabsContent>
            <Button type="submit" className="w-full mt-6" size="lg">
              রেজিস্টার
            </Button>
          </form>
        </Tabs>

        <p className="text-center mt-4 text-sm">
          অ্যাকাউন্ট আছে?{' '}
          <Link href="/login" className="text-primary hover:underline">
            লগ ইন করুন
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
