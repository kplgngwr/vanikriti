'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandReddit, IconBrandWhatsapp } from '@tabler/icons-react'
import { Share } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface SoilData {
    condition: 'good' | 'bad' | 'average'
    moisture: number
    nutrient: number
    pH: number
    salinity: number
    temperature: number
}

const plants = [
    {
        credits: 40,
        image: "https://res.cloudinary.com/dpagdxk01/image/upload/v1721824898/productpage-removebg-preview_wkmqy4.png",
        name: "JackFruit Tree"
    },
    {
        credits: 45,
        image: "https://res.cloudinary.com/dpagdxk01/image/upload/v1721824898/cartoon-plane-swietenia-macrophylla-shrub-tree-swietenia-mahagoni-woody-plant-hedge-mahogany-png-clipart-removebg-preview_trb5yf.png",
        name: "Mahogany Tree",
    },
    {
        credits: 50,
        image: "https://res.cloudinary.com/dpagdxk01/image/upload/v1721824898/lovepik-tree-png-image_400189300_wh1200-removebg-preview_po9sjt.png",
        name: "Teak Tree",
    },
    {
        credits: 35,
        image: "https://res.cloudinary.com/dpagdxk01/image/upload/v1721824898/images-removebg-preview_kdbtsj.png",
        name: "Ashoka Tree",
    },
]

export default function Apps() {
    const [data, setData] = useState<SoilData[]>([])

    const url =
        'https://indian-oil-68b1d-default-rtdb.asia-southeast1.firebasedatabase.app/.json'

    useEffect(() => {
        const fetchData = () => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        setData(Object.values(data))
                    }
                })
                .catch((error) => console.error('Error fetching data:', error))
        }

        fetchData() // Fetch data initially

        // Set up interval to fetch data periodically
        const interval = setInterval(fetchData, 1000) // Fetch data every 5 seconds

        // Clean up function
        return () => {
            clearInterval(interval) // Clear interval when component unmounts
        }
    }, [])

    return (
        <ScrollArea className='h-full'>
            <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
                <div>
                    <h1 className='text-2xl font-bold tracking-tight'>Soil Data</h1>
                    <p className='text-muted-foreground'>
                        Discover Your Soil&apos;s Secrets, Explore Detailed Data
                    </p>
                </div>
                <Separator className='my-4 shadow' />
                <section className="w-full max-w-6xl mx-auto py-8 md:py-12 lg:py-16 px-4 md:px-6">
                    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-7">

                            {plants.map((plant, index) => {
                                return <div className="bg-background rounded-lg overflow-hidden shadow-sm transition-all" key={index}>
                                    <Link href="#" className="block" prefetch={false}>
                                        <img src={plant.image} alt={`plant ${index}`} width={300} height={300} className="w-full h-60 object-contain" />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold">{plant.name}</h3>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className='w-full'>Get Details</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <ul className='no-scrollbar grid gap-4 p-4 grid-cols-1'>
                                                        <li className='grid items-center rounded-lg border bg-red-300 p-4 hover:shadow-md md:grid-cols-2 lg:grid-cols-3 w-full'>
                                                            <div className='p-4 text-center'>
                                                                <h1 className='text-2xl font-bold text-red-500'>Bad</h1>
                                                                <h2>Condition</h2>
                                                            </div>
                                                            <div className='p-4 text-center'>
                                                                <h1 className='text-2xl font-bold'>29.00</h1>
                                                                <h2 className='text-xl font-bold'>%</h2>
                                                                <h3>Moisture&nbsp;(%)</h3>
                                                            </div>
                                                            <div className='p-4 text-center'>
                                                                <h1 className='text-2xl font-bold'>8.10</h1>
                                                                <h2 className='text-xl font-bold'>pH</h2>
                                                                <h3>pH</h3>
                                                            </div>
                                                            <div className='p-4 text-center'>
                                                                <h1 className='text-2xl font-bold'>1.30</h1>
                                                                <h2 className='text-xl font-bold'>ms/cm</h2>
                                                                <h3>Salinity&nbsp;(mS/cm)</h3>
                                                            </div>
                                                            <div className='p-4 text-center'>
                                                                <h1 className='text-2xl font-bold'>36.53</h1>
                                                                <h2 className='text-xl font-bold'>°C</h2>
                                                                <h3>Temperature&nbsp;(°C)</h3>
                                                            </div>
                                                            <div className='p-4 text-center'>
                                                                <h1 className='text-2xl font-bold'>142.52</h1>
                                                                <h2 className='text-xl font-bold'>ppm</h2>
                                                                <h3>Nutrient&nbsp;(ppm)</h3>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </Link>
                                </div>
                            })
                            }
                        </div>
                    </div>
                </section>
            </div>
        </ScrollArea>
    )
}
