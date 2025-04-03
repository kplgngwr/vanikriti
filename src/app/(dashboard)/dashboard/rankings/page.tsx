import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/employee-tables/columns';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ranks } from './ranks';

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function Page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const employeeRes = ranks;
  const employee: Employee[] = employeeRes;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Rankings</h1>
          <p className='text-muted-foreground'>
            See where you stand globally
          </p>
        </div>
        <Separator />

        <EmployeeTable
          searchKey="country"
          pageNo={page}
          columns={columns}
          data={employee}
        />
      </div>
    </>
  );
}
