import { describe, it, expect } from "vitest";
import { postSchema } from "../../src/actions/blog.actions";
import slugify from "slugify";

describe("postSchema Validation", () => {
  it("TC-UNIT-01: should reject missing or empty title", () => {
    const rs = postSchema.safeParse({
      title: "",
      content: "Hello World",
      slug: "hello-world",
    });
    expect(rs.success).toBe(false);
    if (!rs.success) {
      expect(rs.error.issues[0].message).toBe("Title is required");
    }
  });

  it("TC-UNIT-02: should accept valid object", () => {
    const rs = postSchema.safeParse({
      title: "Valid Title",
      content: "<p>Rich content</p>",
      slug: "valid-title",
      status: "DRAFT",
      tags: ["nextjs", "react"],
    });
    expect(rs.success).toBe(true);
  });

  it("TC-UNIT-03: should reject invalid slug format with spaces or uppercase", () => {
    const rs = postSchema.safeParse({
      title: "Valid Title",
      content: "Content",
      slug: "Invalid Slug Space",
    });
    expect(rs.success).toBe(false);
    if (!rs.success) {
      expect(rs.error.issues[0].message).toContain("Invalid slug format");
    }
  });

  it("TC-UNIT-04: slugify generates valid slugs from vietnamese text", () => {
    const title = "Bài viết mới trên Việt Nam";
    const slug = slugify(title, { lower: true, strict: true, locale: "vi" });
    expect(slug).toBe("bai-viet-moi-tren-viet-nam");
    
    // Test that the generated slug is valid against our schema
    const rs = postSchema.safeParse({
      title,
      slug,
      content: "Content",
    });
    expect(rs.success).toBe(true);
  });
});
