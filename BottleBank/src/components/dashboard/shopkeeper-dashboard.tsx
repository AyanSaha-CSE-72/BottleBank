import type { Shopkeeper } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";
import QRCodeDisplay from "@/components/shared/qr-code";
import { TransactionHistory } from "@/components/shared/transaction-history";

export function ShopkeeperDashboard({ user }: { user: Shopkeeper }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center font-headline">দোকান ড্যাশবোর্ড</h1>

      <Card className="text-center bg-primary/10">
        <CardContent className="p-6">
          <p className="text-muted-foreground">মোট সংগ্রহকৃত বোতল</p>
          <div className="text-4xl font-bold text-primary">{user.bottles}</div>
          <p className="text-xs text-muted-foreground mt-1">বোতল</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-lg">
            <QrCode />
            আপনার দোকানের QR কোড
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2">
          <QRCodeDisplay value={user.shopId} />
          <p className="text-muted-foreground text-sm text-center">গ্রাহকরা এই QR কোড স্ক্যান করবে</p>
        </CardContent>
      </Card>

      <TransactionHistory userId={user.id} userType="shopkeeper" />
    </div>
  );
}
