import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DebugSessionPage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Session Debug</h1>
            <pre className="bg-gray-100 p-4 rounded border">
                {JSON.stringify(session, null, 2)}
            </pre>
            <div className="mt-4">
                <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
                <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXTAUTH_URL}</p>
            </div>
        </div>
    );
}
