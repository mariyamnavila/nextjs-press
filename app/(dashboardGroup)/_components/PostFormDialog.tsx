/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IPost } from "@/lib/types";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PostFormDialogProps = {
    mode: "create" | "edit";
    post?: IPost;
}

export function PostFormDialog({ mode, post }: PostFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        const toastId = toast.loading(mode === "edit" ? "Saving changes..." : "Creating post...");
        
        setTimeout(() => {
            toast.dismiss(toastId);
            toast.success(mode === "edit" ? "Post updated successfully (Mock Mode)!" : "Post created successfully (Mock Mode)!");
            setPending(false);
            setOpen(false);
        }, 1200);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    mode === "edit" ? (
                        <Button variant="outline" size="sm">
                            <PencilIcon data-icon="inline-start" className="size-3.5 mr-1" />
                            Edit
                        </Button>
                    ) : (
                        <Button>
                            <PlusIcon data-icon="inline-start" className="size-3.5 mr-1" />
                            Create Post
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Post" : "Create Post"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={post?.title} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            name="content"
                            defaultValue={post?.content}
                            required
                            className="min-h-32"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="thumbnail">Thumbnail URL</Label>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            defaultValue={post?.thumbnail ?? ""}
                            placeholder="https://..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                            id="tags"
                            name="tags"
                            defaultValue={post?.tags?.join(", ")}
                            placeholder="tech, sports"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="isPremium" name="isPremium" defaultChecked={post?.isPremium} />
                        <Label htmlFor="isPremium" className="cursor-pointer">Mark as premium content</Label>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Post"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
