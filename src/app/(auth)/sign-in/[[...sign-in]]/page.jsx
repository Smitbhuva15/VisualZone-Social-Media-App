import { SignIn } from '@clerk/nextjs'
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <SignIn appearance={{ baseTheme: dark }} />
      </div>
    </div>
  );
}
