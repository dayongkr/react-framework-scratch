import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error */}
        <Delay />
      </Suspense>
    </div>
  );
}

async function Delay() {
  return <div>Delay</div>;
}
