"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleDeposit } from "@/app/(main)/scan/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";
import type { Customer, Shopkeeper } from "@/lib/types";

const formSchema = z.object({
  customerEmail: z.string().email({ message: "অনুগ্রহ করে একটি সঠিক ইমেল দিন।" }),
  bottleCount: z.coerce.number().min(1, { message: "কমপক্ষে ১টি বোতল হতে হবে।" }),
  shopkeeperPassword: z.string().min(1, { message: "পাসওয়ার্ড প্রয়োজন।" }),
});

export function ScanForm() {
  const { currentUser, users, updateUser, addTransaction } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerEmail: "",
      bottleCount: 1,
      shopkeeperPassword: "",
    },
  });

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else if (currentUser.type !== 'shopkeeper') {
      toast({
        title: "শুধুমাত্র দোকানদারদের জন্য",
        description: "এই পাতাটি শুধুমাত্র দোকানদাররা ব্যবহার করতে পারেন।",
        variant: "destructive",
      });
      router.push("/dashboard");
    }
  }, [currentUser, router, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!currentUser || currentUser.type !== 'shopkeeper') return;
    
    startTransition(async () => {
      const validationInput = {
        bottleCount: values.bottleCount,
        shopkeeperPassword: values.shopkeeperPassword,
        customerEmail: values.customerEmail
      };
      
      const result = await handleDeposit(validationInput);

      if (result.isValid) {
        const customer = users.find(u => u.email === values.customerEmail && u.type === 'customer') as Customer | undefined;
        if (!customer) {
            toast({ title: "গ্রাহক খুঁজে পাওয়া যায়নি", variant: "destructive" });
            return;
        }

        const updatedCustomer = { ...customer, points: customer.points + values.bottleCount };
        updateUser(updatedCustomer);
        
        const updatedShopkeeper = { ...currentUser as Shopkeeper, bottles: (currentUser as Shopkeeper).bottles + values.bottleCount };
        updateUser(updatedShopkeeper);
        
        addTransaction({
            userId: customer.id,
            userName: customer.name,
            shopId: currentUser.id,
            shopName: (currentUser as Shopkeeper).shopName,
            bottles: values.bottleCount,
            points: values.bottleCount,
        });

        toast({
          title: "সফল!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "ত্রুটি",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  }

  if (!currentUser || currentUser.type !== 'shopkeeper') {
    return null;
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
        <FormField
          control={form.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>গ্রাহকের ইমেল (স্ক্যান করা)</FormLabel>
              <FormControl>
                <Input placeholder="customer@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bottleCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বোতলের সংখ্যা</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shopkeeperPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>আপনার পাসওয়ার্ড</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full" size="lg" variant="accent">
          {isPending ? <Loader2 className="animate-spin" /> : <CheckCircle />}
          ট্রানজ্যাকশন সম্পন্ন করুন
        </Button>
      </form>
    </Form>
  );
}
