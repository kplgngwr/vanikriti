'use client'

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { base } from '@/lib/base';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Inventory {
  _id: string;
  image: string;
  name: string;
  number: number;
}

export default function Page() {

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [inventory, setInventory] = useState<Inventory[]>([]);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base}/api/v1/auth/inventory/testing`);
      setInventory(response.data.message);
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed",
        description: error.response?.data.message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchInventory();
  }, [])

  return (
    <>
      <ScrollArea className='h-full'>
        <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Purchased Items</h1>
            <p className='text-muted-foreground'>
              Explore your purchased items including plants and caring.
            </p>
          </div>
          <Separator />
          <section className="w-full max-w-6xl mx-auto py-8 md:py-12 lg:py-16 px-4 md:px-6">
            {isLoading ?
              <div>
                <Loader2 className='animate-spin' />
              </div>
              :
              <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-7">
                  {inventory.map((item, index) => {
                    return <div className="bg-background rounded-lg overflow-hidden shadow-sm transition-all" key={index}>
                      <Link href="#" className="block" prefetch={false}>
                        <img src={item.image} alt={`plant ${index}`} width={300} height={300} className="w-full h-60 object-contain object-center rounded-lg" />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-muted-foreground text-base mt-1">{item.number} Left</p>
                        </div>
                      </Link>
                    </div>
                  })
                  }
                </div>
              </div>
            }
          </section>
        </div>
      </ScrollArea>
    </>
  );
}
