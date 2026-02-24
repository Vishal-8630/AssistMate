"use client"

import { useAuthStore } from "@/store/auth.store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AssistantServicesSection } from "@/features/services/components/AssistantServicesSection"

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)

  if (!user) return null

  const isAssistant = user.role.toLowerCase() === "assistant"

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email ?? "Not provided"}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </CardContent>
      </Card>

      {isAssistant && <AssistantServicesSection />}
    </div>
  )
}