"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { UserIcon, LogOut, Menu, X, User, ChevronDown } from "lucide-react";
import { useSession, signOut } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!session) {
    return null; // Don't show navbar if user is not authenticated
  }

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">NextJS Auth</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Desktop logo */}
        <div className="flex flex-1 justify-center md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">NextJS Auth</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add navigation items here if needed */}
          </div>
          <div className="hidden md:flex items-center">
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDropdown}
                className="flex items-center space-x-2"
              >
                <UserIcon className="h-4 w-4" />
                <span className="max-w-32 truncate">{session.user.name}</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isDropdownOpen && "rotate-180"
                )} />
              </Button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      onClick={closeDropdown}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-left"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <div className="flex items-center space-x-3 px-3 py-2 text-sm font-medium">
              <UserIcon className="h-5 w-5" />
              <div className="flex flex-col">
                <span className="font-semibold">{session.user.name}</span>
                <span className="text-muted-foreground text-xs">
                  {session.user.email}
                </span>
              </div>
            </div>
            <div className="bg-border mx-3 my-2 h-px" />
            <Link
              href="/profile"
              className={cn(
                "hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-2 text-base font-medium",
              )}
              onClick={closeMenu}
            >
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </div>
            </Link>
            <button
              onClick={handleSignOut}
              className={cn(
                "hover:bg-accent hover:text-accent-foreground block w-full rounded-md px-3 py-2 text-left text-base font-medium",
              )}
            >
              <div className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
