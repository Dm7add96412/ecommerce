import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';

const CartPage = () => {
    
    const cart = useAppSelector(state => state.cartReducer)
    return (
        <div>
            This is the shopping cart
            {cart && cart.map(item => (
                <div key={item.id}>
                    <li>
                        {item.title} {item.quantity}
                    </li>
                </div>
            ))}
        </div>
    )
}

export default CartPage