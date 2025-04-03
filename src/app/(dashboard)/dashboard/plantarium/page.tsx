import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandReddit, IconBrandWhatsapp } from "@tabler/icons-react"
import { Download, Share } from "lucide-react"
import Link from "next/link"

const plants = [
    {
        credits: 40,
        image: "https://res.cloudinary.com/dpagdxk01/image/upload/v1721824898/productpage-removebg-preview_wkmqy4.png",
        name: "JackFruit Tree",
        details:"Rohit Yadav"
    },
    {
        credits: 45,
        image: "https://res.cloudinary.com/dpagdxk01/image/upload/v1721824898/cartoon-plane-swietenia-macrophylla-shrub-tree-swietenia-mahagoni-woody-plant-hedge-mahogany-png-clipart-removebg-preview_trb5yf.png",
        name: "Mahogany Tree",
        details:"Kapil Gangwar"
    },
    {
        credits: 50,
        image: "https://res.cloudinary.com/dpagdxk01/image/upload/v1721824898/lovepik-tree-png-image_400189300_wh1200-removebg-preview_po9sjt.png",
        name: "Teak Tree",
        details:"Ashit Rai"
    },
    {
        credits: 35,
        image: "https://res.cloudinary.com/dpagdxk01/image/upload/v1721824898/images-removebg-preview_kdbtsj.png",
        name: "Ashoka Tree",
        details:"Shashank MS"
    },
]

