import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut, Heart, History, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserModal = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg"
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-card/50">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-card border-border shadow-lg z-50" 
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-foreground">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
          onClick={() => navigate("/my-list")}
        >
          <Heart className="mr-2 h-4 w-4" />
          <span>My List</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
          onClick={() => navigate("/watch-history")}
        >
          <History className="mr-2 h-4 w-4" />
          <span>Watch History</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Subscription</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem className="text-foreground hover:bg-destructive hover:text-destructive-foreground cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserModal;