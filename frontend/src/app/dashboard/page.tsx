import Footer from '@components/layout/footer';
import Header from '@components/layout/header';
import ExpenseCard from '@components/cards/expenseCard';
import BudgetCard from '@components/cards/budgetCard';
import SubscriptionCard from '@components/cards/subscriptionCard';
import TransactionCard from '@components/cards/transactionCard';
import { ExpenseBreakdownCard } from '@components/cards/pieChartBreakdownCard';
import PeriodCard from '@components/cards/periodCard';

export default function Dashboard() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 max-h-2xl'>
          <PeriodCard />
          <ExpenseCard />
          <BudgetCard />
          <SubscriptionCard />
        </div>
        <div className='w-full grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
          <TransactionCard />
          <ExpenseBreakdownCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
