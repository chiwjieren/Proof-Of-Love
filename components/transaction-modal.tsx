"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TransactionStep {
  title: string
  status: "pending" | "success" | "error"
}

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  steps: TransactionStep[]
  currentStep: number
  title: string
}

export function TransactionModal({ isOpen, onClose, steps, currentStep, title }: TransactionModalProps) {
  const allComplete = steps.every((step) => step.status === "success")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Please wait while we process your transaction</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {step.status === "success" ? (
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                ) : step.status === "error" ? (
                  <XCircle className="w-6 h-6 text-destructive" />
                ) : index === currentStep ? (
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-muted" />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    step.status === "success"
                      ? "text-primary"
                      : step.status === "error"
                        ? "text-destructive"
                        : index === currentStep
                          ? "text-foreground"
                          : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {allComplete && (
          <div className="space-y-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="font-medium text-primary">Transaction Complete!</p>
            </div>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
