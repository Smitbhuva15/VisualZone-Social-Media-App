import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen"  style={{ background: '#2B2B2F' }}>
      <div className="w-full max-w-md p-6  rounded-lg shadow-lg">
      <SignUp />
      </div>
    </div>
  );
}
