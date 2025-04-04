'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { base } from '@/lib/base';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Plant {
  _id: string;
  credits: number;
  image: string;
  name: string;
  content: string;
}

export default function Page() {

  const { toast } = useToast()
  const router = useRouter;

  const [isLoading, setIsLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const [plants, setPlants] = useState<Plant[]>([]);

  const fetchPlants = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base}/api/v1/plant/all`);
      setPlants(response.data.message);
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
    fetchPlants();
  }, [])

  const handlePlantPurchase = async (plantID: string) => {
    setIsPurchasing(true);
    setIsLoading(false);
    try {
      const response = await axios.post(`${base}/api/v1/auth/purchase/plant/testing/${plantID}`);
      toast({
        title: "Success",
        description: response.data.message
      })
      window.location.reload()
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed",
        description: error.response?.data.message,
        variant: 'destructive'
      })
    } finally {
      setIsPurchasing(false);
    }
  }

  return (
    <>
      <ScrollArea className='h-full'>
        <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
          <div>
            <h1 className='text-2xl font-bold tracking-tight'> Discover Our Plant Collection</h1>
            <p className='text-muted-foreground'>
              Explore our diverse range of plants, each with its own unique charm and character.
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
                  {plants.map((plant, index) => {
                    return <div className="bg-background rounded-lg overflow-hidden shadow-sm transition-all" key={index}>
                      <Link href="#" className="block" prefetch={false}>
                        <img src={plant.image} alt={`plant ${index}`} width={300} height={300} className="w-full h-60 object-contain" />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{plant.name}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{plant.content}</p>
                          <p className="font-bold text-lg mt-1">{plant.credits} Credits</p>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button className='mt-2'>Purchase Now</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This action use your credits to purchase this plant.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handlePlantPurchase(plant._id)}>
                                  {isPurchasing ? <Loader2 className='animate-spin' /> : 'Continue'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
