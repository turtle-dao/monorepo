import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function NotFound(): React.ReactElement {
  return (
    <div className="flex justify-center flex-col items-center h-screen gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl">Page not found</p>
      <Button asChild>
        <Link to="/">Go to home</Link>
      </Button>
    </div>
  );
}
