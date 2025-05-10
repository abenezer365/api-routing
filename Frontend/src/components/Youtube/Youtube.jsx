import React from 'react'
import { useState, useEffect } from 'react'
import './Youtube.css'
import axios from 'axios'

function Youtube() {
    const [result, setResult] = useState([])
    const [sort, setSort] = useState('date')
    const [loading,setLoading] = useState(true)
    const [type, setType] = useState('Latest')
    const API = 'AIzaSyBsZWd2qZ-BwWM00QyGG50M7bQ6Zsi2tBw'
    const id ='UCE_M8A5yxnLfW0KghEeajjw'
    useEffect(()=>{
      setLoading(true)
      axios(`https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${id}&part=snippet,id&order=${sort}&maxResults=12`)
       .then((data) => {setResult(() =>data.data.items); setLoading(false)})
       .catch(error => {console.error('Error fetching data:', error); setLoading(false) });
    },[sort])

  return (
    <> 
    <br />
    <br />
    <br />

        <h1>{type} Videos </h1>
        <div className="controls">
          <label htmlFor="sortby">Sort by: </label>
          <select name="sortby" id="sortby"  onChange={(e)=> {setSort(e.target.value); setType(e.target.options[e.target.selectedIndex].text)}}>
                      <option value='date'>Latest</option>
                      <option value='viewCount'>Most viewed</option>
                      <option value='rating'>Top rated</option>
          </select>
        </div>
    {loading ? 
    (<div className="loading">Loading videos...</div> ) : 
    result.length === 0 ?  
    <div className="empty">No videos found</div> : 
    (<div className="video-grid">
      {result?.map((item)=>{
        return (
        <a key={item.id.videoId} href={`https://www.youtube.com/watch?v=${item.id.videoId}`} rel="noopener noreferrer" target='blank'>
            <div className="video-card" >
                <img className="thumbnail" src={item.snippet.thumbnails.high.url} alt="Video Thumbnail" />
                <div className="video-title">{item.snippet.title}</div>
                <div className="video-description">{item.snippet.description}</div>
                <div className="video-date">Published: {item.snippet.publishTime}</div>
            </div>
        </a>
        )})}
      </div>)}
      <br />
      <br />
      </>
  )
}

export default Youtube
