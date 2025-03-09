"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

import UserAvatar from "./use-avatar";
import { useRouter } from "next/navigation";
import IssueDetailsDialog from "@/components/issue-details-dialog";

const priorityColor = {
  LOW: "border-green-600",
  MEDIUM: "border-yellow-300",
  HIGH: "border-orange-400",
  URGENT: "border-red-400",
};

export default function IssueCard({
  issue,
  showStatus = false,
  onDelete = () => { },
  onUpdate = () => { },

}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const router = useRouter();




  const created = formatDistanceToNow(new Date(issue.createdAt), {
    addSuffix: true,
  });
  const onDeleteHandler = (...params) => {
    router.refresh();
    onDelete(...params);
  };

  const onUpdateHandler = (...params) => {
    router.refresh();
    onUpdate(...params);
  };
  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader
          className={`border-t-5 -mt-6  ${priorityColor[issue.priority]} rounded-lg`}
        >
          <CardTitle className="mt-6">{issue.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-4 -mt-1">
          {showStatus && <Badge>{issue.status}</Badge>}
          <Badge variant="outline" className="-ml-2">
            {issue.priority}
          </Badge>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-3">
          <UserAvatar user={issue.assignee} />

          <div className="text-xs text-gray-400 w-full">Created {created}</div>
        </CardFooter>
      </Card>

      {isDialogOpen && (
        <IssueDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          issue={issue}
          onDelete={onDeleteHandler}
          onUpdate={onUpdateHandler}
          borderCol={priorityColor[issue.priority]}
        />

      )}
    </>
  );
}