export default function Page() {
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
                <div>
                    <h1 className='text-2xl font-bold tracking-tight'>Get Your Plant Images</h1>
                    <p className='text-muted-foreground'>
                        Explore your plant images with different stages
                    </p>
                </div>
                <Separator />
                <div className="w-full max-w-6xl mx-auto p-6 md:p-10">
                    <section className="w-full max-w-6xl mx-auto py-8 md:py-12 lg:py-16 px-4 md:px-6">
                        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-7">
                                {plants.map((plant, index) => {
                                    return <div className="bg-background rounded-lg overflow-hidden shadow-sm transition-all" key={index}>
                                        <Link href="#" className="block" prefetch={false}>
                                            <img src={plant.image} alt={`plant ${index}`} width={300} height={300} className="w-full h-60 object-contain" />
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold">{plant.name}</h3>
                                                <p className="text-muted-foreground text-sm mt-1"><span className="font-bold text-black">Planted By</span> {plant.details}</p>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button>Get Details</Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <div className="flex items-center justify-between mb-6">
                                                            <div className="flex items-center gap-4">
                                                                <Avatar className="w-10 h-10">
                                                                    <AvatarImage src="/palm-tree.png" />
                                                                    <AvatarFallback>KY</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <div className="font-medium">Kapil Yadav</div>
                                                                    <div className="text-sm text-muted-foreground">Sector 43, Open Ground</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <Dialog>
                                                                    <DialogTrigger asChild>
                                                                        <Button variant="ghost" size="icon">
                                                                            <Share className="w-5 h-5" />
                                                                            <span className="sr-only">Share</span>
                                                                        </Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent className="grid w-[800px] h-64 gap-2 p-4 bg-background rounded-md shadow-lg">
                                                                        <div className="text-sm font-medium">Share on</div>
                                                                        <div className="grid grid-cols-3 gap-2">
                                                                            <p className="cursor-pointer flex flex-col justify-center items-center p-3 rounded-md hover:bg-muted">
                                                                                <IconBrandInstagram className="w-10 h-10" />
                                                                                <span className="">Instagram</span>
                                                                            </p>
                                                                            <p className="cursor-pointer flex flex-col justify-center items-center p-3 rounded-md hover:bg-muted">
                                                                                <IconBrandFacebook className="w-10 h-10" />
                                                                                <span className="">Facebook</span>
                                                                            </p>
                                                                            <p className="cursor-pointer flex flex-col justify-center items-center p-3 rounded-md hover:bg-muted">
                                                                                <IconBrandWhatsapp className="w-10 h-10" />
                                                                                <span className="">WhatsApp</span>
                                                                            </p>
                                                                            <p className="cursor-pointer flex flex-col justify-center items-center p-3 rounded-md hover:bg-muted">
                                                                                <IconBrandLinkedin className="w-10 h-10" />
                                                                                <span className="">LinkedIn</span>
                                                                            </p>
                                                                            <p className="cursor-pointer flex flex-col justify-center items-center p-3 rounded-md hover:bg-muted">
                                                                                <IconBrandReddit className="w-10 h-10" />
                                                                                <span className="">Reddit</span>
                                                                            </p>
                                                                        </div>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </div>
                                                        </div>
                                                        <div className="bg-white mx-auto p-8">
                                                            <div className="relative overflow-hidden rounded-lg">
                                                                <ScrollArea className="h-[500px]">
                                                                    <div className="grid grid-cols-1 gap-6">
                                                                        <div className="relative group">
                                                                            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                                                                                <span className="sr-only">View</span>
                                                                            </Link>
                                                                            <img
                                                                                src="https://i.ytimg.com/vi/J8QVJsd49os/maxresdefault.jpg"
                                                                                alt="Plant Progress"
                                                                                width={600}
                                                                                height={400}
                                                                                className="object-cover w-full h-60 rounded-lg"
                                                                            />
                                                                            <div className="p-4 bg-background">
                                                                                <h3 className="text-lg font-semibold">Seedling Stage</h3>
                                                                                <p className="text-sm text-muted-foreground">April 15, 2024</p>
                                                                                <p className="text-sm">The plant has just sprouted and is in the early seedling stage.</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="relative group">
                                                                            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                                                                                <span className="sr-only">View</span>
                                                                            </Link>
                                                                            <img
                                                                                src="https://www.bangaloreagrico.in/wp-content/uploads/2017/05/blackandrews-mango-2years.jpg"
                                                                                alt="Plant Progress"
                                                                                width={600}
                                                                                height={400}
                                                                                className="object-cover w-full h-60 rounded-lg"
                                                                            />
                                                                            <div className="p-4 bg-background">
                                                                                <h3 className="text-lg font-semibold">Vegetative Stage</h3>
                                                                                <p className="text-sm text-muted-foreground">May 1, 2024</p>
                                                                                <p className="text-sm">The plant is now in the vegetative stage, with healthy leaves and stems.</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="relative group">
                                                                            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                                                                                <span className="sr-only">View</span>
                                                                            </Link>
                                                                            <img
                                                                                src="https://images.meesho.com/images/products/282536514/xhthd_512.webp"
                                                                                alt="Plant Progress"
                                                                                width={600}
                                                                                height={400}
                                                                                className="object-cover w-full h-60 rounded-lg"
                                                                            />
                                                                            <div className="p-4 bg-background">
                                                                                <h3 className="text-lg font-semibold">Flowering Stage</h3>
                                                                                <p className="text-sm text-muted-foreground">June 1, 2024</p>
                                                                                <p className="text-sm">The plant has entered the flowering stage, with beautiful blooms.</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="relative group">
                                                                            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                                                                                <span className="sr-only">View</span>
                                                                            </Link>
                                                                            <img
                                                                                src="https://www.agrifarming.in/wp-content/uploads/Kesar_Mango_Farming1.jpg"
                                                                                alt="Plant Progress"
                                                                                width={600}
                                                                                height={400}
                                                                                className="object-cover w-full h-60 rounded-lg"
                                                                            />
                                                                            <div className="p-4 bg-background">
                                                                                <h3 className="text-lg font-semibold">Fruiting Stage</h3>
                                                                                <p className="text-sm text-muted-foreground">July 1, 2024</p>
                                                                                <p className="text-sm">The plant is now producing delicious fruits, ready for harvest.</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </ScrollArea>
                                                            </div>
                                                        </div>
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
            </div>
        </ScrollArea>
    )
}




