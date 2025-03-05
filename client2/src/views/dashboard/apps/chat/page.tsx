
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActionDropdown from "./action-dropdown";
import ChatList from "./chat-list";
import ChatContent from "./chat-content";

export default function ChatPage() {
  const chats_with_user: any = []

  return (
    <div className="gap-8 lg:flex">
      <div className="w-full lg:w-96">
        <Card>
          <CardHeader className="py-4 lg:py-6">
            <div className="flex items-center justify-between">
              <CardTitle className="font-bold">Chats</CardTitle>
              <ActionDropdown />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ChatList chats={chats_with_user} />
          </CardContent>
        </Card>
      </div>
      <div className="flex-grow">
        <ChatContent />
      </div>
    </div>
  );
}
