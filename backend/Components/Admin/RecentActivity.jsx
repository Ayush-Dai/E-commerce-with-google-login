import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card"
import { ActivityItem } from "@/Components/Admin/ActivityItem"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest activities on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ActivityItem
            title="New user registered"
            description="John Doe created a new account"
            time="2 minutes ago"
          />
          <ActivityItem 
            title="New order placed" 
            description="Order #12345 was placed" 
            time="1 hour ago" 
          />
          <ActivityItem
            title="Payment received"
            description="Payment for order #12344 received"
            time="3 hours ago"
          />
          <ActivityItem
            title="Product updated"
            description="iPhone 13 Pro stock updated"
            time="5 hours ago"
          />
        </div>
      </CardContent>
    </Card>
  )
}
