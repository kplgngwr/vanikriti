'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import React from 'react';

const Page: React.FC = () => {

    const { toast } = useToast();

    const handleApplyForInsurance = () => {
        toast({
            title:"Success",
            description:"Your plant get covered in Insurance"
        })
    }

    const handleInsuranceClaim = () => {
        toast({
            title:"Success",
            description:"Claim your plant Insurance"
        })
    }

    return (
        <ScrollArea className='h-full'>
            <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
                <div>
                    <h1 className='text-2xl font-bold tracking-tight'>Get Your Plant Protected</h1>
                    <p className='text-muted-foreground'>
                        Explore our insurance policy to get your plant protected
                    </p>
                </div>
                <Separator className='shadow my-4' />
                <section className="w-full py-8 md:py-10 lg:py-12 px-4 md:px-6">
                    <div className=" bg-white rounded-lg">
                        <h1 className="text-3xl font-bold mb-6">Plant Protection Insurance Policy</h1>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                            <p className="mb-2">Our Plant Protection Insurance Policy ensures the safety and sustainability of the trees you plant through our platform.</p>
                            <p>This policy is designed to give you peace of mind, knowing that your contributions to afforestation are protected.</p>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Eligibility</h2>
                            <p>Users who have planted a minimum of 5 trees through the platform are eligible for this insurance policy.</p>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Coverage</h2>
                            <p className="mb-2">If more than 2 of the 5 planted trees are damaged or do not survive, the insurance policy will cover the loss.</p>
                            <p>For every damaged tree covered under this policy, we will plant 4 new trees to replace it.</p>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Process</h2>
                            <p className="mb-2">Regular monitoring and reporting will be conducted using our advanced monitoring technology.</p>
                            <p className="mb-2">Users will be notified about the status of their trees and any insurance claims that may be necessary.</p>
                            <p>Replacement trees will be planted in collaboration with local organizations to ensure proper care and growth.</p>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
                            <ul className="list-disc list-inside">
                                <li className="mb-1">Ensures the sustainability of your environmental contributions.</li>
                                <li className="mb-1">Provides an added layer of security and trust in our platform.</li>
                                <li>Encourages continued participation in our afforestation initiatives.</li>
                            </ul>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Example Scenario</h2>
                            <p className="mb-2">You plant 5 trees through our platform.</p>
                            <p className="mb-2">Unfortunately, 3 trees are damaged or do not survive.</p>
                            <p>Under the insurance policy, we will plant 12 new trees (4 trees for each of the 3 damaged ones).</p>
                        </section>

                        <section className='mb-6'>
                            <h2 className="text-2xl font-semibold mb-2">Claming Methods</h2>
                            <p className="mb-2">Get Now is for if your plant is not destroyed but you want to protect it</p>
                            <p className="mb-2">Claim Now is for if your plant is destroyed</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
                            <p className="mb-2">For more details or to report a claim, please contact our support team through the app or email us at <a href="mailto:support@afforestationplatform.com" className="text-blue-500">support@afforestationplatform.com</a>.</p>
                        </section>
                    </div>
                </section>
                <section className='flex items-center ml-4'>
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='mx-2'>Get New Plant Insurance</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <Card className='h-[70vh] overflow-auto'>
                                    <CardHeader>
                                        <CardTitle>New Plant Insurance</CardTitle>
                                        <CardDescription>Fill out this form to insure your new plant.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form className="grid gap-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input id="name" placeholder="Enter your name" required/>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="phone">Phone</Label>
                                                    <Input id="phone" type="tel" placeholder="Enter your phone number" required/>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" type="email" placeholder="Enter your email" required/>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="address">Address</Label>
                                                    <Textarea id="address" placeholder="Enter your address" required/>
                                                </div>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="plant-details">Plant ID</Label>
                                                <Input
                                                    id="plant-details"
                                                    placeholder="Give your plant ID provided by us"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="coverage">Coverage Plan</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select coverage plan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="basic">Basic</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="duration">Coverage Duration</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select coverage duration" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1-year">3 Month</SelectItem>
                                                        <SelectItem value="1-year">6 Month</SelectItem>
                                                        <SelectItem value="1-year">1 Year</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </form>
                                    </CardContent>
                                    <CardFooter>
                                        <Button type="submit" className="ml-auto" onClick={handleApplyForInsurance}>
                                            Apply for Insurance
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='mx-2'>Claim Your Plant Insurance</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <Card className='h-[70vh] overflow-auto'>
                                    <CardHeader>
                                        <CardTitle>Plant Insurance Claim</CardTitle>
                                        <CardDescription>Fill out this form to file a claim for your damaged plant.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form className="grid gap-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input id="name" placeholder="Enter your name" required/>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="phone">Phone</Label>
                                                    <Input id="phone" type="tel" placeholder="Enter your phone number" required/>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" type="email" placeholder="Enter your email" required/>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="address">Address</Label>
                                                    <Textarea id="address" placeholder="Enter your address" required/>
                                                </div>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="plant-details">Plant ID</Label>
                                                <Input id="plant-details" placeholder="Describe the damaged plant" required />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="plant-details">Plant Details</Label>
                                                <Textarea id="plant-details" placeholder="Describe the damaged plant" className="min-h-[100px]" required/>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="photos">Upload Photos</Label>
                                                <Input id="photos" type="file" multiple />
                                            </div>
                                        </form>
                                    </CardContent>
                                    <CardFooter>
                                        <Button type="submit" className="ml-auto"  onClick={handleInsuranceClaim}>
                                            Submit Claim
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>
            </div>
        </ScrollArea >
    );
};

export default Page;
