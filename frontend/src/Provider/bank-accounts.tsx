import { useState } from "react";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { toast } from "sonner";
import { CreditCard, Plus, Check, Landmark, AlertCircle } from "lucide-react";

interface BankAccount {
  id: string;
  bankName: string;
  accountType: string;
  accountNumber: string;
  ifsc: string;
  isPrimary: boolean;
}

function BankAccounts() {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "HDFC Bank",
      accountType: "Savings",
      accountNumber: "•••• •••• 9876",
      ifsc: "HDFC0001209",
      isPrimary: true,
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountType, setAccountType] = useState("Savings");

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName.trim() || !accountNumber.trim() || !ifsc.trim()) {
      toast.error("Please fill in all details");
      return;
    }

    const maskedNumber = accountNumber.length > 4
      ? `•••• •••• ${accountNumber.slice(-4)}`
      : `•••• •••• ${accountNumber}`;

    const newAcc: BankAccount = {
      id: Date.now().toString(),
      bankName: bankName.trim(),
      accountType,
      accountNumber: maskedNumber,
      ifsc: ifsc.trim().toUpperCase(),
      isPrimary: accounts.length === 0,
    };

    setAccounts([...accounts, newAcc]);
    setBankName("");
    setAccountNumber("");
    setIfsc("");
    setShowAddForm(false);
    toast.success("Bank account added successfully!");
  };

  const handleSetPrimary = (id: string) => {
    setAccounts(
      accounts.map((acc) => ({
        ...acc,
        isPrimary: acc.id === id,
      }))
    );
    toast.success("Primary payout account updated.");
  };

  return (
    <MobileShell hideNav>
      <TopBar title="Bank Accounts" back backTo="/Provider/more" />

      <div className="px-5 pt-4 pb-8 space-y-4 bg-[#F8F9FA] min-h-[calc(100vh-60px)]">
        {/* Info Box */}
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex gap-3">
          <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground leading-relaxed">
            Earnings are automatically swept and paid out to your **Primary** bank account every Tuesday.
          </div>
        </div>

        {/* Add Account Trigger */}
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-3 bg-white border border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Plus className="w-4 h-4 text-slate-500" /> Link New Bank Account
          </button>
        ) : (
          <form onSubmit={handleAddAccount} className="bg-white rounded-2xl p-4 shadow-card border border-slate-100 space-y-3">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Bank Details</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Bank Name (e.g., ICICI Bank)"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-slate-50 font-medium"
              />
              <div className="flex gap-2">
                {["Savings", "Current"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAccountType(type)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border ${accountType === type
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-slate-50 border-slate-100 text-slate-500"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                required
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-slate-50 font-medium"
              />
              <input
                type="text"
                placeholder="IFSC Code"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-slate-50 font-medium uppercase"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Link Account
              </button>
            </div>
          </form>
        )}

        {/* Linked accounts */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-1">
            LINKED BANK ACCOUNTS ({accounts.length})
          </p>

          {accounts.map((acc) => (
            <div
              key={acc.id}
              className={`bg-white rounded-2xl p-4 shadow-card border relative overflow-hidden transition-all duration-200 ${acc.isPrimary ? "border-primary/30 ring-1 ring-primary/20" : "border-slate-100"
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Landmark className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800">{acc.bankName}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{acc.accountType} Account</p>
                  </div>
                </div>
                {acc.isPrimary && (
                  <span className="bg-primary/10 text-primary text-[9px] font-black px-2 py-0.5 rounded-md">
                    PRIMARY
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
                <div>
                  <p className="text-xs font-bold text-slate-700">{acc.accountNumber}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">IFSC: {acc.ifsc}</p>
                </div>
                {!acc.isPrimary && (
                  <button
                    onClick={() => handleSetPrimary(acc.id)}
                    className="text-[10px] font-extrabold text-primary hover:text-primary-dark hover:underline transition-all flex items-center gap-1"
                  >
                    Set as Primary
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

export default BankAccounts;
