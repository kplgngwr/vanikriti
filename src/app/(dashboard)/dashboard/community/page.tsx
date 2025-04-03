'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Image, Heart, MessageCircle, Search, Share, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import dayjs from 'dayjs';
import { getInitials } from "@/helpers/extractInitials";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandReddit, IconBrandWhatsapp } from "@tabler/icons-react";
import { base } from "@/lib/base";

interface Posts {
  username: string;
  name: string;
  content: string;
  hashtags: string;
  image: string;
  createdAt: string;
}

export default function Page() {

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [isPostLoading, setIsPostLoading] = useState(false);

  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Posts[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !hashtags || !image) {
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    formData.append("hashtags", hashtags);
    if (session) {
      formData.append("username", session.user?.name || '');
      formData.append("name", session.user?.name || '');
    }
    formData.append("image", image);

    try {
      const response = await fetch(`${base}/api/v1/community/create`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        toast({
          title: "Success",
          description: "Post Created Successfully",
        })
        setContent('');
        setHashtags('');
        setImage(null);
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: `Error ${result.message}`,
          variant: "destructive"
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Error ${error.message}`,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false);
    }
  };


  const [posts, setPosts] = useState<Posts[]>([]);

  const fetchPost = async () => {
    setIsPostLoading(true);
    try {
      const response = await axios.get(`${base}/api/v1/community/all`);
      setPosts(response.data.message);
      setFilteredPosts(response.data.message.reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setIsPostLoading(false);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [])

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.hashtags.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, posts]);

  if (session) {
    return (
      <ScrollArea className="h-full">
        <div className="flex min-h-screen flex-col bg-background">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 sm:px-6 shadow-md">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Community"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full bg-muted pl-8 pr-4 focus:bg-background focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
          </header>
          <div className="flex flex-1">
            <main className="flex-1 border-r border-l">
              <div className="grid gap-4 p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={session.user?.image ?? ''}
                        alt={session.user?.name ?? ''}
                      />
                      <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <Input
                      type="text"
                      placeholder="What's happening?"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="flex-1 rounded-full bg-muted px-4 py-2 focus:bg-background focus:outline-none"
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder="Hashtags"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    className="flex-1 rounded-full bg-muted px-4 py-2 focus:bg-background focus:outline-none"
                  />
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full" onClick={handleFileInputClick}>
                        <Image className="h-5 w-5" />
                        <span className="sr-only">Add image</span>
                      </Button>
                      <Input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    <Button type="submit" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                      {isLoading ? <Loader2 className="animate-spin mx-auto w-full" /> : 'Post'}
                    </Button>
                  </div>
                </form>
                {isPostLoading ?
                  <div>
                    <Loader2 className="animate-spin" />
                  </div> : <div className="grid gap-4 max-w-3xl mx-auto">
                    {filteredPosts.map((post, index) => (
                      <Card key={index} className="border-0">
                        <div className="flex items-start gap-4 p-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={getInitials(post.name)} />
                            <AvatarFallback>{getInitials(post.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium">{post.name}</div>
                              {dayjs(post.createdAt).format('MMM D, YYYY h:mm A')}
                            </div>
                            <CardContent className="p-0">
                              <p>{post.content}</p>
                              <p className="text-blue-700 mt-4">{post.hashtags}</p>
                              {post.image && (
                                <img
                                  src={post.image}
                                  alt="Post Image"
                                  width={800}
                                  height={450}
                                  className="rounded-lg mt-4 object-cover w-full aspect-[16/9]"
                                />
                              )}
                            </CardContent>
                            <CardFooter className="flex items-center justify-between p-0 mt-2">
                              <Button variant="ghost" size="icon" className="rounded-full">
                                <Heart className="h-5 w-5" />
                                <span className="sr-only">Like</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="rounded-full">
                                <MessageCircle className="h-5 w-5" />
                                <span className="sr-only">Comment</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="rounded-full">
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
                              </Button>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                }
              </div>
            </main>
          </div>
        </div>
      </ScrollArea>
    );
  }
}
