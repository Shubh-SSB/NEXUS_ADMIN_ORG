import Login from "@/components/ui/login";
import { adminLogin } from "@/functions/login";

export default function RootPage() {
  return (
    <>
      <div className="min-h-screen w-full">
        <div className="relative h-screen w-full">
          <Login onLogin={adminLogin} />
        </div>
      </div>
    </>
  );
}
