import { useState } from "react";
import { Bell, Play, Calendar, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: 'new_episode' | 'recommendation' | 'reminder';
  title: string;
  message: string;
  time: string;
  image?: string;
  read: boolean;
}

const NotificationModal = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "new_episode",
      title: "New Episode Available",
      message: "Season 2 Episode 5 of 'Galactic Odyssey' is now streaming",
      time: "2 hours ago",
      image: "/placeholder.svg",
      read: false
    },
    {
      id: "2",
      type: "recommendation",
      title: "Recommended for You",
      message: "Based on your viewing history, you might like 'Dark Covenant'",
      time: "1 day ago",
      image: "/placeholder.svg",
      read: false
    },
    {
      id: "3",
      type: "reminder",
      title: "Watch Reminder",
      message: "Don't forget to finish 'Eternal Promises' - only 20 minutes left",
      time: "2 days ago",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'new_episode':
        return <Play className="h-4 w-4 text-primary" />;
      case 'recommendation':
        return <Star className="h-4 w-4 text-gold" />;
      case 'reminder':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative hover:bg-card/50">
          <Bell className="h-5 w-5 text-foreground" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 bg-card border-border shadow-lg z-50" 
        align="end"
        forceMount
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {unreadCount} new
              </Badge>
            )}
          </div>
          
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative p-3 rounded-lg border transition-all duration-200 hover:bg-accent/50 ${
                    notification.read 
                      ? 'bg-card border-border opacity-75' 
                      : 'bg-accent/20 border-primary/30'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {notification.message}
                      </p>
                      
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.time}
                      </p>
                    </div>
                    
                    {notification.image && (
                      <img
                        src={notification.image}
                        alt=""
                        className="w-12 h-12 rounded object-cover flex-shrink-0"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {notifications.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-primary hover:bg-primary/20"
                onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
              >
                Mark all as read
              </Button>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationModal;