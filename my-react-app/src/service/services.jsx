import { useEffect, useState } from "react"

const useGenerateMeme = () => {
    const [memesData, setMemesData] = useState();

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
     .then(res => res.json())
     .then((data) => setMemesData(data.data.meme));
    },[]);
}