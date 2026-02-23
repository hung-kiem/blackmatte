// Barrel export — all UI components + utilities
export { cn } from "./components/ui/utils";

// Components
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button";
export { Input, type InputProps } from "./components/ui/input";
export { Label } from "./components/ui/label";
export {
  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent,
} from "./components/ui/card";
export { Badge, badgeVariants, type BadgeProps } from "./components/ui/badge";
export {
  Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger,
  DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
} from "./components/ui/dialog";
export { Textarea, type TextareaProps } from "./components/ui/textarea";
export { Separator } from "./components/ui/separator";
export { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
export * from "./components/ui/toggle";
// New components added in Sprint 2
export * from "./components/ui/table";
export * from "./components/ui/dropdown-menu";
export * from "./components/ui/popover";
export * from "./components/ui/command";

