"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function SubscribeButton() {
    const [pending, setPending] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        const toastId = toast.loading("Redirecting to checkout...");
        setTimeout(() => {
            toast.dismiss(toastId);
            toast.success("Subscribed successfully (Mock Sandbox Mode)!");
            setPending(false);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubscribe}>
            <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Redirecting..." : "Subscribe Now"}
            </Button>
        </form>
    )
}
