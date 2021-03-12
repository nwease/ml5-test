import './App.css';
import * as ml5 from 'ml5';
import {useRef, useEffect, useState} from 'react';
// import sunrise from './assets/sunrise.jpeg';

function App() {

    const imageRef= useRef();
    const [file, setFile] = useState(null);
    const [results, setResults] = useState([]);

    const classifyImg = () => {
        const classifier = ml5.imageClassifier('MobileNet', () => console.log('Model Loaded!'));

        classifier.predict(imageRef.current, 5, (err, results) => {
            console.log(results);
            
            setResults(results);
        })
    }

    useEffect(() => {
        classifyImg();
    }, [file])

    const fileSelectedHandler = (e) => {
        let selectedFile = e.target.files[0];
        let reader = new FileReader();

        imageRef.current.title = selectedFile.name;

        reader.onload = function(e) {
            imageRef.current.src = e.target.result;
        }

        setFile(e.target.files[0]);

        reader.readAsDataURL(selectedFile);
    }

    console.log(file);

    return (
        <div className='app'>
            <h1>
                HELLO
            </h1>

            <img
                ref={imageRef}
                alt=''
            />

            <input
                type='text'
                type='file'
                onChange={fileSelectedHandler}
            />
            
            {
                results?.map(({label, confidence}) => (
                    <div key={confidence}>
                        <p>
                            {label}: {confidence}
                        </p>
                    </div>
                ))
            }
        </div>
    );
}

export default App;
