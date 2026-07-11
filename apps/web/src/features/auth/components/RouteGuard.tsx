"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/shared/libs/auth-client";
import { useGetMe } from "@/shared/hooks/users";

const LOGIN_PATH = "/auth/login";
const REGISTER_PATH = "/auth/register";
const ONBOARDING_PATH = "/auth/profile";
const HOME_PATH = "/";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();
  const isAuthenticated = !!session;

  const { data: me, isLoading: isMeLoading, error: meError } = useGetMe(isAuthenticated);
  const isProfileComplete = !!me?.name && !!me?.departmentId;

  const isPending = isSessionPending || (isAuthenticated && isMeLoading);
  const hasMeError = isAuthenticated && !!meError;

  useEffect(() => {
    if (isPending || hasMeError) return;

    if (!isAuthenticated) {
      if (pathname !== LOGIN_PATH && pathname !== REGISTER_PATH) router.replace(LOGIN_PATH);
      return;
    }

    if (!isProfileComplete) {
      if (pathname !== ONBOARDING_PATH) router.replace(ONBOARDING_PATH);
      return;
    }

    if (pathname === LOGIN_PATH || pathname === REGISTER_PATH || pathname === ONBOARDING_PATH) {
      router.replace(HOME_PATH);
    }
  }, [isPending, hasMeError, isAuthenticated, isProfileComplete, pathname, router]);

  if (isPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
    );
  }

  if (hasMeError) return children;

  if (!isAuthenticated && pathname !== LOGIN_PATH && pathname !== REGISTER_PATH) return null;
  if (isAuthenticated && !isProfileComplete && pathname !== ONBOARDING_PATH) return null;
  if (
    isAuthenticated &&
    isProfileComplete &&
    (pathname === LOGIN_PATH || pathname === REGISTER_PATH || pathname === ONBOARDING_PATH)
  )
    return null;

  return children;
}
