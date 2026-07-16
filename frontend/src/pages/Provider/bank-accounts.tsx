import { createFileRoute } from "@tanstack/react-router";
import BankAccounts from "@/Provider/bank-accounts";

export const Route = createFileRoute("/Provider/bank-accounts")({
  component: BankAccounts,
});
