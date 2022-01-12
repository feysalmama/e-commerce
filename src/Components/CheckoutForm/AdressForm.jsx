import React,{useState, useEffect} from 'react'
import {InputLabel, Select, MenuItem,Grid,Typography,Button} from "@material-ui/core";
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from './FormInput';
import {commerce} from '../../lib/commerce';
import {Link} from 'react-router-dom';

const AdressForm = ({checkoutToken,next}) => {

     const [shippingCountries,setShippingCountries]= useState([]);
     const [shippingCountry,setShippingCountry]= useState('');
     const [shippingSubDivisions,setShippingSubDivisions]= useState([]);
     const [shippingSubDivision,setShippingSubDivision]= useState('');
     const [shippingOptions,setShippingOptions]= useState([]);
     const [shippingOption,setShippingOption]= useState('');

    const methods = useForm();
    const onSubmitHandler = ()=>{
        return "submitted";
    }

const fetchShippingCounties = async (checkoutTokenId) =>{
    const {countries}= await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);

}

const fetchSubdivisions = async (countryCode) => {
    const {subdivisions}  = await commerce.services.localeListSubdivisions(countryCode)
    setShippingSubDivisions(subdivisions);
    setShippingSubDivision(Object.keys(subdivisions)[0]);
}

const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };


useEffect(()=>{ 
      
       fetchShippingCounties(checkoutToken.id);
  
},[]);

useEffect(()=> {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
},[shippingCountry]);

useEffect(() => {
    if (shippingSubDivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision);
  }, [shippingSubDivision]);



const countries = Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}));
const subdivisions = Object.entries(shippingSubDivisions).map(([code,name])=>({id:code,label:name}));
const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }));
return (
    <>
     <Typography variant='h6' gutterBottom>Shipping Address</Typography>
     <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubDivision,shippingOption}))}>
            <Grid container spacing={3}>
                <FormInput name="firstName" label="first name"/>
                <FormInput name="lasName" label="last name"/>
                <FormInput name="adress1" label="Adress"/>
                <FormInput name="email" label="Email"/>
                <FormInput name="city" label="City"/>
                <FormInput name="zip" label="ZIP/ Postal code"/>

                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Countries</InputLabel>
                    <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                        {countries.map((country)=>(
                            <MenuItem key={country.id} value={country.id}>
                                {country.label}

                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Subdivision</InputLabel>
                    <Select value={shippingSubDivision} fullWidth onChange={(e)=>setShippingSubDivision(e.target.value)}>
                        {subdivisions.map((subdivision)=>(
                            <MenuItem key={subdivision.id} value={subdivision.id}>
                                {subdivision.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
                        {options.map((option)=>(
                            <MenuItem key={option.id} value={option.id}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

            </Grid>

            <br />
            <br />
            <hr />
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
                <Button type="submit" color="primary" variant="contained">Next</Button>
            </div>
        </form>
     </FormProvider>


    </>
  )
}

export default AdressForm
