"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Tag, Droplet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Customer } from "@/lib/types";

const rewardOptions = [
  {
    name: "মোবাইল রিচার্জ",
    description: "১০ টাকা মোবাইল রিচার্জ",
    points: 50,
    icon: Smartphone,
  },
  {
    name: "ফ্রেশ জলের ডিসকাউন্ট",
    description: "পরবর্তী বোতলে ২০% ছাড়",
    points: 30,
    icon: Tag,
  },
  {
    name: "ফ্রেশ জলের বোতল",
    description: "বিনামূল্যে ১ লিটার জল",
    points: 20,
    icon: Droplet,
  },
];

export function RewardsList() {
  const { currentUser, updateUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      router.push('/login');
    } else if (currentUser.type === 'shopkeeper') {
      toast({
        title: "অ্যাক্সেস নেই",
        description: "দোকানদাররা পুরস্কার রিডিম করতে পারে না।",
        variant: "destructive",
      });
      router.push('/dashboard');
    }
  }, [currentUser, router, toast]);

  const handleRedeem = (points: number, rewardName: string) => {
    if (!currentUser || currentUser.type !== 'customer') return;

    if (currentUser.points >= points) {
      const password = prompt("আপনার পাসওয়ার্ড দিন:");
      if (password === (currentUser as Customer & {password: string}).password) {
        const updatedUser = {
          ...currentUser,
          points: currentUser.points - points,
        };
        updateUser(updatedUser);
        toast({
          title: "অভিনন্দন!",
          description: `আপনি সফলভাবে '${rewardName}' রিডিম করেছেন!`,
        });
      } else if (password !== null) { // Only show error if user entered something
        toast({
          title: "ত্রুটি",
          description: "ভুল পাসওয়ার্ড।",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "অপর্যাপ্ত পয়েন্ট",
        description: "আপনার পর্যাপ্ত পয়েন্ট নেই।",
        variant: "destructive",
      });
    }
  };
  
  if (currentUser?.type !== 'customer') return null;

  return (
    <div className="space-y-4">
      {rewardOptions.map((reward) => (
        <Card key={reward.name}>
          <CardContent className="p-4 flex flex-col items-center text-center gap-2">
            <reward.icon className="w-12 h-12 text-primary" />
            <h3 className="font-bold text-lg">{reward.name}</h3>
            <p className="text-muted-foreground text-sm">{reward.description}</p>
            <Button
              onClick={() => handleRedeem(reward.points, reward.name)}
              className="mt-2"
              disabled={currentUser.points < reward.points}
            >
              {reward.points} পয়েন্ট
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
