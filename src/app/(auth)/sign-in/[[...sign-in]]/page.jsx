import { SignIn } from '@clerk/nextjs'
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-6  rounded-lg shadow-lg">
        <SignIn appearance={{  }} />
      </div>
    </div>
  );
}
