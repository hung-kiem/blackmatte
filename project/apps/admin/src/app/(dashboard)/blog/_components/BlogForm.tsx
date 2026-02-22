"use client";

import { useState, KeyboardEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormValues, postSchema } from "@/actions/blog.actions";
import { 
  Button, 
  Input, 
  Label, 
  Textarea, 
  Card, 
  CardContent, 
  Badge 
} from "@repo/ui";
import { RichTextEditor } from "./RichTextEditor";
import { X, RefreshCw } from "lucide-react";
import slugify from "slugify";

interface BlogFormProps {
  initialData?: Partial<PostFormValues> & { id?: string };
  onSubmitAction: (data: PostFormValues) => Promise<{ success: boolean; error?: string; postId?: string }>;
}

export function BlogForm({ initialData, onSubmitAction }: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitType, setSubmitType] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  
  // Tag input state
  const [tagInput, setTagInput] = useState("");

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      status: initialData?.status || "DRAFT",
      tags: initialData?.tags || [],
    },
  });

  const { control, handleSubmit, watch, setValue, formState: { errors } } = form;

  // Auto-generate slug from title ONLY if slug is empty AND we are creating
  const titleVal = watch("title");

  // Allow manual override by generating a slug from the title input
  const handleGenerateSlug = () => {
    if (titleVal) {
      setValue("slug", slugify(titleVal, { lower: true, strict: true, locale: 'vi' }), { shouldValidate: true });
    }
  };

  const currentTags = watch("tags");

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!currentTags.includes(newTag)) {
        setValue("tags", [...currentTags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue("tags", currentTags.filter((t) => t !== tagToRemove));
  };

  const onSubmit = async (data: PostFormValues) => {
    setIsSubmitting(true);
    // Submit type depends on the button clicked
    const finalData = { ...data, status: submitType };
    await onSubmitAction(finalData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 flex flex-col xl:flex-row gap-6">
      {/* Left Column: Main Editor */}
      <div className="flex-1 space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                placeholder="Enter an engaging title..."
                {...form.register("title")}
                className="text-lg font-medium"
              />
              {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content <span className="text-red-500">*</span></Label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Start writing..."
                  />
                )}
              />
              {errors.content && <p className="text-destructive text-sm">{errors.content.message}</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Settings */}
      <div className="w-full xl:w-[350px] space-y-6 flex-shrink-0">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug Url</Label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs px-2"
                  onClick={handleGenerateSlug}
                >
                  <RefreshCw className="h-3 w-3 mr-1" /> Gen
                </Button>
              </div>
              <Input
                id="slug"
                placeholder="auto-generated-slug"
                {...form.register("slug")}
              />
              {errors.slug && <p className="text-destructive text-sm">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt / Summary</Label>
              <Textarea
                id="excerpt"
                placeholder="Brief summary for listings and SEO..."
                className="resize-none h-24"
                {...form.register("excerpt", { setValueAs: (v) => v === "" ? null : v })}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2 min-h-[30px] p-2 border rounded-md bg-muted/20">
                {currentTags.length === 0 && <span className="text-muted-foreground text-sm opacity-50">No tags added...</span>}
                {currentTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="pl-2 pr-1 py-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-muted-foreground hover:text-foreground focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                id="tags"
                placeholder="Type and press Enter to add..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            type="submit" 
            variant="outline" 
            className="flex-1"
            disabled={isSubmitting}
            onClick={() => setSubmitType("DRAFT")}
          >
            Save as Draft
          </Button>
          <Button 
            type="submit" 
            className="flex-1"
            disabled={isSubmitting}
            onClick={() => setSubmitType("PUBLISHED")}
          >
            {isSubmitting ? "Saving..." : "Publish Now"}
          </Button>
        </div>
      </div>
    </form>
  );
}
