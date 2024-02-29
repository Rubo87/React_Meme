import { useEffect,useState, useRef } from "react";
import { saveAs } from 'file-saver'
import { toPng } from 'html-to-image';
import '../App.css'


const MemesGenerator = () => {
    const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState([]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const currentIndex = memes.indexOf(currentMeme);
  const elementRef = useRef(null);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
          .then(res => res.json())
          .then(data => {
            setMemes(data.data.memes);
            const randomImageMeme = Math.floor(Math.random() * data.data.memes.length);
            setCurrentMeme(data.data.memes[randomImageMeme]);
          })
          .catch(error => console.error('Error fetching memes:', error));
      }, []);


      const handleRandom= () => {
        const randomImageMeme = Math.floor(Math.random() * memes.length);
        setCurrentMeme(memes[randomImageMeme]);
      }
      const handlePrev = () => {
        const prevIndex = (currentIndex - 1) ;
        setCurrentMeme(memes[prevIndex]);
      };
      
      const handleNext = () => {
        const nextIndex = (currentIndex + 1) ;
        setCurrentMeme(memes[nextIndex]);
      };

        const downloadImage = () => {
          saveAs(currentMeme.url , 'image.jpg') // Put your image URL here.
        }
      
        const htmlToImageConvert = () => {
          toPng(elementRef.current, { cacheBust: false })
            .then((dataUrl) => {
              const link = document.createElement("a");
              link.download = "my-image-name.png";
              link.href = dataUrl;
              link.click();
            })
            .catch((err) => {
              console.log(err);
            });
        };
       
    return ( 
        <>
        <div >
        <input 
        type="text" 
        value={memes.topText} 
        onChange={(e) => setTopText(e.target.value)} />
        <input 
        type="text" 
        value={memes.bottomText} 
        onChange={(e) => setBottomText(e.target.value)} />
        <button onClick={handleRandom}>Random Image</button>
        <button onClick={handlePrev}>previous</button>
        <button onClick={handleNext}>next</button>
        <button onClick={htmlToImageConvert}>Download!</button>
        </div>
        <div ref={elementRef}>
            <div className="memestext">
                {topText} 
            </div>
            <div className="memestextBottiom">
                {bottomText} 
            </div>
            <img src={currentMeme.url} alt="" />
        </div>
        </>
     );
}
 
export default MemesGenerator;

