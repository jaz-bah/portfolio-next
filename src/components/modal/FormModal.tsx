import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

interface Props {
  title: string,
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  children: React.ReactNode
}

export default function FormModal({title, state, setState, children}: Props) {
  return (
    <Dialog open={state} onOpenChange={() => setState(!state)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
