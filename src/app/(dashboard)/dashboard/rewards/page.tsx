import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const data = [
    {
        title: "Plant a Tree for Every Purchase",
        description: "We will plant a tree for every purchase made.",
        image: "https://img.lovepik.com/free-template/bg/20190512/bg/cf11ca9d9f33d.png_detail.jpg!wh650",
        code: "PLANTATREE"
    },
    {
        title: "10% Off on Eco-Friendly Products",
        description: "Get 10% off on all eco-friendly products.",
        image: "https://cdn.create.vista.com/downloads/3a112b11-dd53-4e91-98d5-d23920ec099f_640.jpeg",
        code: "ECO10"
    },
    {
        title: "Buy One Get One Free on Seedlings",
        description: "Buy one seedling and get another one for free.",
        image: "https://www.geelfloricultura.com/media/2023/05/coupon-1.png",
        code: "BOGOSEED"
    },
    {
        title: "Free Tree Care Guide with Purchase",
        description: "Receive a free tree care guide with any purchase.",
        image: "https://marketplace.canva.com/EAFA7rXq4JI/1/0/1131w/canva-green-minimalist-discount-coupon-zLDs5Gq4QpE.jpg",
        code: "FREEGUIDE"
    },
    {
        title: "20% Off on All Gardening Tools",
        description: "Enjoy 20% off on all gardening tools.",
        image: "https://thealohahut.com/wp-content/uploads/2024/04/Mothers-Day-Gift-Flower-Coupons_1.webp",
        code: "GARDEN20"
    },
]

const Page = () => {
    return (
        <ScrollArea className='h-full'>
            <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
                <div>
                    <h1 className='text-2xl font-bold tracking-tight'>Your Rewards</h1>
                    <p className='text-muted-foreground'>
                        Explore your rewards you got from planting trees
                    </p>
                </div>
                <Separator className='shadow my-4' />
                <section className="w-full py-8 md:py-12 lg:py-16 px-4 md:px-6">
                    <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
                        {data.map((reward, index) => {
                            return <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md" key={index}>
                                <img
                                    src={reward.image}
                                    alt="Reward Image"
                                    width={400}
                                    height={300}
                                    className="h-56 w-full object-cover transition-all group-hover:scale-105"
                                />
                                <div className="p-6">
                                    <h3 className="mb-2 text-xl font-semibold">{reward.title}</h3>
                                    <div className="mb-4 text-muted-foreground">{reward.description}</div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button className="w-full">Claim Coupon</Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="space-y-2 rounded-md bg-background p-4 shadow-lg">
                                            <div className="text-center font-semibold">Your coupon code is:</div>
                                            <div className="rounded-md bg-muted px-4 py-2 text-center font-mono text-lg font-bold">{reward.code}</div>
                                            <div className="text-center text-sm text-muted-foreground">Copy and use this code at checkout.</div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                        })}
                    </div>
                </section>
            </div>
        </ScrollArea>
    )
}

export default Page