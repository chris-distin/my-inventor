"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type UserNavProps = {
  isMobile?: boolean;
};

export default function UserNav({ isMobile = false }: UserNavProps) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      setAuthenticated(Boolean(session));
      setLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return;
      }

      setAuthenticated(Boolean(session));
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  if (loading) {
    return null;
  }

  if (!authenticated) {
    return (
      <div className={isMobile ? "flex flex-col gap-3" : "hidden items-center gap-8 md:flex"}>
        <Link href="/" className="font-medium text-white transition hover:text-blue-200">
          Home
        </Link>
        <Link href="/property" className="font-medium text-white transition hover:text-blue-200">
          Properties
        </Link>
        <Link href="/login" className="font-medium text-white transition hover:text-blue-200">
          Login
        </Link>
        <Link
          href="/register"
          className="rounded-xl border-2 border-white bg-white px-5 py-2 font-semibold text-[#0B3D91] transition hover:bg-blue-100"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className={isMobile ? "flex flex-col gap-3" : "hidden items-center gap-6 md:flex"}>
      <Link href="/" className="font-medium text-white transition hover:text-blue-200">
        Home
      </Link>
      <Link href="/property" className="font-medium text-white transition hover:text-blue-200">
        Properties
      </Link>
      <Link href="/dashboard" className="font-medium text-white transition hover:text-blue-200">
        Dashboard
      </Link>
      <Link href="/profile" className="font-medium text-white transition hover:text-blue-200">
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className="rounded-xl border border-white px-4 py-2 font-semibold text-white transition hover:bg-white hover:text-[#0B3D91]"
      >
        Logout
      </button>
    </div>
  );
}
