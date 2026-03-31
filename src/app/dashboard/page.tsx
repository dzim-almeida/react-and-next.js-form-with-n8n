import DashboardView from "@/src/features/dashboard/DashboardView"

export default function DashboardPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <div className="w-full max-w-md">
                <DashboardView />
            </div>
        </main>
    )
}