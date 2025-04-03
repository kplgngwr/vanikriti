'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BanknoteIcon, WalletIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { base } from "@/lib/base";

interface History {
  description: string;
  amount: number;
  status: string;
  _id: string;
  date: string;
}

export default function Page() {
  const [credits, setCredits] = useState(0);
  const [history, setHistory] = useState<History[]>([]);
  const { toast } = useToast();

  const addMoreCredits = async () => {
    try {
      const response = await axios.post(`${base}/api/v1/auth/add/credits/testing/${credits}`);
      toast({
        title: "Success",
        description: response.data.message,
      });
      window.location.reload();
      fetchCreditHistory();
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Failed",
        description: error.response?.data.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const fetchCreditHistory = async () => {
    try {
      const response = await axios.get(`${base}/api/v1/auth/credits/testing`);
      console.log("Fetched Credit History:", response.data.message);
      setHistory(response.data.message.reverse() || []);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Failed",
        description: error.response?.data.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const [userBalance, setUserBalance] = useState([]);

  const fetchUserBalance = async () => {
    try {
      const response = await axios.get(`${base}/api/v1/auth/balance/testing`)
      setUserBalance(response.data.message)
      console.log(response.data.message);

    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed",
        description: error.response?.data.message || "An error occurred",
        variant: "destructive",
      });
    }
  }

  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

  const handleVideoEnd = async () => {
    setIsVideoCompleted(true);
    try {
      const response = await axios.post(`${base}/api/v1/auth/add/credits/testing/10`);
      toast({
        title: "Success",
        description: response.data.message,
      });
      window.location.reload();
      fetchCreditHistory();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Failed",
        description: error.response?.data.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleVideoAbort = () => {
    if (!isVideoCompleted) {
      toast({
        title: "Error",
        description: "Please complete the video first."
      });
    }
  };

  useEffect(() => {
    fetchUserBalance()
    fetchCreditHistory();
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="grid gap-6 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-4">
          <div className="bg-muted rounded-lg p-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Current Balance</div>
              <div className="text-4xl font-bold">{userBalance} Credits</div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Balance</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  Add Money
                </DialogTitle>
                <div className="p-4 flex justify-around items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Watch Advertisement</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>
                        Watch Advertisement
                      </DialogTitle>
                      <div className="">
                        <video
                          className="border-4 border-gray-300 rounded-md shadow-lg"
                          width="800"
                          height="500"
                          autoPlay={true}
                          onEnded={handleVideoEnd}
                          onAbort={handleVideoAbort}
                        >
                          <source src="/1.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Through Bank or UPI</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>
                        Add Money
                      </DialogTitle>
                      <Card className="w-full max-w-md mx-auto">
                        <CardHeader>
                          <CardTitle>Add Money</CardTitle>
                          <CardDescription>Choose your preferred payment method to add funds to your account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 p-4">
                            <RadioGroup defaultValue="bank" className="grid grid-cols-2 gap-4">
                              <div>
                                <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                                <Label
                                  htmlFor="bank"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
                                >
                                  <BanknoteIcon className="mb-3 h-6 w-6" />
                                  Bank Transfer
                                </Label>
                              </div>
                              <div>
                                <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                                <Label
                                  htmlFor="upi"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
                                >
                                  <WalletIcon className="mb-3 h-6 w-6" />
                                  UPI
                                </Label>
                              </div>
                            </RadioGroup>
                            <div className="grid gap-2">
                              <Label htmlFor="amount">Amount</Label>
                              <Input
                                id="amount"
                                type="number"
                                placeholder="Enter amount"
                                name="amount"
                                value={credits}
                                onChange={(e) => setCredits(Number(e.target.value))}
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" onClick={addMoreCredits}>
                            Add Money
                          </Button>
                        </CardFooter>
                      </Card>
                    </DialogContent>
                  </Dialog>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View your recent transactions and account activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.length > 0 ? (
                    history.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className={item.amount > 0 ? "text-green-500" : "text-red-500"}>
                          {item.amount > 0 ? `+${item.amount}` : item.amount} Credits
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{item.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">No transaction history available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
