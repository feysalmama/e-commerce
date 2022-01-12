import React ,{useState,useEffect} from 'react'
import {Paper, Stepper,Step,StepLabel, Typography, CirculerProgress, Divider, Button} from '@material-ui/core';
import useStyles from './style';
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping address','Payment details']


const Checkout = ({cart}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shppingData, setShippingData] = useState({});

    const classes  = useStyles();

    useEffect(()=>{
        const generateToken = async () => {
             try {
                 const token = await commerce.checkout.generateToken(cart.id,{type:'cart'});
                 setCheckoutToken(token);
             } catch (error) {
                 
             }
        }
        generateToken();
    },[cart]);


    const nextStep = ()=> setActiveStep((prevActiveStep)=>prevActiveStep +1);
    const backStep = ()=> setActiveStep((prevActiveStep)=>prevActiveStep - 1);

    const next = (data)=> {
        setShippingData(data);

        nextStep();
    }

 const Confermation = () =>(
     <div>Confermation</div>
 );

 const Form = ()=> activeStep==0 ? <AdressForm checkoutToken = {checkoutToken} next={next} />: <PaymentForm  shppingData={shppingData}/>

  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step)=>(
                        <Step  key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep == steps.length ? <Confermation/>:checkoutToken && <Form/>}
            </Paper>
        </main>
         
    </>
  )
}

export default Checkout
