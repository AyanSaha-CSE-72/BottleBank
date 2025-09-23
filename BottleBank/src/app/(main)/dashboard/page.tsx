"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard";
import { ShopkeeperDashboard } from "@/components/dashboard/shopkeeper-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not loading and no user is found
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return (
        <div className="space-y-4 p-5">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
    );
  }

  return (
    <>
      {currentUser.type === 'customer' && <CustomerDashboard user={currentUser} />}
      {currentUser.type === 'shopkeeper' && <ShopkeeperDashboard user={currentUser} />}
    </>
  );
}
