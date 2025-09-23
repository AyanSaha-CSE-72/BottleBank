import { ScanForm } from "@/components/scan/scan-form";
import { Camera } from "lucide-react";

export default function ScanPage() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-2xl font-bold font-headline">QR স্ক্যান করুন</h1>
      <div className="w-full h-64 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 flex-col gap-2">
        <Camera className="w-16 h-16" />
        <span>ক্যামেরা ভিউ</span>
      </div>
      <ScanForm />
    </div>
  );
}
