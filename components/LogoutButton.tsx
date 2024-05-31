import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button variant={'link'} className="py-2 px-4 rounded-md bg-btn-background hover:bg-btn-background-hover text-foreground">
        Logout
      </Button>
    </form>
  )
}
