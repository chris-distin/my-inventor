"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type AuthGuardProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
};

export default function AuthGuard({
  children,
  fallback,
  redirectTo = "/login",
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      setAuthenticated(Boolean(session));
      setReady(true);

      if (!session) {
        const nextPath = encodeURIComponent(pathname);
        router.replace(`${redirectTo}?next=${nextPath}`);
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return;
      }

      setAuthenticated(Boolean(session));
      if (!session) {
        const nextPath = encodeURIComponent(pathname);
        router.replace(`${redirectTo}?next=${nextPath}`);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [pathname, redirectTo, router]);

  if (!ready) {
    return (
      fallback ?? (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 text-[#0B3D91]">
          Checking session...
        </main>
      )
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
