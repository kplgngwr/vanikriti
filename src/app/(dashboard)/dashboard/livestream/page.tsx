'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

// Declare the YT namespace
declare global {
    interface Window {
        YT: {
            Player: new (
                elementId: string,
                options: {
                    height: string;
                    width: string;
                    videoId: string;
                    playerVars: {
                        autoplay: number;
                        controls: number;
                    };
                }
            ) => YT.Player;
        };
        onYouTubeIframeAPIReady: () => void;
    }
}

interface YT {
    Player: {
        prototype: {
            playVideo: () => void;
            pauseVideo: () => void;
            mute: () => void;
            unMute: () => void;
        };
    };
}

const Page: React.FC = () => {
    const videoId = 'WCUtruXyrc0'
    const playerRef = useRef<YT.Player | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Load the IFrame Player API code asynchronously.
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        // Create an <div> (instead of <iframe>) with id="player"
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('player', {
                height: '80%',
                width: '81%',
                videoId: videoId,
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                },
            });
        }
    }, []);

    const playVideo = () => {
        playerRef.current?.playVideo();
    };

    const stopVideo = () => {
        playerRef.current?.pauseVideo();
    };

    const toggleMute = () => {
        if (isMuted) {
            playerRef.current?.unMute();
        } else {
            playerRef.current?.mute();
        }
        setIsMuted(!isMuted);
    };

    return (
        <ScrollArea className='h-full'>
            <div className="container mx-auto p-4">
                <div>
                    <h1 className='text-2xl font-bold tracking-tight'>Live Stream</h1>
                    <p className='text-muted-foreground'>
                        See your plant weekly
                    </p>
                </div>
                <div className="aspect-w-16 aspect-h-9 my-4">
                    <div id="player" className="w-[81%] h-[80vh] mx-auto rounded-lg"></div>
                </div>
                <div className='flex justify-around items-center'>
                    <Button onClick={playVideo}>Play Video</Button>
                    <Button onClick={stopVideo}>Stop Video</Button>
                    <Button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</Button>
                </div>
            </div>
        </ScrollArea>
    )
}

export default Page
