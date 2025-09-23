"use client";

import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";

interface TransactionHistoryProps {
  userId: string;
  userType: 'customer' | 'shopkeeper';
}

export function TransactionHistory({ userId, userType }: TransactionHistoryProps) {
  const { transactions } = useAuth();

  const userTransactions = transactions
    .filter(t => (userType === 'customer' ? t.userId === userId : t.shopId === userId))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          <History />
          সর্বশেষ ট্রানজ্যাকশন
        </CardTitle>
      </CardHeader>
      <CardContent>
        {userTransactions.length > 0 ? (
          <div className="space-y-4">
            {userTransactions.map(t => (
              <div key={t.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <div>
                  <p className="font-semibold">{userType === 'customer' ? t.shopName : t.userName}</p>
                  <p className="text-sm text-muted-foreground">{t.date}</p>
                </div>
                {userType === 'customer' ? (
                  <Badge variant="default">+{t.points} পয়েন্ট</Badge>
                ) : (
                  <span className="font-semibold text-primary">{t.bottles} বোতল</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">কোন ট্রানজ্যাকশন নেই</p>
        )}
      </CardContent>
    </Card>
  );
}
