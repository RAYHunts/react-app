import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useAuth } from "~/context/auth-context";
import { cn } from "~/lib/utils";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setIsError] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    const error = await login(username, password);

    if (error) {
      setIsError(error.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input id="email" type="text" placeholder="'emilys'" required onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="grid gap-3">
                {/* <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div> */}
                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" onClick={handleLogin}>
                  Login
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
