import { Users, ShoppingCart, DollarSign, Package } from "lucide-react"
import { StatsCard } from "@/Components/Admin/StatsCard"

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard title="Total Users" value="12,345" change="+12%" icon={<Users className="h-5 w-5" />} />
      <StatsCard title="Total Orders" value="1,234" change="+8%" icon={<ShoppingCart className="h-5 w-5" />} />
      <StatsCard title="Revenue" value="$34,567" change="+23%" icon={<DollarSign className="h-5 w-5" />} />
      <StatsCard title="Products" value="890" change="+5%" icon={<Package className="h-5 w-5" />} />
    </div>
  )
}