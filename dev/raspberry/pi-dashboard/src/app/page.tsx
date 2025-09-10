import SensorDashboard from "@/app/components/SensorDashboard";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <SensorDashboard />
    </main>
  );
}
