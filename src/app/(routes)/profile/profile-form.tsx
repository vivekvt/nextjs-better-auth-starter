"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserName } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  initialName: string;
}

export default function ProfileForm({ initialName }: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === initialName) {
      toast.info("No changes to save");
      return;
    }

    startTransition(async () => {
      const result = await updateUserName(name);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
        // Reset to initial name on error
        setName(initialName);
      }
    });
  };

  const hasChanges = name.trim() !== initialName;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          disabled={isPending}
          className="mt-1"
          maxLength={100}
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isPending || !hasChanges || !name.trim()}
          className="flex-1"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>

        {hasChanges && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setName(initialName)}
            disabled={isPending}
          >
            Reset
          </Button>
        )}
      </div>
    </form>
  );
}
