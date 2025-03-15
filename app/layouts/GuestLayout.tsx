import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import LoadingScreen from "~/components/screen/LoadingScreen";
import { useAuth } from "~/context/auth-context";
export default function guestLayout() {
  const { session, isLoading } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session]);
  return (
    <main>
      <LoadingScreen isLoading={isLoading} />
      <Outlet />
    </main>
  );
}
