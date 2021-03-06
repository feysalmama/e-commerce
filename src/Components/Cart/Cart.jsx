import React from 'react';
import { Container, Typography,Button,Grid} from '@material-ui/core';
import useStyles  from './style';
import Carditem from './Cartitem/Cartitem';
import {Link} from 'react-router-dom';

const Cart = ({cart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) => {
    const classes = useStyles();  

const EmptyCart = ()=>(
   <Typography variant="subtitle1">You have no item in your shoping cart 
        <Link to="/" className={classes.link}> start adding Itemm to the cart</Link>
   </Typography>
);

const FilledCart = ()=>(
        <>
          <Grid container spacing={3}>
            {cart.line_items.map((item)=>(
                <Grid item xs={12} sm={4} key={item.id}>
                    <Carditem item={item} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty}/> 
                </Grid>
            ))}
          </Grid>
          <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">checkout</Button>
                </div>
          </div>
        </>
);
    
    if(!cart.line_items) return "Loading..."
    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant='h3' gutterBottom>Your Shoping Cart </Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart
