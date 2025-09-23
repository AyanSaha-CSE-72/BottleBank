import type { Customer } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";
import QRCodeDisplay from "@/components/shared/qr-code";
import { TransactionHistory } from "@/components/shared/transaction-history";

export function CustomerDashboard({ user }: { user: Customer }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center font-headline">আপনার ড্যাশবোর্ড</h1>

      <Card className="text-center bg-primary/10">
        <CardContent className="p-6">
          <p className="text-muted-foreground">আপনার পয়েন্ট</p>
          <div className="text-4xl font-bold text-primary">{user.points}</div>
          <p className="text-xs text-muted-foreground mt-1">প্রতি বোতলের জন্য ১ পয়েন্ট</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-lg">
            <QrCode />
            আপনার QR কোড
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2">
          <QRCodeDisplay value={user.email} />
          <p className="text-muted-foreground text-sm text-center">দোকানে এই QR কোডটি স্ক্যান করান</p>
        </CardContent>
      </Card>

      <TransactionHistory userId={user.id} userType="customer" />
    </div>
  );
}
