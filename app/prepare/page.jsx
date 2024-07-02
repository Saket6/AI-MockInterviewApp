"use client"
import React, { useEffect, useState } from 'react'
import { searchPlaylists } from '../Utils/Youtube'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function Page() {

  const [playlists, setPlayLists] = useState();
  const [topics, setTopics] = useState("like aptitude, English Speaking Skills, etc.");

  const getPlayLists = async () => {
    console.log("These are the topics:", topics);
    const results = await searchPlaylists(topics);
    console.log(results);
    setPlayLists(results);
  }

  useEffect(() => {
    getPlayLists();
  }, [])

  return (
    <div>
      <div>Prepare for interview</div>

      <div>
        <h2 className="text-base md:text-2xl grid md:grid-cols-2 font-bold mb-4">
          <span className='flex  justify-start items-center'>
            Playlists for Interview Preparation
          </span>
          <div className='flex gap-2 md:mt-0 mt-4  items-center ' >
            <Input
              className="h-full w-full py-3"
              placeholder="Search for YouTube playlists"
              onChange={(e) => {
                setTopics(e.target.value)
              }}
            />

            <Button onClick={getPlayLists} >Search</Button>

          </div>

        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists?.map((playlist) => (
            <div key={playlist.id.playlistId} className="bg-neutral-900 border-2 border-neutral-800 shadow-md rounded-lg overflow-hidden">
              <div className="relative z-0  w-full pb-56">
                <iframe
                  className="absolute z-0 top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/videoseries?list=${playlist.id.playlistId}`}
                  title={playlist.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold">{playlist.snippet.title}</h3>
                <p className="text-gray-400">{playlist.snippet.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page