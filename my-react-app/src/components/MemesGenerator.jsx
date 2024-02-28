import { useEffect,useState } from "react";

const MemesGenerator = () => {
    const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState([]);
  const [topText, setTopText] = useState('');

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
          .then(res => res.json())
          .then(data => {
            setMemes(data.data.memes);
            setCurrentMeme(data.data.memes[0]);
          })
          .catch(error => console.error('Error fetching memes:', error));
      }, []);

      const randomImageMeme=() => {
        const randomIndex = Math.floor(Math.random() * memes.length);
        let url = randomIndex;
        setCurrentMeme(memes[randomIndex]);
      };

      const handchange= (e) => {
        const {name, value} = e.target;
        setCurrentMeme({...currentMeme, [name]: value});
      }
    return ( 
        <>
        <div>
        <input 
        type="text" 
        value={memes.topText} 
        onChange={(e) => setTopText(e.target.value)} />
            <button></button>
        </div>
        <div>
            <div>
                {topText} 
            </div>
            <img src={currentMeme.url} alt="" />
        </div>
        </>
     );
}
 
export default MemesGenerator;

