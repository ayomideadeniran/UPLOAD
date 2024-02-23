import "./App.css";
import { useState, useEffect, useRef } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { getStorage, deleteObject } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const clickTimeoutRef = useRef(null);
  const [url, setUrl] = useState("");

  const imagesListRef = ref(storage, "images/");


  const uploadFile = () => {
    // clearTimeout(clickTimeoutRef.current);

    clickTimeoutRef.current = setInterval(() => {
      setIsButtonClicked(true); 
    }, 2000);

    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setUrl(url);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
          setUrl(url);
          console.log(url);
        });
      });
    });
  }, []);

  const refreshPage = () => window.location.reload();


  const deletefile = () => {
    clickTimeoutRef.current = setInterval(() => {
      refreshPage();
    }, 3000);
    console.log("Input value:", inputValue);
    deleteObject(ref(storage, imageUrls[inputValue]))
    .then(() => {
        console.log("deleted");
        setIsDeleteButtonClicked(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>

      <input
      placeholder="Delete number"
      type="number"
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={deletefile}>delete</button>
      
      {isButtonClicked && (
        <div className="message">Uploaded Successfully!</div>
      )}

     {isDeleteButtonClicked && (
        <div className="message">deleted Successfully!</div>
      )}

      <div className="image-grid">
      {imageUrls.map((url) => {
        return(
          <div>
            <a href={url} target="_blank">
            <img  className="image" src={url} alt="This is a File"  />
           </a>

            <p className="urls"><a href={url} download={url} target="_blank">Download</a></p>
          </div>
             )
         })}
      </div>


    </div>
  );
}

export default App;


