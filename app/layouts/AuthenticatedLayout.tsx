import { useEffect, type ReactNode } from "react";
import { Outlet, useNavigate } from "react-router";
import LoadingScreen from "~/components/screen/LoadingScreen";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/auth-context";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  let navigate = useNavigate();
  const { session, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session]);

  return (
    <main>
      <nav className="flex z-20 fixed top-0 justify-between gap-4 w-screen bg-green-950 p-4 items-center">
        <h1 className="text-2xl font-bold text-white">Welcome {session?.firstName}</h1>
        <Button type="button" onClick={logout}>
          Logout
        </Button>
      </nav>
      <LoadingScreen isLoading={isLoading} />
      <div className="container mx-auto pt-9">
        <Outlet />
      </div>
    </main>
  );
}
