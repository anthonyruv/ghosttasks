import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";

interface CardItemProps {
    card: {
      id: number;
      title: string;
      tag: string;
      description: string;
      created_at: string;
    };
  }

const CardItem = ({ card }: CardItemProps) => {
    const getDayName = (date: Date) => {
        const formattedDate = new Date(date).toLocaleString('en-US', {
          weekday: 'long', // Full day name (e.g., Wednesday)
          hour: 'numeric', // Numeric hour (e.g., 4)
          minute: 'numeric', // Numeric minute (e.g., 01)
          hour12: true, // Use 12-hour time format with AM/PM
        });
      
        return formattedDate;
    };
    const getDayNumber = (date: Date) => {
      const numericDate = new Date(date).toLocaleDateString('en-US', {
        year: '2-digit', // Two-digit year (e.g., 23)
        month: '2-digit', // Two-digit month (e.g., 09)
        day: '2-digit', // Two-digit day (e.g., 10)
    });
    return numericDate;
    }
    return (
        <Dialog>
            <DialogTrigger>
        <Card className="w-96 hover:opacity-70 hover:cursor-pointer ease-in duration-300 rounded-sm rounded-b-none bg-background dark:border-stone-400">
                <CardHeader className="flex flex-row truncate relative">
                    <div className="flex flex-col gap-2">
                    <CardTitle className="truncate font-inter text-lg text-foreground">{card.title}</CardTitle>
                    </div>
                    {card?.tag === 'todo' ? <Badge className="absolute top-4 right-4 py-1 px-2 bg-blue-200 text-blue-500 shadow-md shadow-blue-200 rounded-full">To Do</Badge>: card?.tag === 'inprogress' ? <Badge className="absolute top-4 right-4 py-1 px-2 bg-blue-200 text-blue-500 shadow-md shadow-blue-200 dark:shadow-xs rounded-full">In Progress</Badge> : card?.tag === 'done' ? <Badge className="absolute top-4 right-4 py-1 px-2 bg-green-200 text-green-800 shadow-md shadow-green-200 dark:shadow-xs rounded-full">Done</Badge> : null}
                </CardHeader>
                <CardFooter className="flex space-x-4"><p className="text-sm text-muted-foreground">{card.description}</p>
                </CardFooter>
              </Card>
              <Badge className="py-1 font-jetbrains-mono w-full rounded-t-none flex justify-between bg-background text-foreground dark:border dark:border-slate-400"><p>{getDayName(new Date(card.created_at))}</p><p>{getDayNumber(new Date(card.created_at))}</p></Badge>
              </DialogTrigger>
              <DialogContent className="w-80" >
                <DialogHeader className="font-bold">Edit task.</DialogHeader>
                
              </DialogContent>
              </Dialog>
    );
}

export default CardItem;


const CustomButtons = () => {
    return (
        <Button>
            Enter
        </Button>
    );
}