import React, { useState ,  useEffect } from 'react';
import './style.css'; // actual path to stylesheet
import '../main.css'
export function Test() {
    //const displayedDiseaseClass ="Healthy"
    //const displayedDiseaseClass ="stripe_rust"
    const displayedDiseaseClass ="septoria"
    const [randomImage, setRandomImage] = useState(null);

    useEffect(() => {
        // Load a random image from the stripe_rust folder
        const stripeRustImages = importAll(require.context('../test1/stripe_rust', false, /\.(png|jpe?g|svg)$/));
        const septoriaImages = importAll(require.context('../test1/septoria', false, /\.(png|jpe?g|svg)$/));
        const healthyImages = importAll(require.context('../test1/Healthy', false, /\.(png|jpg|jpeg|svg)$/));

        const randomIndex = Math.floor(Math.random() * stripeRustImages.length);
        const randomIndex1 = Math.floor(Math.random() * septoriaImages.length);
        const randomIndex2 = Math.floor(Math.random() * healthyImages.length);

      
        switch (displayedDiseaseClass) {
            case 'stripe_rust':
                setRandomImage(stripeRustImages[randomIndex]);

                break;
            case 'septoria':
                setRandomImage(septoriaImages[randomIndex1]);
                break;
            case 'Healthy':
                setRandomImage(healthyImages[randomIndex2]);
                break;
            default:
                break;
        }
   

    }, []);

    // Function to import all images from a folder
    const importAll = (r) => {
        return r.keys().map(r);
    }
    return (
        <React.Fragment>
             {displayedDiseaseClass && (
  <div className="form1">
    {displayedDiseaseClass === 'stripe_rust' && (
        <>
            <div className="report">
                <h2>REPORT</h2>
                <div className="section">
                    <h3>Disease: Stripe Rust</h3>
                    <img src={randomImage} alt="Rust Image" />
                    <div className="info">
                        <h4>SYMPTOMS</h4>
                        <p>
                             Puccinia Species, Moisture and Humidity, Moderate Temperatures,
                            Susceptible Wheat Varieties, Wind Dispersal, Infected Crop Residue,
                            Late-Season Infection
                        </p>
                    </div>
                    <div className="info">
                        <h4>MEDICATION</h4>
                        <p>
                             Triazoles, Strobilurins, DMI Fungicides, Azoles, Propiconazole,
                            Tebuconazole, Flutriafol
                        </p>
                    </div>
                </div>
            </div>
        </>
    )}


{displayedDiseaseClass === 'septoria' && (
        <>
            <div className="report">
                <h2>REPORT</h2>
                <div className="section">
                    <h3>Disease: Septoria</h3>
                    <img src={randomImage} alt="Septoria Image" />
                    <div className="info">
                    <h4>SYMPTOMS</h4>

                    <p >
          Reasons: Septoria tritici, Warm and Humid Conditions, Infected Residue,
          Wind and Rain, Overhead Irrigation, Crowded Plantations,
          Late-Season Infection
        </p>
                    </div>
                    <div className="info">
                        <h4>Medication</h4>
                        <p>
                            Azoxystrobin, Flutriafol, Propiconazole, Tebuconazole,
                            Epoxiconazole, Trifloxystrobin, Pyraclostrobin
                        </p>
                    </div>
                </div>
            </div>
        </>
    )}

    {displayedDiseaseClass === 'Healthy' && (
        <>
            <div className="report">
            <h2>REPORT</h2>

                <div className="section">
                <h3 style={{ backgroundColor: 'green' }}>Status: Healthy</h3>              
                      <img src={randomImage} alt="Healthy Image" />
                    <div className="info">
                        <h4>Symptoms</h4>
                        <p>No Symptoms of Rust & Septoria</p>
                    </div>
                    <div className="info">
                        <h4>Medication</h4>
                        <p>No Medicine needed</p>
                    </div>
                </div>
            </div>
        </>
    )}

  </div>
)}
        </React.Fragment>    );
}


