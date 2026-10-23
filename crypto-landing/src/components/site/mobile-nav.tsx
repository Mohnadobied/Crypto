"use client";

import { MenuIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  side: "left" | "right";
  labels: {
    open: string;
    cta: string;
    items: { href: string; label: string }[];
  };
};

export function MobileNav({ side, labels }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "md:hidden")}
        aria-label={labels.open}
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent side={side} className="gap-8 bg-ink-raised p-6 pt-16">
        <SheetTitle className="sr-only">{labels.open}</SheetTitle>
        <nav>
          <ul className="flex flex-col gap-5 text-lg">
            {labels.items.map((item) => (
              <li key={item.href}>
                <SheetClose
                  nativeButton={false}
                  render={<a href={item.href} />}
                  className="hover:text-lime"
                >
                  {item.label}
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <SheetClose
          nativeButton={false}
          render={<a href="#services" />}
          className={cn(buttonVariants(), "h-11 rounded-md font-medium")}
        >
          {labels.cta}
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
