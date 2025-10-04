// import { useQuery } from "@tanstack/react-query";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { IndexPage } from "@/pages/index";
// import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

// const TITLE_TEXT = "HackYeah2025";

function HomeComponent() {
  return (
    <ClientOnly
      fallback={
        <div style={{ color: "red", fontSize: 45, backgroundColor: "orange" }}>
          Loading...
        </div>
      }
    >
      <IndexPage />
    </ClientOnly>
  );

  // return (
  //   <div className="container mx-auto max-w-3xl px-4 py-2">
  //     <pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
  //     <div className="grid gap-6">
  //       <section className="rounded-lg border p-4">
  //         <h2 className="mb-2 font-medium">API Status</h2>
  //       </section>
  //     </div>
  //   </div>
  // );
}
