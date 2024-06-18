import React ,{ useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import Clear from '@material-ui/icons/Clear';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { common } from '@material-ui/core/colors';
import image from "./back_mainly.jpg";
import './main.css'
import './shop/style.css'
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: '#be6a77',
    boxShadow: 'none',
    color: 'white'
  },
  loader: {
    color: '#be6a77 !important',
  }
}));

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [displayedDiseaseClass, setDisplayedDiseaseClass] = useState(null);
  let confidence = 0;
  const axios = require("axios").default;
  const sendFile = async () => {
    
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {

        const receivedDiseaseClass = res.data.class;
        setDisplayedDiseaseClass(receivedDiseaseClass);
        setData(res.data);
      }
      setIsloading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);

  }
 
      const [randomImage, setRandomImage] = useState(null);
  
      useEffect(() => {
          // Load a random image from the stripe_rust folder
          const stripeRustImages = importAll(require.context('./test1/stripe_rust', false, /\.(png|jpe?g|svg)$/));
          const septoriaImages = importAll(require.context('./test1/septoria', false, /\.(png|jpe?g|svg)$/));
          const healthyImages = importAll(require.context('./test1/Healthy', false, /\.(png|jpg|jpeg|svg)$/));
  
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

      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {image && <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component="image"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              }
              {!image && <CardContent className={classes.content}>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image of a Wheat leaf to process"}
                  onChange={onSelectFile}
                />
              </CardContent>}
              {data && <CardContent className={classes.detail}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell1}>Label:</TableCell>
                        <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      <TableRow className={classes.tableRow}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          {data.class}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>}
              {isLoading && <CardContent className={classes.detail}>
                <CircularProgress color="secondary" className={classes.loader} />
                <Typography className={classes.title} variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>
          </Grid>
          {data &&
            <Grid item className={classes.buttonGrid} >

              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                Clear
              </ColorButton>
            </Grid>}
        </Grid >
      </Container >
     
    </React.Fragment >
  );
};
