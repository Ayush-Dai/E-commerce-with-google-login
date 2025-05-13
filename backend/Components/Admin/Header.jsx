import { 
    Bell, 
    Search, 
    Menu,
    UserCircle,
    Settings,
    LogOut
  } from "lucide-react"
  import { Button } from "@/Components/ui/button"
  import { Input } from "@/Components/ui/input"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/Components/ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
  import { Badge } from "@/Components/ui/badge"
  import { NotificationItem } from "@/Components/Admin/NotificationItem"
  
  export default function Header({ setSidebarOpen }) {
    return (
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          <div className="flex items-center flex-1 px-4 md:px-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  <NotificationItem title="New user registered" time="2 minutes ago" read={false} />
                  <NotificationItem title="New order received" time="1 hour ago" read={false} />
                  <NotificationItem title="Server update completed" time="2 hours ago" read={true} />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
  
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    )
  }
  