import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card"
import { SimpleBarChart } from "@/Components/Admin/SimpleBarChart"

export function RevenueChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue for the current year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <SimpleBarChart />
        </div>
      </CardContent>
    </Card>
  )
}