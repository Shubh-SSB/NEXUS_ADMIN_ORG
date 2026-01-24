import Login from "@/components/ui/login";
import { adminLogin } from "@/functions/login";

export default function RootPage() {
  return (
    <>
      <div className="h-screen w-full overflow-y-hidden">
        <Login onLogin={adminLogin} />
      </div>
    </>
  );
}
